import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { SellerWorkspace } from "../../components/common/SellerWorkspace";
import {
  sellerMenuClient,
  sellerMenuError,
} from "../../clients/sellerMenuClient";
import { ApiError } from "../../clients/httpClient";
import {
  sellerMenuLabels,
  type MenuDraftImage,
  type SellerMenu,
  type SellerMenuInput,
  type SellerMenuStatus,
} from "../../types/sellerMenu";

export function SellerMenuForm({ editing = false }: { editing?: boolean }) {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [data, setData] = useState<{
    existing?: SellerMenu;
    categories: string[];
  } | null>(null);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setData(null);
    setError("");
    if (editing && (!id || !/^\d+$/.test(id))) {
      setError("Vui lòng chọn một thực đơn trong danh sách để chỉnh sửa.");
      return;
    }
    Promise.all([
      sellerMenuClient.options(controller.signal),
      editing
        ? sellerMenuClient.get(id!, controller.signal)
        : Promise.resolve(undefined),
    ])
      .then(([options, existing]) => {
        if (!controller.signal.aborted)
          setData({ categories: options.categories, existing });
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(sellerMenuError(err));
      });
    return () => controller.abort();
  }, [id, editing, reload]);
  return (
    <SellerWorkspace
      title={editing ? "Chỉnh sửa thực đơn" : "Thêm thực đơn mới"}
      description="Kể câu chuyện món ăn của bạn bằng hương vị và hình ảnh."
    >
      <Link className="text-link" to="/seller/products">
        ← Trở lại thực đơn của tôi
      </Link>
      {error ? (
        <div className="notice warm" role="alert">
          {error}{" "}
          <button
            className="btn secondary sm"
            onClick={() => setReload((value) => value + 1)}
          >
            Thử lại
          </button>
        </div>
      ) : !data ? (
        <p className="card" role="status">
          Đang tải dữ liệu thực đơn…
        </p>
      ) : (
        <MenuEditor
          key={`${id}-${reload}`}
          existing={data.existing}
          categories={data.categories}
          reload={() => setReload((value) => value + 1)}
        />
      )}
    </SellerWorkspace>
  );
}
function MenuEditor({
  existing,
  categories,
  reload,
}: {
  existing?: SellerMenu;
  categories: string[];
  reload: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState(() => ({
    name: existing?.name ?? "",
    category: existing?.category ?? categories[0],
    unitPrice: existing?.unitPrice ?? "150000",
    minGuests: existing?.minGuests ?? 2,
    maxGuests: existing?.maxGuests ?? 8,
    dishItems: existing?.dishItems ?? "",
    description: existing?.description ?? "",
    status: existing?.status ?? ("DRAFT" as SellerMenuStatus),
  }));
  const [version, setVersion] = useState(existing?.version);
  const [images, setImages] = useState<MenuDraftImage[]>(
    () =>
      existing?.images.map((image) => ({
        key: `existing:${image.id}`,
        name: image.name || existing.name,
        url: image.url,
      })) ?? [],
  );
  const [cover, setCover] = useState(() => {
    const image = existing?.images.find((item) => item.isCover);
    return image ? `existing:${image.id}` : "";
  });
  const [busy, setBusy] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(() =>
    location.state?.menuSaved
      ? { type: "success", text: "Đã tạo thực đơn thành công." }
      : null,
  );
  const urls = useRef<string[]>([]);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      urls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);
  useEffect(() => {
    if (location.state?.menuSaved)
      navigate(location.pathname + location.search, {
        replace: true,
        state: null,
      });
  }, [location.state, location.pathname, location.search, navigate]);
  const change = <K extends keyof typeof menu>(
    key: K,
    value: (typeof menu)[K],
  ) => {
    setMenu((current) => ({ ...current, [key]: value }));
    setFeedback(null);
  };
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy || conflict) return;
    setBusy(true);
    setFeedback(null);
    try {
      const files: File[] = [];
      const keys = new Map<string, string>();
      images.forEach((image) => {
        const key = image.file ? `new:${files.length}` : image.key;
        keys.set(image.key, key);
        if (image.file) files.push(image.file);
      });
      const request: SellerMenuInput = {
        ...menu,
        version,
        imageKeys: images.map((image) => keys.get(image.key)!),
        coverKey: keys.get(cover) || "",
      };
      const saved = await sellerMenuClient.save(existing?.id, request, files);
      if (!mounted.current) return;
      setVersion(saved.version);
      setImages(
        saved.images.map((image) => ({
          key: `existing:${image.id}`,
          name: image.name || saved.name,
          url: image.url,
        })),
      );
      setCover(
        saved.images.some((image) => image.isCover)
          ? `existing:${saved.images.find((image) => image.isCover)!.id}`
          : "",
      );
      setFeedback({
        type: "success",
        text: "Đã lưu thay đổi thực đơn thành công.",
      });
      if (!existing)
        navigate(`/seller/product-edit?id=${saved.id}`, {
          replace: true,
          state: { menuSaved: true },
        });
    } catch (err) {
      if (mounted.current) {
        setFeedback({ type: "error", text: sellerMenuError(err) });
        setConflict(err instanceof ApiError && err.status === 409);
      }
    } finally {
      if (mounted.current) setBusy(false);
    }
  }
  function addImages(files: File[]) {
    try {
      if (images.length + files.length > 10)
        throw new Error("Tối đa 10 ảnh mỗi thực đơn.");
      if (
        files.some(
          (file) =>
            !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
            !file.size ||
            file.size > 5 * 1024 * 1024,
        )
      )
        throw new Error(
          "Chọn ảnh JPG, PNG hoặc WebP, có dữ liệu và không quá 5 MB/ảnh.",
        );
      const added = files.map((file) => {
        const url = URL.createObjectURL(file);
        urls.current.push(url);
        return { key: crypto.randomUUID(), name: file.name, url, file };
      });
      setImages((current) => [...current, ...added]);
      setCover((current) => current || added[0]?.key || "");
      setFeedback(null);
    } catch (err) {
      setFeedback({ type: "error", text: sellerMenuError(err) });
    }
  }
  function move(index: number, offset: number) {
    setImages((current) => {
      const next = [...current];
      [next[index], next[index + offset]] = [next[index + offset], next[index]];
      return next;
    });
    setFeedback(null);
  }
  return (
    <>
      <div className="chef-demo-banner">
        <strong>
          {existing ? `Thực đơn #${existing.id}` : "Thực đơn mới"}
        </strong>
        <span>
          Ảnh được tải lên Cloudinary khi bạn bấm Lưu. Thay đổi chưa lưu không
          ảnh hưởng dữ liệu cũ.
        </span>
      </div>
      {feedback && (
        <div className={`chef-save-toast ${feedback.type}`}>
          <div
            role={feedback.type === "error" ? "alert" : "status"}
            aria-atomic="true"
          >
            <strong>
              {feedback.type === "success" ? "✓ Thành công" : "Chưa lưu được"}
            </strong>
            <p>{feedback.text}</p>
          </div>
          <button
            type="button"
            className="btn secondary sm"
            aria-label="Đóng thông báo"
            onClick={() => setFeedback(null)}
          >
            ×
          </button>
        </div>
      )}
      {conflict && (
        <div className="notice warm">
          <p>
            Dữ liệu đã được cập nhật ở phiên khác. Tải lại sẽ bỏ các thay đổi
            chưa lưu trong form này.
          </p>
          <button className="btn secondary sm" onClick={reload}>
            Tải lại dữ liệu
          </button>
        </div>
      )}
      <form
        onSubmit={submit}
        onInvalidCapture={() =>
          setFeedback({
            type: "error",
            text: "Vui lòng kiểm tra các trường bắt buộc, giá và số khách trước khi lưu.",
          })
        }
        aria-busy={busy}
      >
        <fieldset disabled={busy} className="stack">
          <section className="card stack">
            <div>
              <p className="eyebrow">01 · Thông tin cơ bản</p>
              <h2>Một thực đơn thật hấp dẫn</h2>
            </div>
            <label className="field">
              Tên thực đơn
              <input
                required
                maxLength={255}
                value={menu.name}
                onChange={(e) => change("name", e.target.value)}
                placeholder="Ví dụ: Mâm cơm sum vầy"
              />
            </label>
            <div className="grid grid-2">
              <label className="field">
                Danh mục
                <select
                  value={menu.category}
                  onChange={(e) => change("category", e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                Giá mỗi khách (đ)
                <input
                  required
                  type="number"
                  min="1"
                  max="999999999999.99"
                  step="0.01"
                  value={menu.unitPrice}
                  onChange={(e) => change("unitPrice", e.target.value)}
                />
              </label>
            </div>
            <div className="grid grid-2">
              <label className="field">
                Số khách tối thiểu
                <input
                  required
                  type="number"
                  min="1"
                  max="100"
                  value={menu.minGuests}
                  onChange={(e) => change("minGuests", Number(e.target.value))}
                />
              </label>
              <label className="field">
                Số khách tối đa
                <input
                  required
                  type="number"
                  min={menu.minGuests || 1}
                  max="100"
                  value={menu.maxGuests}
                  onChange={(e) => change("maxGuests", Number(e.target.value))}
                />
              </label>
            </div>
            <label className="field">
              Các món trong thực đơn
              <textarea
                required
                rows={5}
                maxLength={10000}
                value={menu.dishItems}
                onChange={(e) => change("dishItems", e.target.value)}
                placeholder={"Mỗi món một dòng\nCá kho tộ\nCanh chua tôm"}
              />
            </label>
            <label className="field">
              Mô tả
              <textarea
                rows={3}
                maxLength={3000}
                value={menu.description}
                onChange={(e) => change("description", e.target.value)}
                placeholder="Hương vị, nguyên liệu và điều đặc biệt của thực đơn…"
              />
            </label>
          </section>
          <section className="card stack">
            <div>
              <p className="eyebrow">02 · Hình ảnh</p>
              <h2>Cho khách một lời mời ngon mắt</h2>
            </div>
            <label className="chef-upload field">
              + Chọn nhiều ảnh thực đơn
              <span className="small muted">
                JPG, PNG, WebP · tối đa 5 MB/ảnh · 10 ảnh/thực đơn
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(e) => {
                  addImages(Array.from(e.target.files || []));
                  e.target.value = "";
                }}
              />
            </label>
            <div className="chef-image-grid">
              {images.map((image, index) => (
                <article className="chef-image-tile" key={image.key}>
                  <img src={image.url} alt={image.name} />
                  <p className="small chef-filename">{image.name}</p>
                  <div className="row">
                    <label className="small">
                      <input
                        type="radio"
                        name="cover"
                        checked={cover === image.key}
                        onChange={() => {
                          setCover(image.key);
                          setFeedback(null);
                        }}
                      />{" "}
                      Ảnh bìa
                    </label>
                    <span className="small muted">#{index + 1}</span>
                  </div>
                  <div className="row">
                    <button
                      type="button"
                      className="btn secondary sm"
                      disabled={index === 0}
                      onClick={() => move(index, -1)}
                      aria-label={`Đưa ảnh ${index + 1} lên trước`}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="btn secondary sm"
                      disabled={index === images.length - 1}
                      onClick={() => move(index, 1)}
                      aria-label={`Đưa ảnh ${index + 1} ra sau`}
                    >
                      →
                    </button>
                    <button
                      type="button"
                      className="btn ghost sm"
                      onClick={() => {
                        const remaining = images.filter(
                          (item) => item.key !== image.key,
                        );
                        setImages(remaining);
                        if (cover === image.key)
                          setCover(remaining[0]?.key || "");
                        setFeedback(null);
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {!images.length && (
              <p className="muted">
                Chưa có ảnh. Thêm ít nhất một ảnh trước khi xuất bản.
              </p>
            )}
          </section>
          <section className="card stack-sm">
            <label className="field">
              Trạng thái hiển thị
              <select
                value={menu.status}
                onChange={(e) =>
                  change("status", e.target.value as SellerMenuStatus)
                }
              >
                {Object.entries(sellerMenuLabels).map(([value, label]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <p className="small muted">
              Bản nháp và thực đơn tạm ẩn không xuất hiện với khách hàng.
            </p>
            <div className="row">
              <button className="btn" type="submit" disabled={busy || conflict}>
                {busy ? "Đang lưu và tải ảnh…" : "Lưu thực đơn"}
              </button>
              {!busy && (
                <Link className="btn secondary" to="/seller/products">
                  Về danh sách
                </Link>
              )}
            </div>
          </section>
        </fieldset>
      </form>
    </>
  );
}

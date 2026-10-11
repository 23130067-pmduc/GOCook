import type {PageResponse,} from '../../types/api';

export function Pager<T>({data, onPage,}: { data: PageResponse<T>; onPage: (page: number) => void; }) {
    if (data.totalPages <= 1) {
        return null;
    }

    const maxVisible = 5;

    let start = Math.max(0, data.number - 2,);
    if (start + maxVisible > data.totalPages) {
        start = Math.max(0, data.totalPages - maxVisible,);
    }

    const pages = Array.from({length: Math.min(maxVisible, data.totalPages,),}, (_, index) => start + index,);

    return (
        <div className="between">

      <span className="small muted">
        Trang {data.number + 1}
          {' / '}
          {data.totalPages}
      </span>

            <div className="row">
                <button
                    className="btn secondary sm"
                    disabled={data.first}
                    onClick={() =>
                        onPage(
                            data.number - 1,
                        )
                    }
                >
                    ←
                </button>

                {pages.map(
                    (page) => (

                        <button
                            key={page}
                            type="button"
                            className={
                                page === data.number
                                    ? 'btn sm'
                                    : 'btn secondary sm'
                            }
                            onClick={() =>
                                onPage(page)
                            }
                        >
                            {page + 1}
                        </button>

                    ),
                )}

                <button
                    className="btn secondary sm"
                    disabled={data.last}
                    onClick={() =>
                        onPage(
                            data.number + 1,
                        )
                    }
                >
                    →
                </button>
            </div>
        </div>
    );
}
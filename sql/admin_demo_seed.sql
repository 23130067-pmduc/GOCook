-- Optional demo data for the Admin module.
-- Run only when you need data to demonstrate product/order management.

INSERT INTO products
(name, category, unit_price, min_guests, max_guests, dish_items, description, image_url, status)
SELECT
    'Mâm Cơm Sum Vầy Miền Nam',
    'Món miền Nam',
    120000,
    3,
    8,
    E'Cá lóc kho tộ\nCanh chua\nRau luộc\nTrứng chiên',
    'Mâm cơm gia đình đậm vị miền Nam.',
    '/assets/meal.png',
    'PUBLISHED'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Mâm Cơm Sum Vầy Miền Nam');

INSERT INTO products
(name, category, unit_price, min_guests, max_guests, dish_items, description, image_url, status)
SELECT
    'Mâm Chay Thanh Lành',
    'Món chay',
    105000,
    2,
    8,
    E'Đậu hũ sốt nấm\nCanh củ sen\nRau củ hấp\nCơm gạo lứt',
    'Thực đơn chay nhẹ nhàng cho bữa cơm gia đình.',
    '/assets/vegetarian.png',
    'PUBLISHED'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Mâm Chay Thanh Lành');

INSERT INTO orders
(order_code, customer_name, customer_email, product_name, chef_name, service_address, guest_count, scheduled_at, total_amount, status, customer_note)
SELECT
    'GC-260926',
    'Ngọc Anh',
    'ngocanh.demo@gocook.local',
    'Mâm Cơm Sum Vầy Miền Nam',
    'Bếp Cô Mai',
    'Bình Thạnh, TP. Hồ Chí Minh',
    4,
    TIMESTAMP '2026-09-26 18:30:00',
    480000,
    'CONFIRMED',
    'Ít cay, để riêng nước chấm.'
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE order_code = 'GC-260926');

INSERT INTO orders
(order_code, customer_name, customer_email, product_name, chef_name, service_address, guest_count, scheduled_at, total_amount, status)
SELECT
    'GC-260924',
    'Minh Thư',
    'minhthu.demo@gocook.local',
    'Mâm Cơm Sum Vầy Miền Nam',
    'Bếp An Nhiên',
    'Quận 1, TP. Hồ Chí Minh',
    4,
    TIMESTAMP '2026-09-24 18:00:00',
    480000,
    'COOKING'
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE order_code = 'GC-260924');

INSERT INTO orders
(order_code, customer_name, customer_email, product_name, chef_name, service_address, guest_count, scheduled_at, total_amount, status)
SELECT
    'GC-260920',
    'Thanh Hà',
    'thanhha.demo@gocook.local',
    'Mâm Chay Thanh Lành',
    'Bếp An Nhiên',
    'Thủ Đức, TP. Hồ Chí Minh',
    4,
    TIMESTAMP '2026-09-20 11:30:00',
    420000,
    'COMPLETED'
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE order_code = 'GC-260920');

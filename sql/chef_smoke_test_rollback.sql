-- Optional test: creates fake data IN A TRANSACTION and ALWAYS rolls it back.
-- Use on DEV database only. Requires migration applied. psql -v ON_ERROR_STOP=1.
BEGIN;
DO $$
DECLARE
  v_customer BIGINT;
  v_chef BIGINT;
  v_product BIGINT;
  v_order BIGINT;
  v_payment BIGINT;
  v_escrow order_escrows%ROWTYPE;
  v_token TEXT := md5(random()::text || clock_timestamp()::text);
BEGIN
  INSERT INTO users(username,password,email) VALUES ('smoke_customer','not-a-real-password','smoke_c_'||v_token||'@example.invalid') RETURNING id INTO v_customer;
  INSERT INTO users(username,password,email) VALUES ('smoke_chef','not-a-real-password','smoke_s_'||v_token||'@example.invalid') RETURNING id INTO v_chef;
  INSERT INTO products(name,category,unit_price,min_guests,max_guests,status,seller_id)
    VALUES ('Smoke menu','Test',1000000,1,8,'DRAFT',v_chef) RETURNING id INTO v_product;
  INSERT INTO product_images(product_id,image_url,is_cover) VALUES
    (v_product,'https://res.cloudinary.com/demo/image/upload/test1.jpg',true),
    (v_product,'https://res.cloudinary.com/demo/image/upload/test2.jpg',false);
  INSERT INTO orders(order_code,customer_name,product_name,guest_count,scheduled_at,total_amount,status,chef_id,customer_id)
    VALUES ('SMOKE-'||LEFT(v_token,12),'Smoke customer','Smoke menu',1,CURRENT_TIMESTAMP+INTERVAL '1 day',1000000,'PENDING',v_chef,v_customer)
    RETURNING id INTO v_order;
  INSERT INTO order_ingredient_receipts(order_id,chef_id,file_url) VALUES
    (v_order,v_chef,'https://res.cloudinary.com/demo/image/upload/receipt1.jpg'),
    (v_order,v_chef,'https://res.cloudinary.com/demo/image/upload/receipt2.jpg');
  INSERT INTO payment_transactions(order_id,provider,transaction_code,amount,status,paid_at)
    VALUES (v_order,'SMOKE',v_token,1000000,'SUCCESS',CURRENT_TIMESTAMP)
    RETURNING id INTO v_payment;
  IF NOT gocook_register_verified_payment(v_order,v_payment) THEN RAISE EXCEPTION 'first payment register failed'; END IF;
  IF gocook_register_verified_payment(v_order,v_payment) THEN RAISE EXCEPTION 'double payment registered'; END IF;
  SELECT * INTO v_escrow FROM order_escrows WHERE order_id=v_order;
  IF v_escrow.gross_amount<>1000000 OR v_escrow.platform_fee<>150000 OR v_escrow.chef_amount<>850000 OR v_escrow.status<>'HELD'
    THEN RAISE EXCEPTION 'Wrong escrow allocation'; END IF;
  UPDATE orders SET status='AWAITING_ACCEPTANCE',chef_completed_at=CURRENT_TIMESTAMP WHERE id=v_order;
  IF NOT gocook_accept_and_release(v_order,v_customer) THEN RAISE EXCEPTION 'accept failed'; END IF;
  IF gocook_accept_and_release(v_order,v_customer) THEN RAISE EXCEPTION 'duplicate acceptance'; END IF;
  SELECT * INTO v_escrow FROM order_escrows WHERE order_id=v_order;
  IF v_escrow.status<>'RELEASED' THEN RAISE EXCEPTION 'Escrow not released'; END IF;
  IF (SELECT COUNT(*) FROM escrow_ledger_entries WHERE order_id=v_order)<>2
    THEN RAISE EXCEPTION 'Wrong ledger entry count'; END IF;
  RAISE NOTICE 'SMOKE PASS: 2 images, 2 receipts, 85/15 split, HELD->RELEASED, idempotency';
END $$;
ROLLBACK;

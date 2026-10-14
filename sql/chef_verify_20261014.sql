-- Safe read-only verification after chef_migration_20261014.sql.
\echo '== DB version and key schema objects =='
SELECT current_database() AS database_name, version() AS postgres_version;
SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN (
 'users','products','orders','chef_profiles','product_images','order_items',
 'order_ingredient_receipts','order_status_history','seller_schedules','chef_bookings',
 'payment_transactions','order_escrows','escrow_ledger_entries') ORDER BY table_name;
\echo '== SQL functions =='
SELECT proname FROM pg_proc WHERE proname IN (
 'gocook_register_verified_payment','gocook_accept_and_release','gocook_chef_reject_order') ORDER BY proname;
\echo '== views =='
SELECT table_name FROM information_schema.views WHERE table_schema='public' AND table_name LIKE 'v_chef_%' ORDER BY table_name;
\echo '== escrow totals (may be empty until real paid + accepted orders) =='
SELECT * FROM v_chef_financial_summary ORDER BY chef_id;
\echo '== recent chef revenue =='
SELECT * FROM v_chef_monthly_revenue ORDER BY month_start DESC, chef_id LIMIT 25;
\echo '== database integrity assertions =='
DO $$ BEGIN
  IF (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public' AND table_name IN (
  'chef_profiles','product_images','order_items','order_ingredient_receipts','order_status_history',
  'seller_schedules','chef_bookings','payment_transactions','order_escrows','escrow_ledger_entries'))<>10 THEN
    RAISE EXCEPTION 'Missing one or more Chef tables';
  END IF;
  IF (SELECT COUNT(*) FROM information_schema.views WHERE table_schema='public' AND table_name IN (
  'v_chef_financial_summary','v_chef_monthly_revenue','v_chef_service_mix'))<>3 THEN
    RAISE EXCEPTION 'Missing one or more Chef views';
  END IF;
  IF EXISTS (SELECT 1 FROM order_escrows WHERE gross_amount <> platform_fee+chef_amount) THEN
    RAISE EXCEPTION 'Invalid money split';
  END IF;
  IF EXISTS (SELECT 1 FROM order_escrows WHERE status='RELEASED' AND released_at IS NULL) THEN
    RAISE EXCEPTION 'Invalid escrow released_at';
  END IF;
  RAISE NOTICE 'Chef migration verification PASSED';
END $$;

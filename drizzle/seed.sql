INSERT OR IGNORE INTO users (id, email, name)
VALUES ('user_demo_sg', 'demo@ackmoney.app', 'Demo User SG');

INSERT OR IGNORE INTO categories (id, user_id, name, kind, icon)
VALUES
  ('cat_food_dining', 'user_demo_sg', 'Food & Dining', 'expense', 'utensils-crossed'),
  ('cat_transport', 'user_demo_sg', 'Transport', 'expense', 'bus'),
  ('cat_groceries', 'user_demo_sg', 'Groceries', 'expense', 'shopping-basket'),
  ('cat_utilities', 'user_demo_sg', 'Utilities', 'expense', 'zap'),
  ('cat_insurance', 'user_demo_sg', 'Insurance', 'expense', 'shield'),
  ('cat_healthcare', 'user_demo_sg', 'Healthcare', 'expense', 'heart-pulse'),
  ('cat_shopping', 'user_demo_sg', 'Shopping', 'expense', 'shopping-bag'),
  ('cat_entertainment', 'user_demo_sg', 'Entertainment', 'expense', 'film'),
  ('cat_education', 'user_demo_sg', 'Education', 'expense', 'graduation-cap'),
  ('cat_salary', 'user_demo_sg', 'Salary', 'income', 'wallet'),
  ('cat_bonus', 'user_demo_sg', 'Bonus', 'income', 'sparkles'),
  ('cat_investment_income', 'user_demo_sg', 'Investment Income', 'income', 'chart-line');

INSERT OR IGNORE INTO accounts (id, user_id, name, type, currency, opening_balance)
VALUES
  ('acct_dbs_multiplier', 'user_demo_sg', 'DBS Multiplier', 'bank', 'SGD', 2500.00),
  ('acct_ocbc_360', 'user_demo_sg', 'OCBC 360', 'bank', 'SGD', 1200.00),
  ('acct_youtrip_wallet', 'user_demo_sg', 'YouTrip Wallet', 'wallet', 'SGD', 300.00),
  ('acct_uob_one_card', 'user_demo_sg', 'UOB One Card', 'credit_card', 'SGD', -220.50);

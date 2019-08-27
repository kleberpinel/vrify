-- Query
SELECT
  c.ID,
  c.NAME
FROM
  Customers c
INNER JOIN
  Customer_Addresses ca
  ON c.ID = ca.CUSTOMER_ID

-- Result
-- ID NAME
-- 2	 Jonathan
-- 3	 Colin
-- 1	 Ryan

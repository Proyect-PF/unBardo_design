/* CREAR USUARIOS; PRODUCTOS; ORDENES; ORDERSPRODUCTS

INSERT INTO public."Users" (fullname, email, password, news_letter, "createdAt", "updatedAt", id_role)
SELECT 'User ' || s.n, 'user' || s.n || '@example.com', md5(random()::text), true, NOW(), NOW(), 1
FROM generate_series(1, 100) AS s(n);

--------------------------------------------------------------------------------------

INSERT INTO public."Product" (color, name, description, "S", "M", "L", "XL", show_in_shop, price, promotional_price, "createdAt", "updatedAt")
SELECT
  CASE floor(random() * 4) + 1
    WHEN 1 THEN 'blue'
    WHEN 2 THEN 'red'
    WHEN 3 THEN 'green'
    ELSE 'black'
  END AS color,
  CASE floor(random() * 4) + 1
    WHEN 1 THEN 'Camisa roja'
    WHEN 2 THEN 'Pantalones azules'
    WHEN 3 THEN 'Vestido negro'
    ELSE 'Jersey verde'
  END AS name,
  CASE floor(random() * 4) + 1
    WHEN 1 THEN 'Descripción del producto 1'
    WHEN 2 THEN 'Descripción del producto 2'
    WHEN 3 THEN 'Descripción del producto 3'
    ELSE 'Descripción del producto 4'
  END AS description,
  floor(random() * 11) AS "S",
  floor(random() * 11) AS "M",
  floor(random() * 11) AS "L",
  floor(random() * 11) AS "XL",
  CASE floor(random() * 2) + 1
    WHEN 1 THEN true
    ELSE false
  END AS show_in_shop,
  floor(random() * 101) AS price,
  floor(random() * 101) AS promotional_price,
  NOW(),
  NOW()
FROM generate_series(1, 100);


--------------------------------------------------------------------------------------

INSERT INTO public."Orders" (id_user, status, "createdAt", "updatedAt")
SELECT u.id AS id_user,
       CASE floor(random() * 3) + 1
           WHEN 1 THEN 'rejected'
           WHEN 2 THEN 'approved'
           ELSE 'cart'
           END                   AS status,
       now() - (floor(random() * 365) || ' days')::interval * random()::float8 ^ 2 AS "createdAt",
       now() - (floor(random() * 365) || ' days')::interval * random()::float8 ^ 2 AS "updatedAt"
FROM public."Users" u
WHERE u."createdAt" >= now() - interval '1 year'
ORDER BY ABS(EXTRACT(EPOCH FROM now() - "createdAt")) ASC
LIMIT 1000;



--------------------------------------------------------------------------------------

INSERT INTO public."OrderProducts" (id_order, id_product, sizes, "createdAt", "updatedAt")
SELECT
    o.id AS id_order,
    p.id AS id_product,
    json_build_object(
        'S', floor(random() * 10),
        'M', floor(random() * 10),
        'L', floor(random() * 10),
        'XL', floor(random() * 10)
    ) AS sizes,
    o."createdAt" AS "createdAt",
    o."updatedAt" AS "updatedAt"
FROM public."Orders" AS o
CROSS JOIN LATERAL (
    SELECT *
    FROM (
        SELECT *
        FROM public."Product"
        ORDER BY random() LIMIT 1
    ) AS subquery
) AS p
WHERE o."createdAt" >= now() - interval '1 year'
ORDER BY ABS(EXTRACT(EPOCH FROM now() - o."createdAt")) ASC
LIMIT 1000;
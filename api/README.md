# Variables de entorno
```env
DB_USER=postgres
DB_PASSWORD=123456789
DB_NAME=unbardo_design
DB_HOST=localhost
PORT=3700
SECRET=confirmation_token
USER_NAME=admin
USER_EMAIL=admin@admin.com
USER_PASSWORD=admin
USER_ROLE=admin
MERCADOPAGO_KEY=APP_USR-4964430421416242-020813-c46f247ea7b1f91937c722b8ea7b4134-1305644016
email="unbardodesign2023@gmail.com"
password="jlvmoatfefqrsgnt\n"
CLOUDINARY_NAME=drt1pzx1x
CLOUDINARY_API_KEY=185432381513669
CLOUDINARY_API_SECRET=ddhUhnhLRNuwsoV1Qn4IW-EjWJg	

```



# Endpoints para productos
## localhost:3700/product


#### POST -> localhost:3700/product 

```env
Nombre de funcion = Post_Product.
    El request se realiza por body
```


#### GET -> localhost:3700/product/
```env

Nombre de funcion = GET_AllProducts.
    Recibe todos los productos, recibe las siguientes variables por query => filter, order, page, perPage, sort

```


#### GET -> localhost:3700/product/:id
```env
Nombre de la funcion = GET_ProductById
    Si se recibe por param el id, busca el producto relacionado a ese id
```

#### GET -> localhost:3700/product/search/:name
```env
Nombre de la funcion = Serach_product 
    Se recibe por params la porcion del nombre del producto a buscar en la ruta 
```

#### DELETE -> localhost:3700/products/delete/:id
```env
Nombre de la funcion = DELETE_DeleteProduct 
    Recibe por params el id del producto a eliminar y ejecuta un destroy en la db
```

#### PUT -> localhost:3700/products/
```env
Nombre de la funcion = UPDATE_UpdateProduct 
    Recibe por params el id del producto a actualizar, recibe por body lo que se debe actualizar
    name, image, description, size, price, show_in_shop, color
```


# Endpoints para Usuarios
## localhost:3700/users

#### GET -> localhost:3700/users
```env
Nombre de funcion = GET_User.
    Si no recibe query con id del usuario, se obtiene todos los usuarios.
```

#### DELETE -> localhost:3700/users
```env
Nombre de la funcion = DELETE_User 
    Se borra el usuario que se maneja por id de query
```

#### UPDATE -> localhost:3700/users
```env
Nombre de la funcion = UPDATE_User 
    se actualiza usuario que se pmaneja por id de query
```


# Endpoints para Auth
## localhost:3700/auth

#### POST -> localhost:3700/auth/signin
```env
Nombre de funcion = POST_SignIn.
Esta funcion consta de tres Funcionalidades, crear un Usuario con un rol, Hashear su password y asignarle un token a ese usuario

Recibe por body las siguientes variables => fullname, email, password, role 
En el caso de recibir un role, se creara un usuario con el role asignado, los roles por defecto son => "admin", "user"
En el caso de que no reciba la propiedad role, se definira automaticamente un usuario con el role "user" por defecto
En el caso de recibir un role que no sea los especificados, respondera con un error
    
Una vez pasado el proceso de busqueda de roles, se hashea la password y se guarda en la db hasheada

Pasando estos dos procesos, se le asigna un token unico al Usuario creado, lo cual permitira darle acceso a determinadas funcionalidades como crear, eliminar y actualizar productos entre otras


Si el usuario ya existe en la base de datos, devuleve el token definido para el usuario por el header y un mensaje de ya creado
```

#### POST -> localhost:3700/auth/signup
```env
Nombre de funcion = POST_SignUp.
    Posee dos funcionalidades, Matchea la password del usuario que quiere ingresar y devulve el token del usuario para ingresar como admin o user.
    en el caso de no matchear las password se envia un mensaje de contraseña incorrecta
```

# Endpoints para ordenes
## localhost:3700/orders


#### POST -> localhost:3700/orders/payment

```env
Nombre de funcion = POST_GeneratePayment.
    Esta funcion crea el proceso de pago y te deriva a la pagina de pago de mercadopago.
    El request se realiza por body.

    area_code: number;  //Telefono
    number: number;     //Telefono
    zip_code: number;       //direccion
    street_name: string;    //direccion
    street_number: number;  //direccion
    id_user: number;    //id de usuario
    id_order: number;    //id de la orden => Se envia solamente si el usuario accede a una orden que no se finalizo y se desea proceder con esa orden
```

#### GET -> localhost:3700/orders/feedback

```env
Nombre de funcion = GET_FeedbackPayment.
    Esta es la ruta a la que deriva mercadopago al finalizar el pago, ya sea que se realizo exitosamente, como si fallo el pago.
    Se realiza un update del estado de la orden, de acuerdo al estado que responde mercadopago.
    El request se realiza por body.
    En este punto si el pago fue exitoso, actualiza el stock de los talles correspondientes del producto.
```

#### GET -> localhost:3700/orders

```env
Nombre de funcion = GET_AllOrders.
    Se obtienen todas las ordenes.
```

#### GET -> localhost:3700/orders/:id

```env
Nombre de funcion = GET_OrderById.
    Si se recibe por param el id, busca la orden relacionada a ese id
```

#### UPDATE -> localhost:3700/orders/

```env
Nombre de funcion = UPDATE_OrderStatus.
    Actualiza el status de la orden. Recibie id y status por query
```

# Endpoints para Cart
## localhost:3700/cart

#### POST -> localhost:3700/cart/

```env
Nombre de funcion = POST_AddToCart
    Esta ruta agrega un producto al carrito de compras en el Back en la tabla "Cart".
    - Recibe el id y un flag "eliminar"
    - Si eliminar es "false" agrega un producto, si existe -> suma un contador y su precio.
    - Si flag es "true" lo elimina y resta la cantidad.
```


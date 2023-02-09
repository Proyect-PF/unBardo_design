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

#### PUT -> localhost:3700/products/delete/:id
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
ENDPOINTS => 

# Endpoints para productos
## localhost:3700/product


#### POST -> localhost:3700/product/new 

```env
Nombre de funcion = Post_Product.
    El request se realiza por body
```


#### GET -> localhost:3700/product/
```env
Nombre de funcion = GET_AllProducts.
    Recibe todos los productos
```


#### GET -> localhost:3700/product/id
```env
Nombre de la funcion = GET_ProductById
    Si se recibe por param el id, busca el producto relacionado a ese id
```

#### GET -> localhost:3700/product/search/:name
```env
Nombre de la funcion = Serach_product 
    Se recibe por params la porcion del nombre del producto a buscar en la ruta 
```

#### GET -> localhost:3700/products/filtered/?byColor=all&byOrder=DESC
```env
Nombre de la funcion = Filter_order 
    Recibe por query dos variables => byColor y byOrder, los cuales van a definir de que manera el servidor devuelve al cliente los datos filtrados por color y ordenados por precio
VARIANTES -> byColor => black o white o all -> byOrder DESC o ASC
```

### DELETE -> localhost:3700/products//delete/:id
```env
Nombre de la funcion = DELETE_DeleteProduct 
    Recibe por params el id del producto a eliminar y ejecuta un destroy en la db
```




# Endpoint para ordenes =>
localhost:3700/orders


*Endpoints prar usuarios =>
localhost:3700/users
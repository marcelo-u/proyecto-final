## Endpoints

### Extra

[GET]localhost:8080/prefix

### Auth

[POST]localhost:8080/auth/user/register

[POST]localhost:8080/auth/user/login

[GET]localhost:8080/auth/whoami ((JWT req.))

### Producto

[GET]localhost:8080/producto/listar/:id? (JWT req.)

[POST]localhost:8080/producto/agregar (JWT req.)

[DEL]localhost:8080/producto/borrar/:id (JWT req.)

[PUT]localhost:8080/producto/actualizar/id (JWT req.)

### Carrito

[POST]localhost:8080/carrito/crear/:user_id (JWT req.)

[GET]localhost:8080/carrito/listar/:user_id (JWT req.)

[PUT]localhost:8080/carrito/agregar/:user_id (JWT req.)

[DEL]localhost:8080/carrito/borrar/:user_id (JWT req.)

[DEL]localhost:8080/carrito/borrar/:id (JWT req.)

[POST]localhost:8080/carrito/checkout (JWT req.)

## Instrucciones

[![Watch the video](https://res.cloudinary.com/hdsqazxtw/image/upload/v1570710978/coderhouse.jpg)](https://www.youtube.com/watch?v=-XjnWLd26Cs)

### prefijos

existe un endpoint /prefix que devuelve una lista de prefijos internacionales para seleccionar durante el registro, estos se guardan localmente dentro de db.json en el root del proyecto.

### login y registro

La aplicación tiene autenticación utilizando passport local y JWT. al autenticarse desde el endpoint /auth/user/login con usuario y contraseña se obtiene el token en el body de la respuesta.
luego se envía en el resto de los endpoints requeridos en el header como "authentication": "bearer easdkljsad12312_2123aadlkaj". En el back un middleware valida que el token se encuentre presente en los endpoints, si no existe devuelve un 403.

### whoami

el endpoint al enviarse un token devuelve los datos del usuario al que pertenece, con esto puedo mantener al usuario loggeado en el front.

### endpoints producto y carrito

tienen la logica de negocio para agregar productos, sumarlos al carrito, editar, borrar, etc.

### carrito: checkout

endpoint que notifica al administrador que un nuevo pedido se ha realizado, también se ocupa de eliminar el carrito actual luego de enviarse la compra.

## configuracion:

toda la configuracion se setea en el .env: ver los comentarios en el archivo [.env_example] del root

### rollback

npx sequelize-cli db:migrate:undo:all

## Front de prueba

Ver instrucciones en el ./web/README.md

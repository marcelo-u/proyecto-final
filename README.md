## Endpoints

### Producto

[GET]localhost:8080/producto/listar/:id?
[POST]localhost:8080/producto/agregar
[DEL]localhost:8080/producto/borrar/:id
[PUT]localhost:8080/producto/actualizar/id

### Carrito

[GET]localhost:8080/carrito/listar
[DEL]localhost:8080/carrito/agregar/:id_prod
[DEL]localhost:8080/carrito/borrar/:id

## Instrucciones

El proyecto puede conectarse a 2 data sources diferentes, mongo atlas o mysql local

## MySQL: migrations

se immplementó sequelize, correr migrations con el comando, crear la base de datos "ecommerce" con el script. Correr el script resources/ecommerce.sql parar crear la base y luego seguir con migrations.

### migrations

npx sequelize-cli db:migrate

### rollback

npx sequelize-cli db:migrate:undo:all

## configuracion:

toda la configuracion se setea en el .env: ver los comentarios

## Front de prueba

Ver instrucciones en el ./web/README.md

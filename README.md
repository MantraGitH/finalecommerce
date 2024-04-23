Backend de una aplicación de comercio online

Este es el backend de una aplicación de comercio online desarrollada en Node.js utilizando type modules. Proporciona una API para gestionar usuarios, productos, carritos y tickets de compra.

Para instalar debes realizar los siguientes pasos:

-Clonar este repositorio.
-Ejecutar `npm install` para instalar todas las dependencias.

Antes de comenzar, asegúrate de configurar las variables de entorno de manera adecuada (archivo env.example)

-Iniciar el servidor-

Para iniciar el servidor, ejecuta el siguiente comando en tu consola:

"npm start MONGO"

El servidor se iniciará en el puerto especificado en la configuración.


-Endpoints-

Productos:

- **GET /api/products/:** Lista todos los productos.
- **POST /api/products/:** Crea un nuevo producto. Solo los usuarios premium pueden crear productos.
- **GET /api/products/{id}:** Busca un producto por ID.
- **DELETE /api/products/{id}:** Borra un producto por ID. Los usuarios con rol de administrador pueden borrar cualquier producto, y se envía un correo electrónico al creador del producto. Los usuarios premium solo pueden borrar sus propios productos.

Carritos:

- **POST /api/carts/:** Crea un carrito. Solo los usuarios registrados pueden hacerlo.
- **GET /api/carts/{id}:** Busca un carrito por ID. Los usuarios solo tienen acceso a sus propios carritos.
- **PUT /api/carts/{idCart}/products/{idProd}:** Agrega un producto al carrito.
- **DELETE /api/carts/{idCart}/products/{idProd}:** Elimina un producto del carrito.
- **DELETE /api/tickets/{cartId}:** Vacía el carrito.

Usuarios:

- **POST /api/users/register:** Registra un usuario nuevo.
- **POST /api/users/login:** Inicia sesión del usuario y actualiza la fecha de conexión.
- **GET /api/users/profile-cookie:** Accede al perfil del usuario.
- **GET /api/users/all:** Accede a todos los usuarios. Solo los usuarios con rol de administrador pueden usar este endpoint.
- **DELETE /api/users/delete:** Borra los usuarios que tengan más de 3 meses de inactividad. Solo los usuarios con rol de administrador pueden usar este endpoint.
- **POST /api/users/profile-img:** Carga una imagen de perfil del usuario. Cuando se carga la imagen, el rol del usuario se actualiza a premium.

-Documentación-

La documentación de la API está disponible en Swagger. Para acceder a ella puedes usar la ruta `/docs` cuando el servidor esté en funcionamiento. Tambien puedes verla a través del siguiente link desplegada con render:

https://finalecommerce.onrender.com/docs/

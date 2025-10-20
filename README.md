
# UnaHur - Red Anti-Social
#  Grupo: Index


[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/F3f9PyrQ)


> **💻Backend para una red social, creada para la materia Estrategias de Persistencia - UNAHUR.💻**

---

# 📌 Descripción del proyecto

UnaHur Anti-Social Net es una red social que permite a los usuarios compartir posts con imágenes, tags y recibir comentarios. El proyecto busca replicar funcionalidades comunes de redes sociales, priorizando una arquitectura limpia, flexible y bien documentada para su despliegue backend.

---
# ⚙️ Tecnologías utilizadas

- Node.js + Express
- Sequelize ORM + SQLite
- Swagger para documentación
- Postman (colecciones de prueba)

- Para su correcta instalacion al clonar el repositorio, ejecutar npm i en la terminal.

---
# 🧱 Entidades principales

| Entidad       | Descripción                                                                 |
|---------------|-----------------------------------------------------------------------------|
| **User**      | Usuario del sistema. `username` debe ser único.                             |
| **Post**      | Publicación con descripción obligatoria y fecha. Puede tener imágenes y/o tags.      |
| **PostImagen**| Imágenes asociadas a un post. Se almacena la URL.                           |
| **Comment**   | Comentarios en publicaciones. Se ocultan si superan cierta antigüedad.      |
| **Tag**       | Etiquetas asociadas a publicaciones. Relación muchos a muchos.              |

## 📁 Estructura del Proyecto

```
📁 src/
├── controllers/       # Lógica de negocio por entidad
├── routes/            # Definición de endpoints
├── db/
│   ├── config/        # Configuración Mongo y Redis
|   ├── models         # Distintas tablas
├── middlewares/       # Validaciones y manejo de errores
├── routes             # Rutas de acceso 
├── schemas/           # Validaciones Joi
├── utils              # Genera Token    
├── main.js            # Punto de entrada de la app
```

---
## 📄 Endpoints Principales

> Todos los endpoints están organizados por entidad: `/auth`, `/user`, `/post`, `/comment`, `/tag`.

### 👤 Usuarios

- `GET /user/` - Lista de todos los usuarios
- `GET /user/:id` - Obtener usuario por ID
- `PATCH user/:id `- Modifica (actualiza) datos del usuario
- `DELETE /user/:id`- Elimina la cuenta del ususario
# Rutas de contenido de usuario:
- `GET /user/:id/posts`- Obtener todos los post creados por el usuario con id
- `GET /user/:id/comments`- Obtener todos los comentarios por un usuario especifico
# Rutas de acciones sociales:
- `POST /user/:id/follow/:idASeguir `- Seguir a otro usuario
- `DELETE /user/:id/unfollow/:idSeguido` - Deja de seguir al usuario especificado
- `GET /user/:id/seguidores`- Obtiene lista de seguidores
- `GET /user/:id/seguidos`- Obtiene lista de seguidos
- `GET /user/:id/seguidores/count`- Obtener la cantidad de seguidores
- `GET /user/:id/seguidos/count`-Obtener el conteo de seguidos

### 📝 Posts

- `GET /post` - Obtener todos los posteos
- `GET /post/:id` - Obtener un post específico por id
- `POST /post/` - Crear nuevo post
- `PATCH /post/:id` - Modifica (actualiza) un post por id
- `DELETE /post/:id` - Eliminar post
- `GET /post/:id/imagenes` - Obtener las imágenes de un post específico por id
- `POST /post/:id/imagenes` - Agregar una imagen a un post específico
- `DELETE /post/:id/imagenes/:idImagen` - Eliminar una imagen de un post
- `GET /post/:id/tags` - Obtener los tags de un post
- `POST /post/:id/tag` - Agregar un tag a un post
- `DELETE /post/:id/tag/:idTag` - Eliminar un tag de un post
- `GET /post/tag/:id` - Obtener posteos según un tag específico
- `POST /post/create-imagenes` - Crear post con imágenes
- `POST /post/create-tags` - Crear post con tags
- `POST /post/create-completo` - Crear post con imágenes y tags
- `GET /post/:id/comments` - Obtener comentarios de un post
- `GET /post/:id/comments/lazy` - Obtener los primeros 10 comentarios de un post
- `GET /post/user/:id/feed` - Obtener el feed de un usuario (posteos de sus seguidos)

### 💬 Comentarios
- `GET /comment/`- Lista de todos los comentarios 
- `GET /comment/:id`- Otener un comentario especifico
- `POST /comment/`- Crea un nuevo comentario
- `PATCH	/comment/:id`- Modificar (actualizar) el comentario
- `DELETE /comment/:id`- Eliminar (borrar) un comentario

### 🏷 Etiquetas
- `GET /tag/`- Obtener la lista de todas las etiquetas
- `GET /tag/:id`- Obtener una etiqueta especifica
- `POST /tag/`- Crear una nueva etiqueta
- `PATCH	/tag/:id`- Modificar una etiqueta
- `DELETE /tag/:id`- Eliminar (borrar) una ruta

### 🔑 Autenticación
- `POST /auth/login`- Iniciar sesión. Si es correcta devuelve un Token
- `POST /auth/register`- Crear nuevo usuario (Registro, con todos sus datos) 

---

## 🎁 Bonus Implementados

- ✅ **Relaciones de seguimiento entre usuarios** (Seguidores/Siguiendo).
- ✅**Autenticación y Autorización por JWT**: Se implementó un sistema de JSON Web Tokens JWT para garantizar que todas las rutas de recursos estén protegidas y solo sean accesibles por usuarios válidos y verificados.

---

## 🚀 Ejecución del Proyecto

1. Clonar repositorio:

   git clone https://github.com/EP-UnaHur-2025C2/anti-social-relational-index.git

   cd anti-social-relational-index


2. Instalar dependencias:
   
   npm i

3. Iniciar servidor:
   
   npm run dev
   

---

## 📚 Documentación

- Swagger está disponible en el entorno local en `/doc`(puerto definido por variable de entorno o 3001 por defecto).
- Colección de Postman en: https://ivanherold.postman.co/workspace/Ivan-Herold's-Workspace~4583ca7e-0690-455f-87ef-fd19b8005372/collection/44128094-e0aac167-e0fb-4db2-9364-7759505bff06?action=share&creator=44128094 

---

## Aclaraciones
- La cantidad de meses de visualización de los comentarios y el puerto del servidor se configuran mediante variables de entorno.
- La entidad PostImagen no posee un CRUD independiente, ya que sus operaciones son gestionadas a través de la entidad Post, de la que depende directamente.
- La documentación de la API se generó automáticamente utilizando Swagger UI y Swagger Autogen, y luego fue convertida manualmente al formato YAML.
- El PATCH de Post solo permite modificar el texto del posteo, no imágenes ni tags, ya que la modificación de las mismas dentro del posteo se hace eliminando y agregando. Aunque sí se puede actualizar el nombre de los tags independientemente de los posteos a los que pertenecen.
- Para probar desde swagger hay que registrarse y hacer el login, del cual se obtiene un token que se debe pegar en la parte que dice "Authorize" arriba a la derecha, de la siguiente manera: Bearer *token*.
- Todas las acciones se hacen desde un mismo usuario (postear, eliminar, hacer patch, etc). Por ejemplo, si inicio sesión con un usuario, no puedo eliminar a otro existente (error: no autorizado).


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
| **Post**      | Publicación con descripción obligatoria y fecha. Puede tener imágenes.      |
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
- `PATH user/:id `- Modifica (actualiza) datos del usuario
- `DELETE /user/:id`- Elimina la cuenta del ususario
# Rutas de contenido de usuario:
- `GET /user/:id/posts`- Obtener todos los post creados por el usuario con id
- `GET /user/:id/comments`- Obtener todos los comentarios por un usuario especifico
# Rutas de acciones sociales:
- `POST /users/:id/follow/:idASeguir `- Seguir a otro usuario
- `DELETE /users/:id/unfollow/:idSeguido` - Deja de seguir al usuario especificado
- `GET /user/:id/seguidores`- Obtiene lista de seguidores
- `GET /user/:id/seguidos`- Obtiene lista de seguidos
- `GET /user/:id/seguidores/count`- Obtener la cantidad de seguidores
- `GET /user/:id/seguidos/count`-Obtener el conteo de seguidos

### 📝 Posts

- `GET /posts` - Obtener todos los posteos
- `GET /post/:id` - Obtener un post especifico por id
- `POST /posts/` - Crear nuevo post
- `PATH /posts/:id` - Modifica (actualiza) un post por id
- `DELETE /posts/:id` - Eliminar post

### 💬 Comentarios
- `GET /comment/`- Lista de todos los comentarios 
- `GET /comment/:id`- Otener un comentario especifico
- `POST /comment/`- Crea un nuevo comentario
- `PATCH	/comment/:id`- Modificar (actualizar) el comentario
- `DELETE	/comment/:id`- Eliminar (borrar) un comentario

### 🏷 Etiquetas
- `GET	/tag/`- Obtener la lista de todas las etiquetas
- `GET	/tag/:id`- Obtener una etiqueta especifica
- `POST	/tag/`- Crear una nueva etiqueta
- `PATCH	/tag/:id`- Modificar una etiqueta
- `DELETE	/tag/:id`- Eliminar (borrar) una ruta

### 🔑 Autenticación
- `POST	/auth/login`- Iniciar sesión. Si es correcta devuelve un Token
- `/auth/register`- Crear nuevo usuario (Registro, con todos sus datos) 

---

## 🎁 Bonus Implementados

- ✅ **Relaciones de seguimiento entre usuarios** (Seguidores/Siguiendo).
- ✅ **Subida y descarga de imágenes:** Las imágenes enviadas por URL se descargan, validan y almacenan localmente.
- ✅ **Caché con Redis**: para almacenar temporalmente comentarios y optimizar lectura de datos poco cambiantes.
- ✅**Autenticación y Autorización por JWT**: Se implementó un sistema de JSON Web Tokens JWT para garantizar que todas las rutas de recursos estén protegidas y solo sean accesibles por usuarios válidos y verificados.

---

## 🚀 Ejecución del Proyecto

1. Clonar repositorio:
   git clone https://github.com/EP-UnaHur-2025C2/anti-social-relational-index.git
   cd anti-social-relational-index


2. Instalar dependencias:
   
   npm i


3. Levantar servicios con Docker:
   
   docker-compose up
   ```
4. Iniciar servidor:
   
   npm run dev
   

---

## 📚 Documentación

- Swagger disponible en: `http://localhost:3001/doc/`
- Colección de Postman en: 
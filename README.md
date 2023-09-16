# Todo App

Esta es una practica para realizar una aplicación organizadora de tareas con manejo de usuarios con contraseña encriptada y Tokens de Acceso utilizando una base de datos.

## Tecnologías

- React.js y Vite: Interfaz de usuario dinámica y rápida.
- Tailwind CSS: Manejo de estilos de la aplicación.
- Bcrypt: Encriptado de contraseñas de usuarios.
- JsonWebToken: Gestión de autenticación con tokens de acceso.
- PostgreSQL y Sequelize: Almacenamiento de datos y manejo de peticiones en una base de datos relacional.
- Zod: Validación confiable de las solicitudes al servidor.

## Iniciar proyecto

Para poder iniciar el proyecto es necesario tener instalado los siguientes programas:

- [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads): 15.4 o superior
- [Node.JS](https://nodejs.org/es): 18.17.1 o superior

> También se puede optar por usar [docker](https://hub.docker.com/) utilizando el comando: `docker compose up` en la [carpeta raíz](./), tendrías que poder iniciar la app en <a href='http://localhost:5173'>http://localhost:5173</a>. esto es mas rápido y sin configuración previa. Por ahora solo esta en modo desarrollo.

Tendrás que crear una base de datos para probarlo en PostgreSQL o inicializar uno con [docker](https://hub.docker.com/_/postgres). Luego crea un archivo [`.env`](./server/.env) que tendrá las siguientes variables de entorno del archivo [.env.example](./server/.env.example)

Luego de completar la configuración, tendrás que ejecutar los siguientes comandos en la [carpeta raíz](./):

```bash
npm install --save
# instala dependencias de los proyectos client y server
npm run install:app
# inicia la aplicación en modo previsualización/producción
npm run start:app
# modo de desarrollo
npm run dev:app
```

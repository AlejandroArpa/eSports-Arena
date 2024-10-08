# eSports API

Esta es una API desarrollada con **NestJS** para gestionar torneos de esports. La API permite la administración de torneos, registro de jugadores, puntuaciones, entre otras funcionalidades específicas de competiciones de deportes electrónicos.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos en tu entorno de desarrollo:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) como base de datos
## Diagrama ER

![image](https://github.com/user-attachments/assets/910be3a6-e1ba-457c-a409-1bd90c2661cd)

## Instalación

1. Clona el repositorio:

   ```
   git clone https://github.com/AlejandroArpa/eSports-Arena/
   ```

2. Navega a la carpeta del proyecto:

   ```
   cd esports-api
   ```

3. Instala las dependencias del proyecto:

   ```
   npm install
   ```

   o si prefieres usar `yarn`:

   ```
   yarn install
   ```

## Variables de entorno

Debes crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```
PORT=
JWT_SECRET=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PWD=
DB_NAME=
```

Asegúrate de que las credenciales y configuraciones de base de datos sean correctas para tu entorno.

## Ejecución del proyecto

### Modo de desarrollo

Para ejecutar la API en modo de desarrollo, usa el siguiente comando:

```
npm run start:dev
```

Esto ejecutará el servidor con hot-reload, lo que permite que los cambios se reflejen de inmediato sin necesidad de reiniciar el servidor.

### Swagger

La API cuenta con una interfaz de documentación generada automáticamente con Swagger. Puedes acceder a ella en la ruta `/api/docs` una vez que el servidor esté en ejecución.


## Licencia

Este proyecto está licenciado bajo la licencia MIT.

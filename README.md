# apiRest

API REST académica para gestionar usuarios, desarrollada con TypeScript, Node.js, Express, Prisma y PostgreSQL. Permite registrar, consultar, actualizar y eliminar usuarios, con persistencia en una base de datos relacional y hashing de contraseñas mediante bcrypt.

> **Proyecto académico:** realizado para la materia Laboratorio IV con el profesor González. El código se conserva como parte del recorrido de aprendizaje del autor y refleja el alcance y las decisiones de su versión original.

## Funcionalidades

- Registro de usuarios con nombre, correo electrónico y contraseña.
- Consulta del listado de usuarios.
- Consulta de un usuario por identificador.
- Actualización de usuarios.
- Eliminación de usuarios.
- Validación de unicidad del correo electrónico mediante el esquema de base de datos.
- Hashing de contraseñas antes de crear un usuario y al actualizar su contraseña.

La aplicación no implementa autenticación, autorización ni emisión de tokens.

## Tecnologías utilizadas

- TypeScript
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- bcrypt
- dotenv
- Docker Compose

Las versiones utilizadas están declaradas en `package.json` y fijadas en `package-lock.json`.

## Estructura del proyecto

```text
.
├── prisma/
│   ├── migrations/       # Migraciones de la base de datos
│   └── schema.prisma     # Esquema de Prisma
├── src/
│   ├── controllers/      # Manejo de solicitudes y respuestas HTTP
│   ├── models/           # Interfaces del dominio
│   ├── routes/           # Definición de rutas
│   ├── services/         # Acceso a datos y hashing de contraseñas
│   ├── app.ts            # Configuración de Express
│   └── server.ts         # Inicio del servidor
├── .env.example          # Plantilla de variables de entorno
├── docker-compose.yml    # PostgreSQL para desarrollo local
└── package.json          # Scripts y dependencias
```

El proyecto separa las rutas, los controladores y los servicios. Prisma se utiliza desde la capa de servicios para acceder a PostgreSQL.

## Modelo de datos

La entidad `Usuario` contiene:

- `id`: UUID generado automáticamente.
- `nombre`: nombre del usuario.
- `email`: correo electrónico único.
- `password`: contraseña almacenada como hash.

## Rutas actuales

El router se monta en `/usuarios` y sus rutas internas también incluyen ese segmento. Por eso, las rutas efectivas de la implementación original son:

| Método | Ruta | Acción |
| --- | --- | --- |
| `GET` | `/usuarios/usuarios` | Lista todos los usuarios |
| `GET` | `/usuarios/usuarios/:id` | Obtiene un usuario por ID |
| `POST` | `/usuarios/usuarios/register` | Registra un usuario |
| `PUT` | `/usuarios/usuarios/:id` | Actualiza un usuario |
| `DELETE` | `/usuarios/usuarios/:id` | Elimina un usuario |

Estas rutas se documentan tal como están implementadas; no fueron modificadas durante la preparación del repositorio.

## Requisitos

- Node.js y npm. El proyecto no fija una versión concreta de Node.js.
- Docker y Docker Compose.
- Un puerto local disponible para PostgreSQL (`5432` por defecto).
- Un puerto local disponible para la API (`3080` por defecto).

## Variables de entorno

Creá un archivo `.env` a partir de `.env.example`:

```bash
cp .env.example .env
```

En PowerShell:

```powershell
Copy-Item .env.example .env
```

Variables utilizadas:

| Variable | Uso |
| --- | --- |
| `POSTGRES_USER` | Usuario del contenedor de PostgreSQL |
| `POSTGRES_PASSWORD` | Contraseña del contenedor de PostgreSQL |
| `POSTGRES_DB` | Nombre de la base de datos |
| `DATABASE_URL` | Cadena de conexión utilizada por Prisma |
| `PORT` | Puerto de la API; es opcional y su valor por defecto es `3080` |

Los datos de `DATABASE_URL` deben coincidir con la configuración de PostgreSQL. No publiques el archivo `.env` ni utilices los valores de ejemplo en un entorno real.

## Instalación y ejecución

1. Cloná el repositorio e ingresá al directorio:

   ```bash
   git clone https://github.com/Juani17/apiRest.git
   cd apiRest
   ```

2. Instalá las dependencias:

   ```bash
   npm install
   ```

3. Creá y revisá el archivo `.env` siguiendo la sección anterior.

4. Iniciá PostgreSQL:

   ```bash
   docker compose up -d
   ```

   Docker Compose crea los datos locales en `postgres/`. Ese directorio es generado durante la ejecución y está excluido del repositorio.

5. Generá el cliente de Prisma y aplicá las migraciones:

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

6. Iniciá la API en modo de desarrollo:

   ```bash
   npm run dev
   ```

De manera predeterminada, el servidor escucha en `http://localhost:3080`.

## Persistencia y contraseñas

PostgreSQL almacena los usuarios y Prisma gestiona el esquema, las migraciones y las operaciones de persistencia. Antes de crear un usuario, la contraseña se procesa con bcrypt. El servicio también vuelve a aplicar el hashing cuando una actualización incluye una nueva contraseña.

El directorio local `postgres/` no forma parte del código fuente y no debe versionarse.

## Conceptos trabajados

Este proyecto permitió practicar:

- Diseño de endpoints HTTP para operaciones CRUD.
- Organización de una aplicación Express en rutas, controladores y servicios.
- Uso de TypeScript en un backend con Node.js.
- Persistencia relacional mediante Prisma y PostgreSQL.
- Migraciones y restricciones de unicidad.
- Hashing de contraseñas con bcrypt.
- Configuración mediante variables de entorno.
- Ejecución de una base de datos local con Docker Compose.

## Alcance

`apiRest` se presenta como un trabajo académico y no como un producto listo para producción. Se mantuvo la implementación original para mostrar el proceso de aprendizaje y la evolución del autor.

"# metrics-app-backend" 

Servidor API REST desarrollado en Node.js y Express para la centralización y gestión de métricas de rendimiento por departamentos. Este proyecto se conecta a una base de datos relacional en Supabase (PostgreSQL) bajo la norma de diseño relacional 3NF.

## Stack Tecnológico
* **Runtime:** Node.js
* **Framework:** Express.js
* **Base de Datos:** Supabase (PostgreSQL)
* **Librerías principales:** `@supabase/supabase-js`, `dotenv`, `cors`

## Estructura del Proyecto
El proyecto sigue una arquitectura limpia basada en capas para separar responsabilidades:
```text
metrics-app-backend/
├── src/
│   ├── config/      # Inicialización del cliente de Supabase
│   ├── controllers/ # Lógica de negocio y manejo del CRUD
│   └── routes/      # Mapeo de rutas de la API REST
└── .env             # Variables de entorno (Configuraciones locales)
```


## Arquitectura y Características Adicionales
* **Manejo Centralizado de Errores:** Se integró un middleware de errores (errorHandler.js) que intercepta cualquier fallo no controlado durante el ciclo de vida de las peticiones HTTP, garantizando respuestas JSON estructuradas con códigos de estado HTTP adecuados (400, 404, 500).
* **Configuración para Vercel:** Se renombró el archivo principal a index.js y se configuró un archivo vercel.json para facilitar el despliegue serverless continuo.
* **Módulo de Autenticación (Supabase Auth):** Soporte para registro e inicio de sesión de usuarios asociando metadatos para la gestión de roles (admin y user).



## Endpoints Disponibles
La API expone los siguientes endpoints base en la ruta /api/metricas:
| Método | Endpoint | Descripción | Parámetros / Query |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/metricas` | Obtiene la lista completa de métricas registradas. | Ninguno |
| **GET** | `/api/metricas?departamento=ID` | Filtra las métricas vinculadas a un departamento específico. | `?departamento=id_numerico` |
| **POST** | `/api/metricas` | Registra una nueva métrica empresarial. | Requiere JSON en el *Body* |
| **PUT** | `/api/metricas/:id` | Modifica una métrica existente según su ID. | Requiere ID en la URL y JSON en el *Body* |
| **DELETE** | `/api/metricas/:id` | Elimina un registro de métrica del sistema. | Requiere ID en la URL |

La API expone los siguientes endpoints base en la ruta /api/departamentos:
| Método | Endpoint | Descripción | Parámetros / Query |
| :--- | :--- | :--- | :--- |
| GET | /api/departamentos | Obtiene la lista completa de departamentos ordenados de forma ascendente por su ID. | Ninguno |


## Instrucciones de Instalación y Ejecución Local
1. Clona este repositorio y navega a la carpeta del proyecto.

2. Instala las dependencias necesarias:
```bash
npm install
```

3. Crea un archivo .env en la raíz siguiendo el modelo:
```js
PORT=3000
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_anon_key
```

4. Ejecuta el servidor en modo desarrollo/producción:
```bash
npm start
```


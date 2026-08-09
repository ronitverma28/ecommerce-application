# E-Commerce Application

A full-stack e-commerce application built with **Spring Boot 3.x** (Java 21) for the backend and **React.js** (Vite) for the frontend.

## Project Structure

```
ECommerce-Application/

├── backend/          # Spring Boot REST API
│   ├── pom.xml
│   ├── src/
│   └── ...

├── frontend/         # React.js client application
│   ├── package.json
│   ├── src/
│   └── ...

├── README.md
└── .gitignore
```

## Modules

- **Authentication** — JWT-based login & registration
- **Users** — Profile management
- **Categories** — Product category management
- **Products** — Catalog browsing
- **Shopping Cart** — Cart operations
- **Orders** — Order placement & tracking
- **Payments** — Payment simulation
- **Admin Dashboard** — Administrative features

## Technology Stack

### Backend

| Technology      | Version   |
|-----------------|-----------|
| Java            | 21        |
| Spring Boot     | 3.x       |
| Build Tool      | Maven     |
| Database        | MySQL     |
| Security        | Spring Security + JWT |
| ORM             | Spring Data JPA + Hibernate |
| Validation      | Bean Validation |
| Mapping         | MapStruct |
| Docs            | Swagger / OpenAPI |
| Code Generation | Lombok    |

#### Build & Run

```bash
cd backend
./mvnw spring-boot:run
```

API documentation is available at `http://localhost:8080/swagger-ui.html` once the server is running.

### Frontend

| Technology      | Version   |
|-----------------|-----------|
| React           | Latest    |
| Build Tool      | Vite      |
| Routing         | React Router |
| State           | Redux Toolkit |
| Forms           | React Hook Form |
| HTTP            | Axios     |
| Styling         | Tailwind CSS |
| Toasts          | React Toastify |

#### Setup & Run

```bash
cd frontend
npm install
npm run dev
```

The client will be available at `http://localhost:5173`.

## Database

The application uses **MySQL**. Create a database and update the credentials in `backend/src/main/resources/application.properties`.

## Development Phases

The project is developed phase by phase. See the development log in the project documentation for the complete breakdown of each phase.

## License

MIT License — see the LICENSE file for details.

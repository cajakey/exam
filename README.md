# E-Commerce Platform

This is a full-stack e-commerce platform consisting of a **NestJS backend (ecommerce-service)** and a **Vue 3 frontend (ecommerce-portal)**. The project is containerized using Docker and managed with Docker Compose.

## 📌 Features

- **Authentication**: JWT-based authentication
- **Product Management**: CRUD operations for products
- **Database**: PostgreSQL with TypeORM
- **Frontend UI**: Vue 3 with TypeScript, Pinia, Ant Design
- **Backend**: NestJS with REST APIs
- **Containerization**: Docker and Docker Compose for simplified deployment

---

## 🚀 Getting Started

### Prerequisites

- Install [Docker](https://docs.docker.com/get-docker/)
- Install [Docker Compose](https://docs.docker.com/compose/install/)

### 🔧 Installation

Clone this repository:

```sh
git clone https://github.com/your-username/ecommerce-platform.git
cd ecommerce-platform

To build and start all services, run:
docker-compose up --build
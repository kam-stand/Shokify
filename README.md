<div align="center">
  <img src="./client/shokify-frontend/src/assets/Gemini_Generated_Image_w38ccdw38ccdw38c.png" alt="Shokify Logo" width="300"/>
  
  # 🛒 Shokify
  
  **A Modern E-commerce Platform Built with Microservice Architecture**
  
  [![GitHub Stars](https://img.shields.io/github/stars/kam-stand/Shokify?style=for-the-badge&logo=github&color=yellow)](https://github.com/kam-stand/Shokify/stargazers)
  [![GitHub Forks](https://img.shields.io/github/forks/kam-stand/Shokify?style=for-the-badge&logo=github&color=blue)](https://github.com/kam-stand/Shokify/network/members)
  [![GitHub Contributors](https://img.shields.io/github/contributors/kam-stand/Shokify?style=for-the-badge&logo=github&color=green)](https://github.com/kam-stand/Shokify/graphs/contributors)
  [![GitHub Issues](https://img.shields.io/github/issues/kam-stand/Shokify?style=for-the-badge&logo=github&color=red)](https://github.com/kam-stand/Shokify/issues)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
  
  [![CI Pipeline](https://github.com/kam-stand/Shokify/actions/workflows/github-actions-demo.yml/badge.svg)](https://github.com/kam-stand/Shokify/actions/workflows/github-actions-demo.yml)
</div>

---

## 📋 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Docker Setup](#docker-setup)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

---

## 🎯 About

Shokify is a cutting-edge e-commerce platform designed with microservice architecture principles. Built for scalability, performance, and modern user experience, it provides a complete online shopping solution with integrated payment processing, OAuth authentication, and cloud-native deployment.

---

## 🛠️ Tech Stack

### **Frontend**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

### **Backend**

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white)](https://spring.io/projects/spring-security)
[![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)](https://gradle.org/)

### **Database**

[![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white)](https://hibernate.org/)

### **Authentication & Payments**

[![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![OAuth 2.0](https://img.shields.io/badge/OAuth_2.0-3C4043?style=for-the-badge&logo=oauth&logoColor=white)](https://oauth.net/2/)

### **DevOps & Deployment**

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Podman](https://img.shields.io/badge/Podman-892CA0?style=for-the-badge&logo=podman&logoColor=white)](https://podman.io/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)

---

## 🏗️ Architecture

Shokify follows a **microservice architecture** pattern with the following components:

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React SPA<br/>Port: 5173]
    end

    subgraph "API Gateway Layer"
        B[Spring Boot API Gateway<br/>Port: 8080]
    end

    subgraph "Core Services"
        C[Product Service<br/>Product Catalog Management]
        D[Inventory Service<br/>Stock & Availability]
        E[User Service<br/>User Management]
        F[Order Service<br/>Order Processing]
    end

    subgraph "External Services"
        G[Google Cloud OAuth<br/>Authentication]
        H[Stripe Integration<br/>Payment Processing]
    end

    subgraph "Data Layer"
        I[(MySQL Database<br/>Port: 3306)]
        J[(Product DB)]
        K[(Inventory DB)]
        L[(User DB)]
        M[(Order DB)]
    end

    A --> B
    B --> C
    B --> D
    B --> E
    B --> F
    B --> G
    B --> H
    C --> J
    D --> K
    E --> L
    F --> M
    I -.-> J
    I -.-> K
    I -.-> L
    I -.-> M
```

### **Microservices Breakdown**

| Service               | Responsibility                                     | Port | Database Schema                                |
| --------------------- | -------------------------------------------------- | ---- | ---------------------------------------------- |
| **Product Service**   | Product catalog, categories, descriptions, pricing | 8081 | `products`, `categories`, `product_categories` |
| **Inventory Service** | Stock levels, warehouse management, availability   | 8082 | `inventory`, `stock_movements`, `warehouses`   |
| **User Service**      | User profiles, authentication, preferences         | 8083 | `users`, `user_profiles`, `user_preferences`   |
| **Order Service**     | Order processing, cart management, checkout        | 8084 | `orders`, `order_items`, `shopping_carts`      |
| **API Gateway**       | Request routing, load balancing, authentication    | 8080 | -                                              |

### **Service Communication**

- **Frontend ↔ API Gateway**: RESTful API calls
- **API Gateway ↔ Microservices**: Internal service communication
- **Product ↔ Inventory**: Real-time stock validation
- **Order ↔ Product**: Product information retrieval
- **Order ↔ Inventory**: Stock reservation and updates
- **All Services ↔ Auth**: OAuth token validation
- **Order ↔ Stripe**: Payment processing

### **Data Flow Example: Purchase Process**

```mermaid
sequenceDiagram
    participant U as User (Frontend)
    participant G as API Gateway
    participant P as Product Service
    participant I as Inventory Service
    participant O as Order Service
    participant S as Stripe

    U->>G: Add item to cart
    G->>P: Get product details
    P-->>G: Product info
    G->>I: Check availability
    I-->>G: Stock available
    G-->>U: Item added to cart

    U->>G: Checkout
    G->>O: Create order
    O->>I: Reserve stock
    I-->>O: Stock reserved
    O->>S: Process payment
    S-->>O: Payment confirmed
    O->>I: Commit stock reduction
    O-->>G: Order confirmed
    G-->>U: Order success
```

---

---

## ✨ Features

- 🛍️ **Product Catalog Management**
- 🛒 **Shopping Cart & Checkout**
- 🔐 **OAuth Authentication (Google)**
- 💳 **Stripe Payment Integration**
- 📱 **Responsive Design**
- 🔒 **Secure API Endpoints**
- 🐳 **Containerized Deployment**
- 🧪 **Automated Testing Pipeline**

---

## 📋 Prerequisites

Before running Shokify, ensure you have the following installed:

- **Java 21** or higher
- **Node.js 22** or higher
- **MySQL 8.0** or higher
- **Docker** or **Podman**
- **Git**

---

## 🚀 Installation

### **1. Clone the Repository**

```bash
git clone https://github.com/kam-stand/Shokify.git
cd Shokify
```

### **2. Backend Setup**

```bash
cd server/shokify

# Install dependencies and build
./gradlew build

# Run the application
./gradlew bootRun
```

### **3. Frontend Setup**

```bash
cd client/shokify-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### **4. Database Setup**

```bash
# Connect to MySQL
mysql -u root -p

# Create database and user
CREATE DATABASE shokify;
CREATE USER 'shokify_user'@'localhost' IDENTIFIED BY 'Kamrul14!';
GRANT ALL PRIVILEGES ON shokify.* TO 'shokify_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 🐳 Docker Setup

### **Using Docker Compose**

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop all services
docker-compose down

# Remove volumes (clean slate)
docker-compose down -v
```

### **Using Podman Compose (Alternative)**

```bash
# Build and start all services
podman-compose up --build

# Run in background
podman-compose up -d --build

# Stop all services
podman-compose down
```

### **Individual Container Commands**

```bash
# Build images
docker build -f Dockerfile.frontend -t shokify-frontend .
docker build -f Dockerfile.backend -t shokify-backend .

# Run MySQL
docker run -d --name shokify-mysql \
  -e MYSQL_ROOT_PASSWORD=Kamrul14 \
  -e MYSQL_DATABASE=shokify \
  -e MYSQL_USER=shokify_user \
  -e MYSQL_PASSWORD=Kamrul14! \
  -p 3306:3306 \
  mysql:8.0

# Run Backend
docker run -d --name shokify-backend \
  -p 8080:8080 \
  --link shokify-mysql:mysql \
  shokify-backend

# Run Frontend
docker run -d --name shokify-frontend \
  -p 5173:5173 \
  shokify-frontend
```

---

## 📖 Usage

### **Access the Application**

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Database**: localhost:3306

### **API Endpoints**

```bash
# Health check
GET http://localhost:8080/

# Expected Response: "Hello, Shokify!"
```

### **Development Profiles**

```bash
# Local development (native MySQL)
./gradlew bootRun --args='--spring.profiles.active=local'

# Docker development (containerized MySQL)
./gradlew bootRun --args='--spring.profiles.active=docker'
```

---

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines.

### **How to Contribute**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Found a Bug?**

Please create an issue [here](https://github.com/kam-stand/Shokify/issues/new).

---

## 🙏 Acknowledgments

This project is built with amazing open-source technologies:

[![Spring Boot Docs](https://img.shields.io/badge/Spring_Boot-Documentation-6DB33F?style=flat-square&logo=spring-boot)](https://spring.io/projects/spring-boot)
[![React Docs](https://img.shields.io/badge/React-Documentation-61DAFB?style=flat-square&logo=react)](https://reactjs.org/docs/getting-started.html)
[![MySQL Docs](https://img.shields.io/badge/MySQL-Documentation-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://dev.mysql.com/doc/)
[![Docker Docs](https://img.shields.io/badge/Docker-Documentation-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docs.docker.com/)
[![Stripe Docs](https://img.shields.io/badge/Stripe-Documentation-008CDD?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com/docs)
[![Google Cloud Docs](https://img.shields.io/badge/Google_Cloud-Documentation-4285F4?style=flat-square&logo=google-cloud&logoColor=white)](https://cloud.google.com/docs)

Special thanks to the open-source community for providing these incredible tools.

---

## 📧 Contact

**Kam Hassan**

[![Email](https://img.shields.io/badge/Email-kh84590@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kh84590@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kam--hassan-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/kam-hassan)
[![GitHub](https://img.shields.io/badge/GitHub-kam--stand-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kam-stand)

---

<div align="center">
  
  **⭐ Star this repository if you find it helpful!**
  
  Made with ❤️ by [Kam Hassan](https://github.com/kam-stand)
  
</div>

# Form IA Creator Backend

Backend para criação de formulários com IA usando arquitetura hexagonal (Clean Architecture) em Node.js com TypeScript, Express e PostgreSQL.

## 🏗️ Arquitetura

Este projeto segue os princípios da **Arquitetura Hexagonal** (Clean Architecture), organizando o código em camadas bem definidas:

```
src/
├── domain/           # Regras de negócio e entidades
│   ├── entities/     # Entidades do domínio
│   ├── repositories/ # Interfaces dos repositórios
│   └── services/     # Interfaces dos serviços
├── application/      # Casos de uso da aplicação
│   └── use-cases/    # Implementação dos casos de uso
├── infrastructure/   # Implementações externas
│   ├── repositories/ # Implementações dos repositórios
│   └── middleware/   # Middlewares do Express
└── interfaces/       # Controllers e rotas
    ├── controllers/  # Controladores HTTP
    └── routes/       # Definição das rotas
```

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem tipada
- **Express** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **Prisma** - ORM moderno
- **Jest** - Framework de testes
- **ESLint** - Linter para qualidade de código

## 📄 Licença

MIT License 

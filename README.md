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

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd form-ia-creator
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp env.example .env
```

4. Configure o banco de dados PostgreSQL:
   - Instale o PostgreSQL em sua máquina
   - Crie um banco de dados chamado `form_ia_creator`
   - Atualize a URL de conexão no arquivo `.env`

5. Execute as migrações do banco:
```bash
npm run db:migrate
```

6. Popule o banco com dados de exemplo:
```bash
npm run db:seed
```

7. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Executa o servidor em modo desenvolvimento com hot reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Executa o servidor em produção
- `npm test` - Executa os testes
- `npm run lint` - Verifica a qualidade do código
- `npm run lint:fix` - Corrige automaticamente problemas de linting

### Scripts do Prisma

- `npm run db:generate` - Gera o cliente Prisma
- `npm run db:push` - Sincroniza o schema com o banco (desenvolvimento)
- `npm run db:migrate` - Cria e aplica migrações
- `npm run db:migrate:deploy` - Aplica migrações em produção
- `npm run db:studio` - Abre o Prisma Studio para visualizar dados
- `npm run db:seed` - Popula o banco com dados de exemplo

## 📡 API Endpoints

### Formulários

- `GET /api/forms` - Lista todos os formulários
- `GET /api/forms/:id` - Busca formulário por ID
- `POST /api/forms` - Cria novo formulário

### Health Check

- `GET /health` - Verifica status do servidor
- `GET /` - Informações da API

## 📝 Exemplo de Uso

### Criar um formulário

```bash
curl -X POST http://localhost:3000/api/forms \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Formulário de Contato",
    "description": "Formulário para contato com clientes",
    "fields": [
      {
        "type": "text",
        "label": "Nome",
        "required": true,
        "placeholder": "Digite seu nome"
      },
      {
        "type": "email",
        "label": "Email",
        "required": true,
        "placeholder": "Digite seu email"
      },
      {
        "type": "textarea",
        "label": "Mensagem",
        "required": false,
        "placeholder": "Digite sua mensagem"
      }
    ]
  }'
```

### Listar formulários

```bash
curl http://localhost:3000/api/forms
```

## 🗄️ Configuração do Banco de Dados

### PostgreSQL

1. Instale o PostgreSQL:
```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# Windows
# Baixe do site oficial: https://www.postgresql.org/download/windows/
```

2. Crie o banco de dados:
```sql
CREATE DATABASE form_ia_creator;
```

3. Configure a URL de conexão no `.env`:
```
DATABASE_URL="postgresql://username:password@localhost:5432/form_ia_creator?schema=public"
```

### Prisma Studio

Para visualizar e editar dados diretamente no navegador:

```bash
npm run db:studio
```

Acesse: http://localhost:5555

## 🧪 Testes

Para executar os testes:

```bash
npm test
```

Para executar em modo watch:

```bash
npm run test:watch
```

## 🔧 Configuração

### Variáveis de Ambiente

- `PORT` - Porta do servidor (padrão: 3000)
- `NODE_ENV` - Ambiente de execução (development/production)
- `DATABASE_URL` - URL de conexão com PostgreSQL

### TypeScript

O projeto está configurado com TypeScript strict mode e path mapping para facilitar as importações:

```typescript
import { Form } from '@/domain/entities/Form';
import { FormRepository } from '@/domain/repositories/FormRepository';
```

## 🏛️ Princípios da Arquitetura

### Domain Layer
- Contém as regras de negócio centrais
- Independente de frameworks e bibliotecas externas
- Define interfaces para repositórios e serviços

### Application Layer
- Implementa os casos de uso da aplicação
- Orquestra as operações entre domínio e infraestrutura
- Contém a lógica de aplicação

### Infrastructure Layer
- Implementa as interfaces definidas no domínio
- Gerencia dados, configurações e dependências externas
- Pode ser facilmente substituída sem afetar outras camadas

### Interface Layer
- Gerencia a comunicação com o mundo exterior
- Contém controllers, rotas e middlewares
- Adapta requisições HTTP para casos de uso

## 🔄 Próximos Passos

- [x] Implementar persistência com banco de dados PostgreSQL
- [x] Configurar Prisma como ORM
- [ ] Adicionar autenticação e autorização
- [ ] Integrar com APIs de IA para geração de formulários
- [ ] Implementar validação de dados com Joi ou Zod
- [ ] Adicionar documentação com Swagger
- [ ] Implementar cache com Redis
- [ ] Adicionar logs estruturados
- [ ] Implementar rate limiting
- [ ] Adicionar testes de integração
- [ ] Implementar backup automático do banco
- [ ] Adicionar monitoramento e métricas

## 📄 Licença

MIT License 
## Começando

- Instalar Dependências

```bash
npm install
```

- Copie .sample-env e renomeie-o para .env e adicione credenciais de banco de dados nele

- Execute o comando seed para criar usuário administrador no banco de dados

```bash
npx sequelize-cli db:seed:all
```

- Iniciar servidor de desenvolvimento

```bash
npm run dev
```

Seu servidor web agora está exposto em http://localhost:8000

- Para embelezar o código

```bash
npm run format
```

- Para testar o aplicativo

```bash
npm run test:unit
```

Exemplo de Arquivo .env
```
# DB Prod 
DB_HOST=
DB_NAME=
DB_USER=
DB_PASS=
DB_PORT=

# DB Dev
DEV_DB_HOST=
DEV_DB_NAME=
DEV_DB_USER=
DEV_DB_PASS=
DEV_DB_PORT=

# DB Test
TEST_DB_HOST=
TEST_DB_NAME=
TEST_DB_USER=
TEST_DB_PASS=
TEST_DB_PORT=

# Salt para token JWT
SALT=qwerty

# Config
NODE_ENV=development
PORT=8000
```

**Todos os endpoints exigiam um token válido x-access-token nos cabeçalhos de solicitação**

### GET /api/usuários

retornar lista de usuários disponíveis

### POST /api/usuários

Cria um novo usuário
Atributos do usuário:
● nome
● e-mail (exclusivo)
● senha

### GET /api/users/:id

obter usuário por id

### Postar /api/login

Retorna token de autenticação
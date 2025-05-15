# User Management Front-End

Este projeto é o front-end de um sistema de gerenciamento de usuários, consumindo a API RESTful do back-end. Implementado em React + TypeScript com Redux Toolkit, React Router e styled-components.

## 📦 Tecnologias

- React (Create React App + TypeScript)
- Redux Toolkit + React-Redux
- React Router v6
- Axios
- styled-components (CSS-in-JS)
- Proxy de desenvolvimento (package.json)

## 🚀 Como rodar localmente

Clone este repositório e entre na pasta:

```bash
git clone <url-do-front>
cd user-management-front
```

Instale as dependências:

```bash
yarn install
```

Garanta que o back-end esteja rodando em `http://localhost:3000` (com CRUD e relatórios).

Inicie o front-end:

```bash
yarn start
```

O servidor de desenvolvimento abre em `http://localhost:3000` e usa o proxy para encaminhar `/users` e `/reports` à API.

## 🗂 Estrutura de Pastas

```bash
src/
├─ api/                     
│   ├─ user.ts              # wrappers Axios para /users  
│   └─ report.ts            # wrappers Axios para /users/reports  
│
├─ app/                     
│   ├─ store.ts             # configuração Redux Toolkit  
│   └─ hooks.ts             # useAppDispatch, useAppSelector  
│
├─ features/                
│   ├─ users/               
│   │  ├─ types.ts          # DTOs/interfaces de User  
│   │  └─ usersSlice.ts     # slice + thunks de usuários  
│   └─ reports/             
│      ├─ types.ts          # DTOs de relatório  
│      └─ reportsSlice.ts   # slice + thunks de relatórios  
│
├─ pages/                   
│   ├─ UserListPage/        
│   │  ├─ UserListPage.tsx  
│   │  └─ styles.ts         # styled-components da listagem  
│   ├─ UserFormPage/        
│   │  ├─ UserFormPage.tsx  
│   │  └─ styles.ts         # styled-components do formulário  
│   └─ ReportPage/          
│      ├─ ReportPage.tsx    
│      └─ styles.ts         # styled-components do relatório  
│
├─ components/              
│   └─ Spinner.tsx          # componente de loading  
│
├─ routes/                  
│   └─ AppRoutes.tsx        # definição de rotas React Router  
│
├─ styles/                  
│   └─ global.css           # resets e variáveis globais (opcional)  
│
├─ index.tsx                
└─ App.tsx                  
```

## 🔄 Fluxos de Uso

**Listagem de Usuários**

- Chama `GET /users`
- Ações: Editar (`/users/:id`) ou Excluir
- Botão New User leva ao formulário de criação

**Formulário de Usuário**

- Create (`POST /users`): coleta `name`, `email`, `password`, `documentNumber`, `birthDate`
- Edit (`PUT /users/:id`): carrega dados existentes, permite alterar (sem senha)
- Inclui confirmação de senha no cadastro

**Relatórios**

- `GET /users/reports/count` → Total de usuários
- `GET /users/reports/by-month` → Usuários agrupados por mês

## ⚙️ Configuração de Proxy

No `package.json`, adicione:

```jsonc
"proxy": "http://localhost:3000"
```

Isso permite usar chamadas como `axios.get('/users')` sem especificar host/back.

## 🖌️ Estilização

Páginas usam styled-components centralizados em `src/styles/`.

Cada página importa seu arquivo de estilos:
- `UserFormPage/styles.ts`
- `UserListPage/styles.ts`
- `ReportPage/styles.ts`

## 🧪 Testes

Este front não inclui testes por padrão, mas você pode adicionar:
- React Testing Library para testes de componentes e fluxos.
- Jest para mocks e cobertura de código.

## 📜 Licença

Este projeto é UNLICENSED. Use-o livremente para fins de estudo ou teste.

## 👍 Próximos Passos / Bônus

- Paginação na listagem de usuários.
- Busca e filtragem na tabela.
- Exportação de relatórios (CSV, Excel).
- Área de login com JWT.
- Upload de avatar de usuário.

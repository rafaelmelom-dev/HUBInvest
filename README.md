# HUBInvest 

Uma plataforma dedicada a oferecer controle dos seus investimentos em criptomoedas, calculando, automaticamente seu patrimônio, total investido e o retorno. Com planos de expandir as moedas aceitas.

O projeto foi desenvolvido para a disciplina de Programação para Web II, utilizando tecnologias exploradas em aula. Com o Backend feito em Express, onde toda a lógica da aplicação funciona, e o Frontend com React/Vite, onde só ocorre a interface do usuário com a aplicação. E os dados são persistidos utilizando a tecnologia SQLite, especificamente com a biblioteca better-sqlite-3, presente no npm.

## Pré requisitos 

Node.js -- motor de execução javascript usado tanto no backend, quando no frontend.
npm -- ferramenta utilizada para gerenciar os pacotes utilizados 

## Instalação e execução

1. Clone o repositório.

```bash 
git clone https://github.com/rafaelmelom-dev/HUBInvest
cd HUBInvest
```

2. Instale as dependências tanto no backend, quanto no frontend.

```bash 
cd backend 
npm i 
cd ../frontend 
npm i
cd ..
```

3. Configure as variáveis de ambiente.

Crie um aquivo `.env` na pasta `backend/` e adicione as credenciais e chaves: 

```
ADMIN_EMAIL=admin@email.com
ADMIN_PASSWORD=admin
JWT_KEY=SECRETISSIMA
```

Obs.: valores são meramente um exemplo, podem ser alterados para qualquer valor.

4. Inicie o servidor de ambos.

Em `backend/`: 
```bash
npm start
```

Em `frontend/`: 
```bash 
npm run dev 
```

Obs.: o comando acima inicia o servidor de desenvolvimento (mas pode ser feito o build também, utilizando `npm run build`, e assim iniciando um servidor no diretório `dist/`, como `npx http-server dist/`)

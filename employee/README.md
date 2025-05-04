# Sistema de Gestão de Funcionários com Cálculo de IRRF

Este projeto é uma aplicação web para cadastro e gerenciamento de funcionários, com cálculo automático do desconto de IRRF (Imposto de Renda Retido na Fonte).

## 🚀 Tecnologias Utilizadas

- **React.js** (com Vite)
- **TypeScript**
- **Tailwind CSS**
- **Redux Toolkit**
- **localStorage**

## 🧠 Funcionalidades

- Cadastro, edição, listagem e exclusão de funcionários.
- Cálculo automático do salário base para IRRF e o valor do IRRF com base:
  - Salário Bruto
  - Desconto de INSS
  - Número de Dependentes
- Filtros por nome e CPF.
- Validação de campos.
- Interface responsiva e moderna.

## 💾 Persistência de Dados com Local Storage

Este projeto utiliza o **`localStorage`** do navegador para salvar os dados dos funcionários de forma local. Isso significa que:

- As informações cadastradas (como nome, CPF, salário, etc.) são mantidas mesmo após recarregar a página ou fechar o navegador.
- Não é necessário configurar banco de dados ou back-end para testes locais.
- Os dados permanecem salvos até que o usuário os exclua manualmente (ou limpe o cache do navegador).


## 🛠️ Como Rodar o Projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/GromRibeiro/Employee-React.git

npm install
npm run dev

Acesse o projeto no navegador: http://localhost:5173

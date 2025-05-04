# Employee-React
# 💼 Sistema de Gestão de Funcionários com Cálculo de IRRF

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38B2AC?logo=tailwindcss)
![Redux](https://img.shields.io/badge/Redux_Toolkit-1.9.5-764ABC?logo=redux)

> Este projeto é uma aplicação web para **cadastro, edição e gerenciamento de funcionários**, com cálculo automático de **IRRF** (Imposto de Renda Retido na Fonte) com base nas regras da Receita Federal.

---

## 📚 Índice

- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🧠 Funcionalidades](#-funcionalidades)
- [💾 Persistência com localStorage](#-persistência-com-localstorage)
- [🛠️ Como Rodar o Projeto](#️-como-rodar-o-projeto)

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **React.js** (com Vite)
- 🟦 **TypeScript**
- 🎨 **Tailwind CSS**
- 🛠️ **Redux Toolkit**
- 💿 **localStorage** (persistência)

---

## 🧠 Funcionalidades

- 📥 Cadastro de novos funcionários
- ✏️ Edição de dados já existentes
- ❌ Exclusão de funcionários
- 📋 Listagem de todos os funcionários
- 🔍 Filtro por **nome** ou **CPF**
- 🧮 Cálculo automático do:
  - Salário Base para IRRF
  - Desconto de IRRF (de acordo com alíquotas oficiais)
- ✅ Validação de campos obrigatórios

---

## 💾 Persistência com localStorage

Este projeto **salva os dados localmente** no navegador utilizando o `localStorage`, o que significa que:

- Os dados persistem mesmo após recarregar a página ou fechar o navegador 🧠
- Não há necessidade de configurar um banco de dados ou back-end

---

## 🛠️ Como Rodar o Projeto

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/GromRibeiro/Employee-React.git

cd employee

npm install
npm run dev

Acesse o projeto no navegador: http://localhost:5173
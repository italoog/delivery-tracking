# 🚚 Delivery Tracking System

Um sistema moderno de rastreamento de entregas construído com Angular 18.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

## 📋 Índice

- [Sobre](#-sobre)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Executando o Projeto](#-executando-o-projeto)
- [Executando os Testes](#-executando-os-testes)
- [Construção](#-construção)
- [Licença](#-licença)

## 🎯 Sobre

O Delivery Tracking System é uma aplicação web moderna para rastreamento de entregas em tempo real. Permite visualizar o status das entregas, filtrar por motorista e status, e oferece um dashboard com estatísticas importantes.

## 🛠 Tecnologias Utilizadas

- [Angular 18](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 📌 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [npm](https://www.npmjs.com/) (normalmente vem com Node.js)
- [Angular CLI](https://cli.angular.io/) (versão 18.x)

## 🚀 Instalação

1. Clone o repositório:
`git clone https://github.com/italoog/delivery-tracking.git`

2. Navegue até o diretório do projeto:
`cd delivery-tracking`

3. Instale as dependências:
`npm install`

## 💻 Executando o Projeto

Para iniciar o servidor de desenvolvimento:
`ng serve`

Navegue para `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

## 🧪 Executando os Testes

### Testes Unitários

Execute o seguinte comando para rodar os testes unitários via [Karma](https://karma-runner.github.io):
`ng test`

### Testes End-to-End (E2E)

Primeiro, certifique-se de que a aplicação está rodando (`ng serve`). Em seguida:

1. Para abrir o Cypress Test Runner (modo interativo):
`npm run cypress:open`

2. Para executar os testes e2e em modo headless:
`npm run cypress:run`

Os testes e2e são implementados usando [Cypress](https://www.cypress.io/).

## 📦 Construção

Execute o seguinte comando para construir o projeto:

Os artefatos de construção serão armazenados no diretório `dist/`.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

---

Desenvolvido com ❤️ por italoog
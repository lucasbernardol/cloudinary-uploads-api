<div align="center">
  <img src="./.github/assets/node.svg" width="80px" height="80px" />
  <h3>Upload público de images para o Cloudinary</h3>

  <p align="center">
    API REST desenvolvida no NodeJS visando o upload de images ☁ para o Cloudinary. Contruída com <br/>TypeScript, PostgresSQL, TypeORM, entre outros.
  </p>  
</div>

<div align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lucasbernardol/cloudinary-uploads-api">

  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/lucasbernardol/cloudinary-uploads-api">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lucasbernardol/cloudinary-uploads-api">

  <img alt="GitHub" src="https://img.shields.io/github/license/lucasbernardol/cloudinary-uploads-api">

  <img src="https://pyheroku-badge.herokuapp.com/?app=uploads-api&path=/&style=" />

  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" />
  </a>
</div>

<p align="center">
  <small>Build with ❤️ by: <a href="https://github.com/lucasbernardol">José Lucas</a></small>
</p>

## Demonstração (demo)

Olá :wave:, você pode visualizar e testar o projeto agora mesmo, basta
acessar: [:earth_americas: API - DEMO](https://uploads-api.herokuapp.com/api/v1)

> A aplicação está hospedada no Heroku, e para mais detalhes acesse:
> [Heroku](https://www.heroku.com/)

## :bulb: Implementações e funcionalidades

- Abaixo temos uma lista que contém as implementações da aplicação:

- [x] CRUD de uploads/mídias.
  - [x] Listagem de uploads.
  - [x] Buscar uma mídia pelo identificador únido ou **ID**.
  - [x] Buscar total as mídias pelo nome original do arquivo (SQL LIKE).
  - [x] Criar um recurso/mídia.
  - [x] Atualizar uma mídia/upload.
  - [x] Remove upload.
- [x] Paginação básica
- [x] Obter o endereço remoto do _client_ (IP) e não exibir nas buscas.
  - [x] Responsável pela criação e atualização de uma mídia.
- [x] Documentação
  - [x] Disponibilar uma arquivo `Insomnia.json`.
  - [x] Documentação básica usando [apidocjs](https://apidocjs.com/)
- [x] Deploy no `HEROKU`.

## :wrench: Como executar no ambiente local?

### :information_source: Requisitos mínimos ou basilares

1. NodeJS na versão **16.x** ou superior.
2. Gerenciadores de pacotes como: npm, pnpm ou yarn.

#### Configurações do ambiente

- Antes de iniciar o servidor de desenvolvimento
  é primordial configurar algumas variáves de ambiente. Crie um arquivo chamado `.env` na raiz do projeto, copie o conteúdo do `.env.example` para o `.env`, e preencha os seus valores.

> Não esqueça de criar uma conta no Cloudinary, é rápido e simples.
> Além disso, a plataforma possui integração com diversos sistemas/linguagens. Clique aqui: [Cloudinary](https://cloudinary.com/)

### Guia de instalação

1. Faça um clone do repositório através do git. Use o comando abaixo:

```bash
$ git clone https://github.com/lucasbernardol/cloudinary-uploads-api.git

## Alteração de pastas/diretórios
$ cd cloudinary-uploads-api/
```

2. Instale todas as dependências necessárias com um gerenciador de pacotes
   de sua preferência. Em casos de dúvidas, veja documentação das ferramentas mais usadas: `npm`, `pnpm` ou `yarn`

```bash
$ yarn install
```

3. Na última etapa podemos iniciar o servidor de desenvolvimento. Execute o seguinte
   comando no seu terminal: `yarn dev`. Você pode criar e modificar "scripts" no arquivo `package.json`.

```bash
$ yarn dev
```

### Iniciando os testes (API)

Existem diversas formas de realizar testes em uma API, e para
aumentar a produtividade/facilidade dos testes, podemos utilizar alguns softwares
específicos que desempenham esse papel. Veja a tabela abaixo:

| Software (API clients)                     | Download                                   |
| ------------------------------------------ | ------------------------------------------ |
| Insomnia - baseado Electron (recomendação) | [Download](https://insomnia.rest/download) |
| Postman                                    | [Download](https://www.postman.com/)       |
| Hoppscotch - online e open source          | [Online](https://hoppscotch.io/pt-br)      |

- Você pode usar o `curl`. Veja:

```bash
# A requisição será salva no "data.json"
$ curl https://uploads-api.herokuapp.com/api/uploads > data.json
```

#### :pushpin: Endpoints ou rotas

- Abaixo você encontra uma tabela com os principais endpoints da aplicação:

| Endpoints                      | Métodos HTTP | Descrição                                              |
| ------------------------------ | ------------ | ------------------------------------------------------ |
| /api/v1                        | **GET**      | Endpoint principal                                     |
| /api/v1/uploads                | **GET**      | Listagem de uploads/mídias                             |
| /api/v1/uploads/:id            | **GET**      | Buscar um upload especifíco                            |
| /api/v1/uploads/name/:filename | **GET**      | Listagem de uploads pelo nome original (usa: SQL LIKE) |
| /api/v1/uploads                | **POST**     | Criação de uploads/mídias (.png, .jpg, .svg, ...)      |
| /api/v1/uploads/:id            | **PUT**      | Atualizar uma mídia                                    |
| /api/v1/uploads/:id            | **DELETE**   | Excluir um upload/mídia                                |

Observação: veja o arquivo Insomnia.json na raiz do projeto, ele contém uma breve
documentação com todos os endpoints.

## :boy: Autor

<table class="author">
  <tr>
    <td align="center">
      <a href="https://github.com/lucasbernardol">
        <img src="https://avatars.githubusercontent.com/u/82418341?v=4" 
        width="100px;" alt="José Lucas"/>
        <br/>
        <sub>
          <b>José Lucas</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Licença

O projeto o possui a licença _MIT_, veja o arquivo [LICENÇA](LICENSE) para mais informações.

# Projeto 4º Semestre

Descrição breve do projeto e sua finalidade. 

---

## 📋 Índice

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Pré-requisitos](#pré-requisitos)
4. [Instalação](#instalação)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Como Usar](#como-usar)
7. [Contribuição](#contribuição)
8. [Licença](#licença)
9. [Contato](#contato)

---

## 📝 Sobre o Projeto

Aqui você descreve brevemente o propósito do projeto, seus objetivos e os principais problemas que ele resolve.

---

## 🛠 Tecnologias Utilizadas

- **Node.js**: Para construção da API.
- **Express**: Framework para simplificar o desenvolvimento de servidores.
- **Prisma ORM**: Para gerenciar o banco de dados.
- **MongoDB**: Como banco de dados principal.
- Outras bibliotecas ou ferramentas usadas, se aplicável.

---

## 📦 Pré-requisitos

- Node.js instalado (versão mínima recomendada: `20`).
- MongoDB configurado e acessível.
- Gerenciador de pacotes npm ou yarn.

---

## 🚀 Instalação

Siga os passos abaixo para configurar e executar o projeto.

### 1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd Projeto_4_Semestre
```

### 2. Instale as dependências:
```bash
npm install
```
### 3. Configuração do Banco de Dados:
Crie um arquivo `.env` na pasta `API/` e adicione a variável de ambiente DATABASE_URL com a string de conexão do MongoDB. Exemplo:

`env`
```bash
DATABASE_URL="mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/<nome-do-banco>?retryWrites=true&w=majority"
```
### 4. Executando a API:
Execute o servidor na pasta `API/` com o comando:

```bash
npm run dev
```
Agora a API estará rodando localmente no endereço `http://localhost:3000`.

## 📂 Estrutura do Projeto
```bash


├───API
│   ├───config
│   ├───node_modules
│   │   ├───.bin
│   │   ├───.cache
│   │   │   └───prisma
│   │   │       └───master
│   │   │           ├───4c784e32044a8a016d99474bd02a3b6123742169
│   │   │           │   └───windows
│   │   │           ├───605197351a3c8bdd595af2d2a9bc3025bca48ea2
│   │   │           │   └───windows
│   │   │           └───69d742ee20b815d88e17e54db4a2a7a3b30324e3
│   │   │               └───windows
│   │   ├───.prisma
│   │   │   └───client
│   │   │       └───deno
│   │   ├───@prisma
│   │   │   ├───client
│   │   │   │   ├───generator-build
│   │   │   │   ├───runtime
│   │   │   │   └───scripts
│   │   │   ├───debug
│   │   │   │   └───dist
│   │   │   ├───engines
│   │   │   │   ├───dist
│   │   │   │   │   └───scripts
│   │   │   │   ├───node_modules
│   │   │   │   │   └───.cache
│   │   │   │   │       └───prisma
│   │   │   │   │           └───master
│   │   │   │   │               └───605197351a3c8bdd595af2d2a9bc3025bca48ea2
│   │   │   │   │                   └───windows
│   │   │   │   └───scripts
│   │   │   ├───engines-version
│   │   │   ├───fetch-engine
│   │   │   │   └───dist
│   │   │   └───get-platform
│   │   │       └───dist
│   │   │           └───test-utils
│   │   ├───accepts
│   │   ├───append-field
│   │   │   ├───lib
│   │   │   └───test
│   │   ├───array-flatten
│   │   ├───body-parser
│   │   │   └───lib
│   │   │       └───types
│   │   ├───buffer-from
│   │   ├───busboy
│   │   │   ├───.github
│   │   │   │   └───workflows
│   │   │   ├───bench
│   │   │   ├───lib
│   │   │   │   └───types
│   │   │   └───test
│   │   ├───bytes
│   │   ├───call-bind
│   │   │   ├───.github
│   │   │   └───test
│   │   ├───concat-stream
│   │   ├───content-disposition
│   │   ├───content-type
│   │   ├───cookie
│   │   ├───cookie-signature
│   │   ├───core-util-is
│   │   │   └───lib
│   │   ├───cors
│   │   │   └───lib
│   │   ├───debug
│   │   │   └───src
│   │   ├───define-data-property
│   │   │   ├───.github
│   │   │   └───test
│   │   ├───depd
│   │   │   └───lib
│   │   │       └───browser
│   │   ├───destroy
│   │   ├───dotenv
│   │   │   └───lib
│   │   ├───ee-first
│   │   ├───encodeurl
│   │   ├───es-define-property
│   │   │   ├───.github
│   │   │   └───test
│   │   ├───es-errors
│   │   │   ├───.github
│   │   │   └───test
│   │   ├───escape-html
│   │   ├───etag
│   │   ├───express
│   │   │   └───lib
│   │   │       ├───middleware
│   │   │       └───router
│   │   ├───finalhandler
│   │   ├───forwarded
│   │   ├───fresh
│   │   ├───function-bind
│   │   │   ├───.github
│   │   │   └───test
│   │   ├───get-intrinsic
│   │   │   ├───.github
│   │   │   └───test
│   │   ├───gopd
│   │   │   ├───.github
│   │   │   └───test
│   │   ├───has-property-descriptors
│   │   │   ├───.github
│   │   │   └───test
│   │   ├───has-proto
│   │   │   ├───.github
│   │   │   └───test
│   │   ├───has-symbols
│   │   │   ├───.github
│   │   │   └───test
│   │   │       └───shams
│   │   ├───hasown
│   │   │   └───.github
│   │   ├───http-errors
│   │   ├───iconv-lite
│   │   │   ├───encodings
│   │   │   │   └───tables
│   │   │   └───lib
│   │   ├───inherits
│   │   ├───ipaddr.js
│   │   │   └───lib
│   │   ├───isarray
│   │   ├───media-typer
│   │   ├───merge-descriptors
│   │   ├───methods
│   │   ├───mime
│   │   │   └───src
│   │   ├───mime-db
│   │   ├───mime-types
│   │   ├───minimist
│   │   │   ├───.github
│   │   │   ├───example
│   │   │   └───test
│   │   ├───mkdirp
│   │   │   └───bin
│   │   ├───ms
│   │   ├───multer
│   │   │   ├───lib
│   │   │   └───storage
│   │   ├───negotiator
│   │   │   └───lib
│   │   ├───object-assign
│   │   ├───object-inspect
│   │   │   ├───.github
│   │   │   ├───example
│   │   │   └───test
│   │   │       └───browser
│   │   ├───on-finished
│   │   ├───parseurl
│   │   ├───path
│   │   ├───path-to-regexp
│   │   ├───prisma
│   │   │   ├───build
│   │   │   │   └───public
│   │   │   │       ├───assets
│   │   │   │       ├───http
│   │   │   │       └───pages
│   │   │   │           └───http
│   │   │   ├───engines
│   │   │   │   └───605197351a3c8bdd595af2d2a9bc3025bca48ea2 
│   │   │   ├───preinstall
│   │   │   ├───prisma-client
│   │   │   │   ├───generator-build
│   │   │   │   ├───runtime
│   │   │   │   └───scripts
│   │   │   └───scripts
│   │   ├───process
│   │   ├───process-nextick-args
│   │   ├───proxy-addr
│   │   ├───qs
│   │   │   ├───.github
│   │   │   ├───dist
│   │   │   ├───lib
│   │   │   └───test
│   │   ├───range-parser
│   │   ├───raw-body
│   │   ├───readable-stream
│   │   │   ├───doc
│   │   │   │   └───wg-meetings
│   │   │   ├───lib
│   │   │   │   └───internal
│   │   │   │       └───streams
│   │   │   └───node_modules
│   │   │       └───safe-buffer
│   │   ├───safe-buffer
│   │   ├───safer-buffer
│   │   ├───send
│   │   │   └───node_modules
│   │   │       └───ms
│   │   ├───serve-static
│   │   ├───set-function-length
│   │   │   └───.github
│   │   ├───setprototypeof
│   │   │   └───test
│   │   ├───side-channel
│   │   │   ├───.github
│   │   │   └───test
│   │   ├───statuses
│   │   ├───streamsearch
│   │   │   ├───.github
│   │   │   │   └───workflows
│   │   │   ├───lib
│   │   │   └───test
│   │   ├───string_decoder
│   │   │   ├───lib
│   │   │   └───node_modules
│   │   │       └───safe-buffer
│   │   ├───toidentifier
│   │   ├───type-is
│   │   ├───typedarray
│   │   │   ├───example
│   │   │   └───test
│   │   │       └───server
│   │   ├───unpipe
│   │   ├───util
│   │   │   ├───node_modules
│   │   │   │   └───inherits
│   │   │   └───support
│   │   ├───util-deprecate
│   │   ├───utils-merge
│   │   ├───vary
│   │   └───xtend
│   ├───prisma
│   ├───src
│   │   └───http
│   │       └───routes
│   └───uploads
└───Frontend
    ├───css
    ├───html
    │   └───css
    └───js
```
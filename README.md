# WebSocket CAD Cliente

Aplicação com finalidade de receber atualizações do Sinesp CAD em tempo real

## Pré-Requisitos

### 1. Certificado

Você poderá gerar localmente um certificado do tipo x.509 utilizando o pacote OpenSSL.
Este certificado deve ser cadastrado no Sinesp Segurança e será utilizado para a conexão com o WebSocket.

#### 1.1 Gerando um certificado com OpenSSL

```shell
openssl genrsa -out key.pem 4096
openssl req -new -key key.pem -out cliente.pem
```
O comando acima irá gerar um arquivo `cliente.pem` a ser cadastrado no Sinesp Segurança e copiado para a pasta `certicados` do projeto. 
Após cadastrado, receberá uma url de acesso ao websocket, a ser inserida no arquivo `config.json` do projeto.

### 2. Node.js

Esta aplicação foi escrita utilizando a linguagem de programação Javascript, portanto, para executá-la no servidor, será necessário que instale o interpretador Node.js disponível em https://nodejs.org/en/

### 3. MongoDB

As ocorrências recebidas pela aplicação são salvas em um banco de dados não relacional MongoDB disponível em https://www.mongodb.com/download-center

### 3. Execução


Instale as dependências:

```yarn install```


Execute a aplicação:

```node index.js```










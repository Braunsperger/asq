# AsQ

Desafio proposto pela empresa AsQ. Este consiste em criar um controle de procedimentos e suas verificações.

# Dependências

- xampp: v3.2.4 com PHP 7.4.13 e mysql 5.5 ou superior.
- nodejs: v14.15.1 ou superior.

# Processo de compilação e publicação

- Executar o xampp, ligando os serviços apache e mysql.
- Executar o script do mysql contido dentro da pasta 'database' na raiz do projeto. O arquivo se chama asq.sql.
- Copiar a pasta do projeto para a pasta htdocs do xampp.
- Entra na pasta do xampp apache -> conf -> extra -> httpd-vhosts e adicione o código abaixo no final do documento.
``` xml
<VirtualHost *:80>
    ##ServerAdmin webmaster@dummy-host2.example.com
    ##DocumentRoot "C:\xampp\htdocs\asq\backend\api"
    ##ServerName dummy-host2.example.com
    ##ErrorLog "logs/dummy-host2.example.com-error.log"
    ##CustomLog "logs/dummy-host2.example.com-access.log" common
</VirtualHost>
```
- Abrir prompt de comando na pasta /htdocs/asq/frontend e executar o seguinte comando:
```
npm install
```
- Para executar o projeto, executar o seguinte comando:
```
npm start
```

FROM node:20-alpine

# Defina a variável de ambiente para o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o diretório de trabalho
COPY . .

# Exponha a porta 3000
EXPOSE 3000

# Defina o comando de inicialização
CMD ["node", "app.ts"]
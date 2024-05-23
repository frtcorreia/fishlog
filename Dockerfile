# Usa uma imagem base oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração para o diretório de trabalho
COPY package.json package-lock.json tsconfig.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Gera os arquivos do Prisma
RUN npx prisma generate

# Compila o projeto TypeScript
RUN npx tsc

# Expos o porto que a aplicação usará
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/index.js"]
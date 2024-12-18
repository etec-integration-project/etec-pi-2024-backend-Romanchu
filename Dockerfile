# Usar una imagen oficial de Node.js
FROM node:20-alpine

# Instalar dependencias necesarias
RUN apk update && apk add bash

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración para npm
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el script wait-for-it.sh
COPY wait-for-it.sh /wait-for-it.sh

# Hacer que el script sea ejecutable
RUN chmod +x /wait-for-it.sh

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 5000

# Comando de inicio del contenedor
CMD ["sh", "/wait-for-it.sh", "mysql:3306", "--", "npm", "start"]

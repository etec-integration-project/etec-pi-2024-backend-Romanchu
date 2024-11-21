# Usar una imagen oficial ligera de Node.js
FROM node:20-alpine

# Actualizar paquetes del sistema
RUN apk update && apk add bash

# Crear directorios necesarios y otorgar permisos
RUN mkdir -p /app/node_modules && chmod -R 777 /usr/local

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Otorgar permisos al directorio de la aplicación
RUN chmod -R 777 /app

# Establecer el usuario de Node.js
USER node

# Instalar dependencias globales y del proyecto
RUN npm install -g npm
RUN npm install

# Copiar todo el código del backend
COPY . .

# Exponer el puerto del backend
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

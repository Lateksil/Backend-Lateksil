FROM node:latest

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json untuk instalasi dependensi
COPY package*.json ./

# Install dependensi
RUN npm install

# Copy seluruh aplikasi ke dalam container
COPY . .

# Expose port 3030
EXPOSE 8080

# Command untuk menjalankan aplikasi
CMD [ "npm", "start" ]

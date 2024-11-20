# Используем официальный Node.js образ в качестве базового
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем остальные файлы проекта
COPY . .

# Создаем сборку проекта
RUN npm run dev

# Открываем порт для приложения
EXPOSE 3000


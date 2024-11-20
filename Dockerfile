# Используем официальный Node.js образ в качестве базового
FROM node:18 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем все файлы проекта
COPY . .

# Строим приложение
RUN npm run build

# Переходим к финальной стадии
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только собранное приложение и зависимости
COPY --from=builder /app /app

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Указываем команду для запуска приложения
CMD ["npm", "start"]

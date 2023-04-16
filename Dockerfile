# Используем образ с Node.js
FROM node:16

# Создаем рабочую директорию
WORKDIR /usr/src/app

# Копируем файлы package.json и package-lock.json
COPY server/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код проекта
COPY . .

# Запускаем приложение
CMD ["node", "server/index.js"]
# ⚡ Быстрый старт EFL League Next.js

## 🚀 Запуск за 3 минуты

### 1. Установка зависимостей
```bash
cd efl-next
npm install
```

### 2. Настройка окружения
Скопируйте `.env.example` в `.env.local`:
```bash
copy .env.example .env.local
```

Откройте `.env.local` и заполните:
```env
# Скопируйте из старого проекта или MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/efl_league

# Генерируйте: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
NEXTAUTH_SECRET=ваш-секретный-ключ-32-символа

# Локально
NEXTAUTH_URL=http://localhost:3000

# ImgBB API для загрузки изображений
IMGBB_API_KEY=ваш-ключ-imgbb
```

### 3. Запуск dev сервера
```bash
npm run dev
```

Откройте браузер: **http://localhost:3000** 🎉

---

## ✅ Что должно работать сразу

- ✅ Главная страница с командами и новостями
- ✅ Все страницы навигации
- ✅ Загрузка данных из MongoDB
- ✅ Регистрация/вход (если MongoDB настроен)

---

## 🔧 Частые проблемы

### Ошибка: "Cannot connect to MongoDB"
**Решение:** Проверьте `MONGODB_URI` в `.env.local`

### Ошибка: "Module not found"
**Решение:**
```bash
rm -rf node_modules .next
npm install
```

### Ошибка: "Port 3000 already in use"
**Решение:** Измените порт:
```bash
PORT=3001 npm run dev
```

---

## 📦 Production Build

```bash
npm run build
npm start
```

---

## 🚢 Deploy на Vercel (1 минута)

```bash
npm i -g vercel
vercel login
vercel
```

Следуйте инструкциям в терминале. Готово!

---

## 📚 Дальше

- [README.md](./README.md) - Полная документация
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Руководство по миграции
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Развертывание

---

## 🆘 Нужна помощь?

1. Проверьте консоль браузера (F12)
2. Проверьте терминал с `npm run dev`
3. Убедитесь, что Node.js >= 18.17
4. Убедитесь, что MongoDB доступна

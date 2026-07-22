# 🚀 Обновление Vercel на Next.js

## Шаг 1: Настройка проекта в Vercel

1. Открой https://vercel.com/dashboard
2. Выбери свой проект EFL League
3. Перейди в **Settings** (Настройки)

## Шаг 2: Изменить Root Directory

1. В меню слева выбери **General**
2. Найди секцию **Root Directory**
3. Нажми **Edit**
4. Введи: `efl-next`
5. Нажми **Save**

## Шаг 3: Добавить переменные окружения

1. В меню слева выбери **Environment Variables**
2. Добавь следующие переменные:

### MONGODB_URI
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/efl_league?retryWrites=true&w=majority
```
**Где взять:** Эта переменная уже должна быть в твоём Vercel проекте. Если нет - скопируй из MongoDB Atlas → Connect → Drivers

### NEXTAUTH_SECRET
Сгенерируй новый секретный ключ:
```bash
openssl rand -base64 32
```
Или используй онлайн: https://generate-secret.vercel.app/32

### NEXTAUTH_URL
```
https://твой-домен.vercel.app
```
**Важно:** Замени на реальный домен твоего сайта

### IMGBB_API_KEY (опционально)
Если используешь ImgBB для загрузки изображений, добавь API ключ отсюда: https://api.imgbb.com/

## Шаг 4: Редеплой

1. Перейди во вкладку **Deployments**
2. Найди последний деплой (commit: `chore: add push scripts and vercel config`)
3. Нажми три точки **...** → **Redeploy**
4. Выбери **Use existing Build Cache** (убери галочку)
5. Нажми **Redeploy**

## Шаг 5: Проверка

Через 2-3 минуты сайт обновится. Проверь:
- ✅ Главная страница загружается
- ✅ Команды отображаются (mongodb данные)
- ✅ Авторизация работает
- ✅ Админ панель доступна

## 🆘 Если что-то не работает

### Ошибка: "MONGODB_URI is not defined"
→ Добавь переменную `MONGODB_URI` в Vercel Environment Variables

### Ошибка: "NextAuth configuration error"
→ Добавь `NEXTAUTH_SECRET` и `NEXTAUTH_URL` в Environment Variables

### Сайт не обновился
→ Сделай Force Redeploy без кеша

### База данных пустая
→ Проверь что `MONGODB_URI` указывает на правильную базу данных `efl_league`

## 📋 Что изменилось

- ✅ Next.js 14 App Router (вместо vanilla JS)
- ✅ TypeScript (типизация)
- ✅ Tailwind CSS (современный дизайн)
- ✅ NextAuth.js (безопасная авторизация)
- ✅ TanStack Query (кеширование данных)
- ✅ Zustand (state management)
- ✅ MongoDB остался прежним (данные не изменились)

## 🔗 Полезные ссылки

- GitHub репозиторий: https://github.com/knjazx/eflsite
- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs

---

**Готово!** Сайт обновлён на Next.js 🎉

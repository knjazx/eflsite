# 🚀 Как залить проект на GitHub

## ✅ Что уже сделано:

1. ✅ Git инициализирован
2. ✅ Все файлы добавлены (git add .)
3. ✅ Коммит создан
4. ✅ Remote добавлен (origin → https://github.com/knjazx/eflsite.git)
5. ✅ Ветка main создана
6. ✅ Изображения скопированы в public/

## 📝 Осталось только запушить!

### Вариант 1: Через bat файл (самый простой)

Просто **дважды кликните** на файл:
```
push.bat
```

Он находится в папке `efl-next`

---

### Вариант 2: Через PowerShell

Откройте PowerShell и выполните:

```powershell
cd "C:\Users\knjazx\Desktop\сайт для cs2\efl-next"
git push origin main --force
```

---

### Вариант 3: Через CMD

Откройте CMD и выполните:

```cmd
cd "C:\Users\knjazx\Desktop\сайт для cs2\efl-next"
git push origin main --force
```

---

## 🎉 После push

1. Откройте GitHub: https://github.com/knjazx/eflsite
2. Вы увидите папку `efl-next` со всем Next.js проектом
3. Можете сразу деплоить на Vercel!

---

## 🚢 Deploy на Vercel

1. Зайдите на https://vercel.com
2. New Project
3. Import Git Repository → выберите eflsite
4. Root Directory → выберите `efl-next`
5. Framework Preset → Next.js (автоопределится)
6. Environment Variables → добавьте:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
7. Deploy!

---

## ⚠️ Важно

После деплоя обновите `NEXTAUTH_URL` на ваш реальный домен:
```
NEXTAUTH_URL=https://your-site.vercel.app
```

И переделоплойте.

---

## 📚 Документация

- README.md - Общая информация
- QUICKSTART.md - Быстрый старт
- MIGRATION_GUIDE.md - Руководство по миграции
- DEPLOYMENT.md - Развертывание

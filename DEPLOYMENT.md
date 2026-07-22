# 🚀 Руководство по развертыванию

## Vercel (рекомендуется)

### Преимущества
- ✅ Автоматические деплои из Git
- ✅ Встроенный Image Optimization
- ✅ Edge Functions
- ✅ Бесплатный SSL
- ✅ Глобальный CDN
- ✅ Автоматические превью для PR

### Шаги развертывания

1. **Создайте аккаунт на [Vercel](https://vercel.com)**

2. **Импортируйте проект**
```bash
npm i -g vercel
vercel login
vercel
```

3. **Настройте Environment Variables**

В Vercel Dashboard → Project Settings → Environment Variables добавьте:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/efl_league
NEXTAUTH_SECRET=your-secret-key-32-chars
NEXTAUTH_URL=https://your-domain.com
IMGBB_API_KEY=your-imgbb-key
```

4. **Deploy**
```bash
vercel --prod
```

### Автоматические деплои

Подключите GitHub/GitLab репозиторий:
1. Vercel Dashboard → Import Project
2. Выберите репозиторий
3. Каждый push в main = автоматический deploy

---

## Railway

### Преимущества
- ✅ Простота настройки
- ✅ Встроенная БД (можно не использовать внешний MongoDB)
- ✅ Автоматические SSL сертификаты

### Шаги

1. **Создайте проект на [Railway](https://railway.app)**

2. **Добавьте переменные окружения**

3. **Deploy**
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

---

## Netlify

### Преимущества
- ✅ Бесплатный план
- ✅ Serverless Functions
- ✅ Автоматические деплои

### Шаги

1. **Создайте `netlify.toml`**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. **Deploy**
```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

---

## Docker (Self-hosted)

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
```

### Запуск
```bash
docker-compose up -d
```

---

## VPS (Ubuntu/Debian)

### Требования
- Node.js 18+
- PM2 (process manager)
- Nginx (reverse proxy)
- MongoDB (или Atlas)

### 1. Установка зависимостей
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2
sudo npm install -g pm2

# Nginx
sudo apt install nginx
```

### 2. Клонирование и сборка
```bash
cd /var/www
git clone <your-repo> efl-league
cd efl-league
npm install
npm run build
```

### 3. Создание .env
```bash
nano .env.local
# Добавьте переменные
```

### 4. PM2 конфигурация
```bash
pm2 start npm --name "efl-league" -- start
pm2 save
pm2 startup
```

### 5. Nginx конфигурация
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/efl-league /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. SSL (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Проверка после деплоя

### Чеклист
- [ ] Сайт открывается
- [ ] Данные загружаются из MongoDB
- [ ] Авторизация работает
- [ ] Все страницы доступны
- [ ] Изображения загружаются
- [ ] Редиректы работают (старые URL → новые)
- [ ] Мобильная версия корректна
- [ ] SSL сертификат активен

### Тестирование производительности
```bash
# Lighthouse
npx lighthouse https://your-domain.com --view

# WebPageTest
# https://www.webpagetest.org/
```

---

## Мониторинг

### Vercel Analytics (встроено)
Автоматически собирает метрики производительности

### Sentry (для ошибок)
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### Логирование
```typescript
// lib/logger.ts
export const log = {
  info: (msg: string) => console.log(`[INFO] ${msg}`),
  error: (msg: string, err?: Error) => console.error(`[ERROR] ${msg}`, err),
  warn: (msg: string) => console.warn(`[WARN] ${msg}`),
};
```

---

## Обновление

### Vercel
```bash
git push origin main
# Автоматический deploy
```

### VPS
```bash
cd /var/www/efl-league
git pull origin main
npm install
npm run build
pm2 restart efl-league
```

---

## Откат (Rollback)

### Vercel
В Dashboard → Deployments → выберите предыдущий → Promote to Production

### VPS
```bash
cd /var/www/efl-league
git checkout <previous-commit>
npm install
npm run build
pm2 restart efl-league
```

---

## Резервное копирование

### MongoDB
```bash
mongodump --uri="$MONGODB_URI" --out=/backups/$(date +%Y%m%d)
```

### Автоматизация (cron)
```bash
crontab -e
# Каждый день в 3:00
0 3 * * * mongodump --uri="$MONGODB_URI" --out=/backups/$(date +\%Y\%m\%d)
```

---

## Оптимизация

### 1. Image Optimization
Next.js автоматически оптимизирует изображения. Убедитесь, что используете компонент `Image`:
```tsx
import Image from 'next/image';
<Image src="..." width={} height={} />
```

### 2. Кэширование
```typescript
// app/page.tsx
export const revalidate = 60; // ISR: обновление каждые 60 сек
```

### 3. Bundle Analysis
```bash
npm install @next/bundle-analyzer
```

```javascript
// next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

```bash
ANALYZE=true npm run build
```

---

## 🆘 Troubleshooting

### "Module not found"
```bash
rm -rf node_modules .next
npm install
npm run build
```

### "Cannot connect to MongoDB"
Проверьте IP whitelist в MongoDB Atlas

### "NextAuth configuration error"
Убедитесь, что `NEXTAUTH_SECRET` и `NEXTAUTH_URL` установлены

### "Build fails"
Проверьте логи: `npm run build --verbose`

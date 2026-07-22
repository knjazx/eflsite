# EFL League — Next.js

Профессиональная платформа турниров по Counter-Strike 2.

## 🚀 Технологии

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand, TanStack Query (React Query)
- **Auth:** NextAuth.js (JWT)
- **Database:** MongoDB
- **Deployment:** Vercel

## 📦 Установка

1. **Клонировать репозиторий**
```bash
git clone <repo-url>
cd efl-next
```

2. **Установить зависимости**
```bash
npm install
```

3. **Настроить переменные окружения**

Скопируйте `.env.example` в `.env.local`:
```bash
cp .env.example .env.local
```

Заполните переменные:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/efl_league
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
IMGBB_API_KEY=your-imgbb-api-key
```

4. **Запустить dev сервер**
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## 🗄️ Структура проекта

```
efl-next/
├── app/                    # App Router
│   ├── (pages)/
│   │   ├── teams/         # Страницы команд
│   │   ├── players/       # Страницы игроков
│   │   ├── tournaments/   # Турниры
│   │   ├── news/          # Новости
│   │   └── ...
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth
│   │   └── data/          # CRUD для MongoDB
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Главная страница
├── components/            # React компоненты
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                   # Утилиты
│   ├── db.ts              # MongoDB клиент
│   ├── api-client.ts      # API клиент
│   ├── hooks/             # Custom hooks
│   └── store.ts           # Zustand store
├── types/                 # TypeScript типы
└── public/                # Статические файлы
```

## 🔑 Ключевые фичи

- ✅ SSR/ISR для SEO
- ✅ JWT авторизация
- ✅ Real-time обновления через React Query
- ✅ Адаптивный дизайн
- ✅ Темная/светлая тема
- ✅ Админ-панель
- ✅ Управление командами (IGL)
- ✅ Групповой этап с автосортировкой
- ✅ Статистика игроков

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signin` — Вход
- `POST /api/auth/signout` — Выход

### Data (CRUD)
- `GET /api/data?collection=teams` — Получить коллекцию
- `POST /api/data` — Создать документ
- `PUT /api/data` — Обновить документ
- `DELETE /api/data?collection=teams&id=123` — Удалить документ

## 🚢 Deployment

### Vercel (рекомендуется)

1. Импортируйте проект в Vercel
2. Добавьте environment variables
3. Deploy!

### Другие платформы

```bash
npm run build
npm start
```

## 📚 Миграция данных

Данные хранятся в MongoDB в коллекциях:
- `pl_users` — Пользователи
- `pl_teams` — Команды
- `pl_players` — Игроки
- `pl_tournaments` — Турниры
- `pl_matches` — Матчи
- `pl_news` — Новости
- `pl_groups` — Группы
- `pl_vetos` — Веты карт
- `pl_awards` — Награды

Старые данные из Vanilla JS версии автоматически синхронизируются.

## 🤝 Contributing

Pull requests приветствуются!

## 📄 License

MIT

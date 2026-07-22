import Link from 'next/link';
import Image from 'next/image';
import { getCollection, COLLECTION_MAP } from '@/lib/db';
import type { Team, News } from '@/types';

export const revalidate = 60; // ISR: ревалидация каждые 60 секунд

async function getHomeData() {
  const teamsCol = await getCollection<Team>(COLLECTION_MAP.teams);
  const newsCol = await getCollection<News>(COLLECTION_MAP.news);

  const teams = await teamsCol
    .find({})
    .sort({ rating: -1 })
    .limit(6)
    .toArray();

  const news = await newsCol
    .find({})
    .sort({ date: -1 })
    .limit(3)
    .toArray();

  return {
    teams: teams.map((t) => ({ ...t, id: t._id.toString(), _id: undefined })),
    news: news.map((n) => ({ ...n, id: n._id.toString(), _id: undefined })),
  };
}

export default async function HomePage() {
  const { teams, news } = await getHomeData();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              ELECTRONIC
              <br />
              <span className="text-primary">FUTURE LEAGUE</span>
            </h1>
            <p className="text-xl text-[var(--text-muted)] mb-8">
              Профессиональные турниры по Counter-Strike 2
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/tournaments" className="btn btn-primary text-base px-8 py-4">
                Турниры
              </Link>
              <Link href="/teams" className="btn btn-outline text-base px-8 py-4">
                Команды
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-[var(--border)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-2">
                {teams.length}+
              </div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-wider">
                Команд
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-2">50K+</div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-wider">
                Призовой фонд
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-2">15+</div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-wider">
                Турниров
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-2">100+</div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-wider">
                Игроков
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Teams */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black">Топ команды</h2>
            <Link
              href="/teams"
              className="text-primary hover:text-primary-dark transition-colors text-sm font-bold"
            >
              Все команды →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <Link
                key={team.id}
                href={`/teams/${team.id}`}
                className="card hover:border-primary transition-all group"
              >
                <div className="flex items-center gap-4">
                  {team.logo ? (
                    <Image
                      src={team.logo}
                      alt={team.name}
                      width={64}
                      height={64}
                      className="rounded-xl"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-2xl font-black">
                      {team.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {team.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold ${
                          team.tier === 1
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : team.tier === 2
                            ? 'bg-gray-500/20 text-gray-400'
                            : 'bg-orange-700/20 text-orange-700'
                        }`}
                      >
                        T{team.tier}
                      </span>
                      <span className="text-sm text-[var(--text-muted)]">
                        {team.rating} рейтинг
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      {news.length > 0 && (
        <section className="py-20 bg-[var(--bg-secondary)]">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black">Последние новости</h2>
              <Link
                href="/news"
                className="text-primary hover:text-primary-dark transition-colors text-sm font-bold"
              >
                Все новости →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="card hover:border-primary transition-all group overflow-hidden p-0"
                >
                  {article.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] line-clamp-3 mb-4">
                      {article.preview}
                    </p>
                    <div className="text-xs text-[var(--text-dim)]">
                      {new Date(article.date).toLocaleDateString('ru-RU')} •{' '}
                      {article.author}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

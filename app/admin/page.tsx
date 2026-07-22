'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useData } from '@/lib/hooks/use-data';
import type { User, Team, Player, Tournament, News } from '@/types';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'teams' | 'tournaments' | 'news'>('overview');

  const { data: users = [] } = useData<User>('users');
  const { data: teams = [] } = useData<Team>('teams');
  const { data: players = [] } = useData<Player>('players');
  const { data: tournaments = [] } = useData<Tournament>('tournaments');
  const { data: news = [] } = useData<News>('news');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (session?.user?.role !== 'admin') {
    return null;
  }

  const tabs = [
    { id: 'overview', label: '📊 Обзор', icon: '📊' },
    { id: 'users', label: '👥 Пользователи', icon: '👥' },
    { id: 'teams', label: '🛡️ Команды', icon: '🛡️' },
    { id: 'tournaments', label: '🏆 Турниры', icon: '🏆' },
    { id: 'news', label: '📰 Новости', icon: '📰' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2">⚙️ Админ-панель</h1>
          <p className="text-[var(--text-muted)]">
            Управление контентом EFL League
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-black'
                  : 'bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-3xl font-black text-primary mb-1">
                {users.length}
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Пользователей
              </div>
            </div>
            <div className="card">
              <div className="text-3xl mb-2">🛡️</div>
              <div className="text-3xl font-black text-primary mb-1">
                {teams.length}
              </div>
              <div className="text-sm text-[var(--text-muted)]">Команд</div>
            </div>
            <div className="card">
              <div className="text-3xl mb-2">🎮</div>
              <div className="text-3xl font-black text-primary mb-1">
                {players.length}
              </div>
              <div className="text-sm text-[var(--text-muted)]">Игроков</div>
            </div>
            <div className="card">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-3xl font-black text-primary mb-1">
                {tournaments.length}
              </div>
              <div className="text-sm text-[var(--text-muted)]">Турниров</div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="card overflow-hidden p-0 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--bg-secondary)]">
                <tr className="text-xs font-bold text-[var(--text-muted)] uppercase">
                  <th className="px-6 py-3 text-left">Логин</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Роль</th>
                  <th className="px-6 py-3 text-left">Команда</th>
                  <th className="px-6 py-3 text-left">Дата регистрации</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]"
                  >
                    <td className="px-6 py-4 font-bold">{user.username}</td>
                    <td className="px-6 py-4 text-sm text-[var(--text-muted)]">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          user.role === 'admin'
                            ? 'bg-red-500/20 text-red-400'
                            : user.role === 'igl'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {user.team || <span className="text-[var(--text-dim)]">—</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--text-muted)]">
                      {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="card overflow-hidden p-0 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--bg-secondary)]">
                <tr className="text-xs font-bold text-[var(--text-muted)] uppercase">
                  <th className="px-6 py-3 text-left">Команда</th>
                  <th className="px-6 py-3 text-left">Тир</th>
                  <th className="px-6 py-3 text-left">Рейтинг</th>
                  <th className="px-6 py-3 text-left">Владелец</th>
                  <th className="px-6 py-3 text-left">Создана</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => {
                  const owner = users.find((u) => u.id === team.ownerId);
                  return (
                    <tr
                      key={team.id}
                      className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]"
                    >
                      <td className="px-6 py-4 font-bold">{team.name}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            team.tier === 1
                              ? 'bg-yellow-500/20 text-yellow-500'
                              : team.tier === 2
                              ? 'bg-gray-500/20 text-gray-400'
                              : 'bg-orange-700/20 text-orange-700'
                          }`}
                        >
                          T{team.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-primary">
                        {team.rating}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {owner?.username || <span className="text-[var(--text-dim)]">—</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--text-muted)]">
                        {new Date(team.createdAt).toLocaleDateString('ru-RU')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'tournaments' && (
          <div className="space-y-4">
            {tournaments.map((tournament) => (
              <div key={tournament.id} className="card">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{tournament.name}</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-3">
                      {tournament.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          tournament.status === 'ongoing'
                            ? 'bg-red-500/20 text-red-400'
                            : tournament.status === 'upcoming'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {tournament.status}
                      </span>
                      <span className="text-[var(--text-muted)]">
                        📅 {new Date(tournament.startDate).toLocaleDateString('ru-RU')}
                      </span>
                      {tournament.prizePool && (
                        <span className="text-primary font-bold">
                          💰 {tournament.prizePool}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-4">
            {news.map((article) => (
              <div key={article.id} className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">
                      {article.preview}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[var(--text-dim)]">
                      <span>📅 {new Date(article.date).toLocaleDateString('ru-RU')}</span>
                      <span>✍️ {article.author}</span>
                      {article.views !== undefined && (
                        <span>👁 {article.views} просмотров</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

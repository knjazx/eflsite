'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useData, useCreateData } from '@/lib/hooks/use-data';
import type { Team, User } from '@/types';

export default function TeamsPage() {
  const { data: session } = useSession();
  const { data: teams = [], isLoading } = useData<Team>('teams');
  const { data: users = [] } = useData<User>('users');
  const [tierFilter, setTierFilter] = useState<'all' | 1 | 2 | 3>('all');
  const [search, setSearch] = useState('');

  const currentUser = users.find((u) => u.id === session?.user?.id);
  const myTeam = teams.find((t) => t.ownerId === session?.user?.id);

  // Проверка КД
  const getCooldownInfo = () => {
    if (!currentUser?.teamDeletedAt) return null;
    const CD_MS = 7 * 24 * 60 * 60 * 1000;
    const elapsed = Date.now() - new Date(currentUser.teamDeletedAt).getTime();
    if (elapsed >= CD_MS) return null;
    const remaining = CD_MS - elapsed;
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    return { days, hours };
  };

  const cdInfo = getCooldownInfo();

  // Фильтрация
  const filtered = teams
    .filter((t) => tierFilter === 'all' || t.tier === tierFilter)
    .filter((t) => !search || t.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2">🛡️ Команды</h1>
          <p className="text-[var(--text-muted)]">
            Все зарегистрированные команды по тир-уровням
          </p>
        </div>

        {/* IGL Controls */}
        {session?.user?.role === 'igl' && !myTeam && (
          <div className="mb-6">
            {cdInfo ? (
              <div className="card bg-yellow-500/10 border-yellow-500/20">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <div className="font-bold">Создание команды на перезарядке</div>
                    <div className="text-sm text-[var(--text-muted)]">
                      {cdInfo.days}д {cdInfo.hours}ч до следующей попытки
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/teams/create" className="btn btn-primary">
                <span>➕</span> Создать команду
              </Link>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'Все' },
              { value: 1, label: 'Tier 1' },
              { value: 2, label: 'Tier 2' },
              { value: 3, label: 'Tier 3' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setTierFilter(item.value as any)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  tierFilter === item.value
                    ? 'bg-primary text-black'
                    : 'bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Поиск команды..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input flex-1"
          />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filtered.length === 0 && (
          <div className="card text-center py-20">
            <div className="text-5xl mb-4">🛡️</div>
            <p className="text-[var(--text-muted)]">Команды не найдены</p>
          </div>
        )}

        {/* Teams Table */}
        {!isLoading && filtered.length > 0 && (
          <div className="card overflow-hidden p-0">
            {/* Header */}
            <div className="grid grid-cols-[50px_1fr_100px_100px] gap-4 px-6 py-3 bg-[var(--bg-secondary)] text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              <div>#</div>
              <div>Команда</div>
              <div>Тир</div>
              <div>Рейтинг</div>
            </div>

            {/* Rows */}
            {filtered.map((team, idx) => {
              const isOwn = team.ownerId === session?.user?.id;
              return (
                <Link
                  key={team.id}
                  href={`/teams/${team.id}`}
                  className={`grid grid-cols-[50px_1fr_100px_100px] gap-4 px-6 py-4 border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors ${
                    isOwn ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="text-[var(--text-muted)]">{idx + 1}</div>
                  <div className="flex items-center gap-3">
                    {team.logo ? (
                      <Image
                        src={team.logo}
                        alt={team.name}
                        width={40}
                        height={40}
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center text-sm font-bold">
                        {team.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-bold flex items-center gap-2">
                        {team.name}
                        {isOwn && <span className="text-xs">👑</span>}
                      </div>
                    </div>
                  </div>
                  <div>
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
                  </div>
                  <div className="font-bold text-primary">{team.rating || 0}</div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

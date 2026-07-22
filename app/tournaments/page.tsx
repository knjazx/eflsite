'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/hooks/use-data';
import type { Tournament } from '@/types';

export default function TournamentsPage() {
  const { data: tournaments = [], isLoading } = useData<Tournament>('tournaments');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');

  const filtered = tournaments.filter((t) => filter === 'all' || t.status === filter);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2">🏆 Турниры</h1>
          <p className="text-[var(--text-muted)]">
            Все турниры EFL League по Counter-Strike 2
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {[
            { value: 'all', label: 'Все' },
            { value: 'upcoming', label: 'Предстоящие' },
            { value: 'ongoing', label: 'Идут сейчас' },
            { value: 'completed', label: 'Завершённые' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value as any)}
              className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                filter === item.value
                  ? 'bg-primary text-black'
                  : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
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
            <div className="text-5xl mb-4">🏆</div>
            <p className="text-[var(--text-muted)]">Турниры не найдены</p>
          </div>
        )}

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tournament) => (
            <Link
              key={tournament.id}
              href={`/tournaments/${tournament.id}`}
              className="card hover:border-primary transition-all group"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    tournament.status === 'ongoing'
                      ? 'bg-red-500/20 text-red-400'
                      : tournament.status === 'upcoming'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {tournament.status === 'ongoing'
                    ? '🔴 Идёт сейчас'
                    : tournament.status === 'upcoming'
                    ? '📅 Скоро'
                    : '✓ Завершён'}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    tournament.tier === 1
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : tournament.tier === 2
                      ? 'bg-gray-500/20 text-gray-400'
                      : 'bg-orange-700/20 text-orange-700'
                  }`}
                >
                  T{tournament.tier}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {tournament.name}
              </h3>

              {/* Description */}
              {tournament.description && (
                <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                  {tournament.description}
                </p>
              )}

              {/* Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-dim)]">📅</span>
                  <span className="text-[var(--text-muted)]">
                    {new Date(tournament.startDate).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                {tournament.prizePool && (
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--text-dim)]">💰</span>
                    <span className="text-primary font-bold">{tournament.prizePool}</span>
                  </div>
                )}
                {tournament.participantsCount !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--text-dim)]">👥</span>
                    <span className="text-[var(--text-muted)]">
                      {tournament.participantsCount} команд
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

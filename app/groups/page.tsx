'use client';

import { useData } from '@/lib/hooks/use-data';
import type { Group } from '@/types';

export default function GroupsPage() {
  const { data: groups = [], isLoading } = useData<Group>('groups');

  // Сортировка команд в группе по победам (desc), потом по поражениям (asc)
  const sortedGroups = groups.map((group) => ({
    ...group,
    teams: [...group.teams].sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return a.losses - b.losses;
    }),
  }));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2">📊 Групповой этап</h1>
          <p className="text-[var(--text-muted)]">
            Таблицы групп с результатами матчей
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && sortedGroups.length === 0 && (
          <div className="card text-center py-20">
            <div className="text-5xl mb-4">📊</div>
            <p className="text-[var(--text-muted)]">
              Групповой этап ещё не начался
            </p>
          </div>
        )}

        {/* Groups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedGroups.map((group) => (
            <div key={group.id} className="card">
              {/* Group Header */}
              <h2 className="text-2xl font-black mb-6">{group.name}</h2>

              {/* Table */}
              <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                <table className="w-full">
                  <thead className="bg-[var(--bg-secondary)]">
                    <tr className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      <th className="px-4 py-3 text-left">#</th>
                      <th className="px-4 py-3 text-left">Команда</th>
                      <th className="px-4 py-3 text-center">П</th>
                      <th className="px-4 py-3 text-center">Пр</th>
                      <th className="px-4 py-3 text-center">Очки</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.teams.map((team, idx) => (
                      <tr
                        key={team.name}
                        className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-secondary)] transition-colors"
                      >
                        <td className="px-4 py-3 text-[var(--text-muted)]">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3 font-bold">{team.name}</td>
                        <td className="px-4 py-3 text-center text-green-400 font-bold">
                          {team.wins}
                        </td>
                        <td className="px-4 py-3 text-center text-red-400 font-bold">
                          {team.losses}
                        </td>
                        <td className="px-4 py-3 text-center text-primary font-black">
                          {team.points || team.wins * 3}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

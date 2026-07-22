'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/lib/hooks/use-data';
import type { Player, Team } from '@/types';

export default function PlayersPage() {
  const { data: players = [], isLoading } = useData<Player>('players');
  const { data: teams = [] } = useData<Team>('teams');
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [tierFilter, setTierFilter] = useState('');

  // Фильтрация
  const filtered = players
    .filter((p) => !search || p.nick.toLowerCase().includes(search.toLowerCase()) || p.team?.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => !teamFilter || p.team === teamFilter)
    .filter((p) => !roleFilter || p.role === roleFilter)
    .filter((p) => {
      if (!tierFilter) return true;
      const team = teams.find((t) => t.name === p.team);
      return team && String(team.tier) === tierFilter;
    })
    .sort((a, b) => (b.stats?.kd || 0) - (a.stats?.kd || 0));

  const uniqueTeams = Array.from(new Set(players.map((p) => p.team).filter(Boolean)));
  const uniqueRoles = Array.from(new Set(players.map((p) => p.role).filter(Boolean)));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2">🎮 Игроки</h1>
          <p className="text-[var(--text-muted)]">
            Составы команд, роли и статистика игроков
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <input
            type="text"
            placeholder="Поиск игрока..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
          />
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="input"
          >
            <option value="">Все команды</option>
            {uniqueTeams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="input"
          >
            <option value="">Все роли</option>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="input"
          >
            <option value="">Все тиры</option>
            <option value="1">Tier 1</option>
            <option value="2">Tier 2</option>
            <option value="3">Tier 3</option>
          </select>
          <button
            onClick={() => {
              setSearch('');
              setTeamFilter('');
              setRoleFilter('');
              setTierFilter('');
            }}
            className="btn btn-outline"
          >
            Сбросить
          </button>
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
            <div className="text-5xl mb-4">🎮</div>
            <p className="text-[var(--text-muted)]">Игроки не найдены</p>
          </div>
        )}

        {/* Players Table */}
        {!isLoading && filtered.length > 0 && (
          <div className="card overflow-hidden p-0 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--bg-secondary)]">
                <tr className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  <th className="px-6 py-3 text-left">Игрок</th>
                  <th className="px-6 py-3 text-left">Команда</th>
                  <th className="px-6 py-3 text-left">Роль</th>
                  <th className="px-6 py-3 text-left">Тир</th>
                  <th className="px-6 py-3 text-left">Матчи</th>
                  <th className="px-6 py-3 text-left">K/D</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((player) => {
                  const team = teams.find((t) => t.name === player.team);
                  const kd = player.stats?.kd || 0;
                  const kdColor =
                    kd >= 1.3
                      ? 'text-green-400'
                      : kd >= 1.0
                      ? 'text-[var(--text-primary)]'
                      : 'text-red-400';

                  return (
                    <tr
                      key={player.id}
                      className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                      onClick={() => (window.location.href = `/players/${player.id}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {player.photo ? (
                            <Image
                              src={player.photo}
                              alt={player.nick}
                              width={40}
                              height={40}
                              className="rounded-lg"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center">
                              <span className="text-xl">👤</span>
                            </div>
                          )}
                          <span className="font-bold">{player.nick}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {team ? (
                          <div className="flex items-center gap-2">
                            {team.logo && (
                              <Image
                                src={team.logo}
                                alt={team.name}
                                width={24}
                                height={24}
                                className="rounded"
                              />
                            )}
                            <span className="text-sm">{player.team}</span>
                          </div>
                        ) : (
                          <span className="text-[var(--text-dim)]">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--text-muted)]">
                        {player.role || '—'}
                      </td>
                      <td className="px-6 py-4">
                        {team ? (
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
                        ) : (
                          <span className="text-[var(--text-dim)]">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {player.stats?.matches || 0}
                      </td>
                      <td className={`px-6 py-4 font-bold ${kdColor}`}>
                        {kd > 0 ? kd.toFixed(2) : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

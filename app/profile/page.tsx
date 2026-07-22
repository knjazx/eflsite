'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useData, useUpdateData } from '@/lib/hooks/use-data';
import type { User, Team } from '@/types';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: users = [] } = useData<User>('users');
  const { data: teams = [] } = useData<Team>('teams');
  const updateUser = useUpdateData<User>('users');

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    avatar: '',
    steamId: '',
    discordId: '',
  });

  const currentUser = users.find((u) => u.id === session?.user?.id);
  const myTeam = teams.find((t) => t.id === currentUser?.teamId);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        avatar: currentUser.avatar || '',
        steamId: currentUser.steamId || '',
        discordId: currentUser.discordId || '',
      });
    }
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;
    
    try {
      await updateUser.mutateAsync({
        id: currentUser.id,
        data: formData,
      });
      setEditing(false);
    } catch (error) {
      alert('Ошибка сохранения профиля');
    }
  };

  if (status === 'loading' || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2">👤 Профиль</h1>
          <p className="text-[var(--text-muted)]">Управление вашим аккаунтом</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar Card */}
          <div className="card text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-[var(--bg-secondary)] flex items-center justify-center">
              {formData.avatar ? (
                <Image
                  src={formData.avatar}
                  alt={formData.username}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              ) : (
                <span className="text-5xl">👤</span>
              )}
            </div>
            <h2 className="text-xl font-bold mb-1">{formData.username}</h2>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              {currentUser.role === 'admin'
                ? '⚙️ Администратор'
                : currentUser.role === 'igl'
                ? '👑 IGL'
                : '👤 Игрок'}
            </p>
            {myTeam && (
              <div className="p-3 bg-[var(--bg-secondary)] rounded-xl">
                <div className="text-xs text-[var(--text-dim)] mb-1">Команда</div>
                <div className="font-bold">{myTeam.name}</div>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Информация</h3>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="btn btn-outline btn-sm"
                >
                  ✏️ Редактировать
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="btn btn-primary btn-sm"
                    disabled={updateUser.isPending}
                  >
                    💾 Сохранить
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="btn btn-outline btn-sm"
                  >
                    ✖️ Отмена
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Логин</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="input"
                  disabled={!editing}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input"
                  disabled={!editing}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Аватар (URL)
                </label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.value })
                  }
                  className="input"
                  placeholder="https://i.ibb.co/..."
                  disabled={!editing}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Steam ID</label>
                <input
                  type="text"
                  value={formData.steamId}
                  onChange={(e) =>
                    setFormData({ ...formData, steamId: e.target.value })
                  }
                  className="input"
                  placeholder="STEAM_0:0:12345678"
                  disabled={!editing}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Discord ID
                </label>
                <input
                  type="text"
                  value={formData.discordId}
                  onChange={(e) =>
                    setFormData({ ...formData, discordId: e.target.value })
                  }
                  className="input"
                  placeholder="username#1234"
                  disabled={!editing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

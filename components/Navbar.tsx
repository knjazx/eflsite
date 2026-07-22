'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useThemeStore } from '@/lib/store';

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  const links = [
    { href: '/', label: 'ГЛАВНАЯ' },
    { href: '/tournaments', label: 'ТУРНИРЫ' },
    { href: '/teams', label: 'КОМАНДЫ' },
    { href: '/players', label: 'ИГРОКИ' },
    { href: '/news', label: 'НОВОСТИ' },
    { href: '/rules', label: 'ПРАВИЛА' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logotip.png" alt="EFL" width={40} height={40} />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-bold tracking-wider transition-colors ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-[var(--text-muted)] hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--bg-card)] transition-colors"
              aria-label="Переключить тему"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>

            {/* Auth */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-10 h-10 rounded-full bg-[var(--bg-card)] border-2 border-primary flex items-center justify-center overflow-hidden"
                >
                  {session.user.avatar ? (
                    <Image
                      src={session.user.avatar}
                      alt={session.user.name || 'User'}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold">
                      {session.user.name?.[0].toUpperCase()}
                    </span>
                  )}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden">
                    <Link
                      href="/profile"
                      className="block px-4 py-3 text-sm hover:bg-[var(--bg-secondary)] transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      👤 Профиль
                    </Link>
                    {session.user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-3 text-sm hover:bg-[var(--bg-secondary)] transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        ⚙️ Админ-панель
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      🚪 Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="btn btn-primary">
                ВХОД
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1"
            >
              <span className="w-5 h-0.5 bg-current transition-transform" />
              <span className="w-5 h-0.5 bg-current transition-transform" />
              <span className="w-5 h-0.5 bg-current transition-transform" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--border)]">
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg text-sm font-bold ${
                      pathname === link.href
                        ? 'bg-primary text-black'
                        : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

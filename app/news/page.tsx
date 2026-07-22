'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/lib/hooks/use-data';
import type { News } from '@/types';

export default function NewsPage() {
  const { data: news = [], isLoading } = useData<News>('news');

  const sorted = [...news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2">📰 Новости</h1>
          <p className="text-[var(--text-muted)]">
            Последние новости и объявления EFL League
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && sorted.length === 0 && (
          <div className="card text-center py-20">
            <div className="text-5xl mb-4">📰</div>
            <p className="text-[var(--text-muted)]">Новости пока отсутствуют</p>
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((article) => (
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
                <div className="flex items-center justify-between text-xs text-[var(--text-dim)]">
                  <span>{new Date(article.date).toLocaleDateString('ru-RU')}</span>
                  <span>{article.author}</span>
                </div>
                {article.views !== undefined && (
                  <div className="mt-2 text-xs text-[var(--text-dim)]">
                    👁 {article.views} просмотров
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

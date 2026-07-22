import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getCollection, COLLECTION_MAP } from '@/lib/db';
import { ObjectId } from 'mongodb';
import type { News } from '@/types';

export const revalidate = 60;

async function getArticle(id: string) {
  try {
    const col = await getCollection<News>(COLLECTION_MAP.news);
    const article = await col.findOne({ _id: new ObjectId(id) });
    if (!article) return null;
    return { ...article, id: article._id.toString(), _id: undefined };
  } catch {
    return null;
  }
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary transition-colors mb-8"
        >
          ← Назад к новостям
        </Link>

        {/* Article Header */}
        <article className="card">
          {article.image && (
            <div className="relative h-96 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-2xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mb-6">
            <h1 className="text-4xl font-black mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
              <span>📅 {new Date(article.date).toLocaleDateString('ru-RU')}</span>
              <span>✍️ {article.author}</span>
              {article.views !== undefined && <span>👁 {article.views} просмотров</span>}
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  );
}

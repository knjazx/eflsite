import type { Collection } from '@/types';

class ApiClient {
  private baseUrl = '/api/data';

  async get<T>(collection: Collection): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}?collection=${collection}`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки ${collection}`);
    }
    return response.json();
  }

  async insert<T>(collection: Collection, data: Partial<T>): Promise<T> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection, data }),
    });
    if (!response.ok) {
      throw new Error(`Ошибка создания в ${collection}`);
    }
    return response.json();
  }

  async update<T>(collection: Collection, id: string, data: Partial<T>): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection, id, data }),
    });
    if (!response.ok) {
      throw new Error(`Ошибка обновления в ${collection}`);
    }
  }

  async delete(collection: Collection, id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}?collection=${collection}&id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Ошибка удаления из ${collection}`);
    }
  }
}

export const api = new ApiClient();

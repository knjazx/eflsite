import { NextRequest, NextResponse } from 'next/server';
import { getCollection, COLLECTION_MAP } from '@/lib/db';
import { ObjectId } from 'mongodb';

const ALLOWED_COLLECTIONS = [
  'users', 'teams', 'players', 'tournaments', 
  'matches', 'news', 'groups', 'vetos', 'awards'
];

// GET: Получить все документы из коллекции
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');

    if (!collection || !ALLOWED_COLLECTIONS.includes(collection)) {
      return NextResponse.json(
        { error: 'Недопустимая коллекция' },
        { status: 400 }
      );
    }

    const mongoCollection = COLLECTION_MAP[collection];
    const col = await getCollection(mongoCollection);
    const documents = await col.find({}).toArray();

    // Преобразуем _id в id
    const result = documents.map(doc => ({
      ...doc,
      id: doc._id.toString(),
      _id: undefined,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('GET /api/data error:', error);
    return NextResponse.json(
      { error: 'Ошибка получения данных' },
      { status: 500 }
    );
  }
}

// POST: Создать новый документ
export async function POST(request: NextRequest) {
  try {
    const { collection, data } = await request.json();

    if (!collection || !ALLOWED_COLLECTIONS.includes(collection)) {
      return NextResponse.json(
        { error: 'Недопустимая коллекция' },
        { status: 400 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Данные не предоставлены' },
        { status: 400 }
      );
    }

    const mongoCollection = COLLECTION_MAP[collection];
    const col = await getCollection(mongoCollection);

    // Убираем id если есть, MongoDB создаст _id
    const { id, ...docData } = data;
    const result = await col.insertOne(docData);

    return NextResponse.json({
      ...docData,
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('POST /api/data error:', error);
    return NextResponse.json(
      { error: 'Ошибка создания документа' },
      { status: 500 }
    );
  }
}

// PUT: Обновить документ
export async function PUT(request: NextRequest) {
  try {
    const { collection, id, data } = await request.json();

    if (!collection || !ALLOWED_COLLECTIONS.includes(collection)) {
      return NextResponse.json(
        { error: 'Недопустимая коллекция' },
        { status: 400 }
      );
    }

    if (!id || !data) {
      return NextResponse.json(
        { error: 'ID или данные не предоставлены' },
        { status: 400 }
      );
    }

    const mongoCollection = COLLECTION_MAP[collection];
    const col = await getCollection(mongoCollection);

    // Убираем id из данных
    const { id: _, ...updateData } = data;

    await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT /api/data error:', error);
    return NextResponse.json(
      { error: 'Ошибка обновления документа' },
      { status: 500 }
    );
  }
}

// DELETE: Удалить документ
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');
    const id = searchParams.get('id');

    if (!collection || !ALLOWED_COLLECTIONS.includes(collection)) {
      return NextResponse.json(
        { error: 'Недопустимая коллекция' },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: 'ID не предоставлен' },
        { status: 400 }
      );
    }

    const mongoCollection = COLLECTION_MAP[collection];
    const col = await getCollection(mongoCollection);

    await col.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/data error:', error);
    return NextResponse.json(
      { error: 'Ошибка удаления документа' },
      { status: 500 }
    );
  }
}

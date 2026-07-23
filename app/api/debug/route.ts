import { NextResponse } from 'next/server';
import { getCollection, COLLECTION_MAP } from '@/lib/db';

export async function GET() {
  try {
    // Проверяем переменные окружения
    const envCheck = {
      MONGODB_URI: !!process.env.MONGODB_URI,
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    };

    // Пытаемся подключиться к MongoDB
    const usersCol = await getCollection(COLLECTION_MAP.users);
    const userCount = await usersCol.countDocuments();
    const adminExists = await usersCol.findOne({ username: 'Admin' });

    return NextResponse.json({
      success: true,
      env: envCheck,
      database: {
        connected: true,
        usersCount: userCount,
        adminExists: !!adminExists,
        adminData: adminExists ? {
          username: adminExists.username,
          email: adminExists.email,
          role: adminExists.role,
          hasPassword: !!adminExists.password,
        } : null,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}

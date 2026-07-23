// Скрипт для создания админа в MongoDB
// Запуск: node scripts/create-admin.js

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'efl_league';

async function createAdmin() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI не найден в .env.local');
    process.exit(1);
  }

  console.log('🔄 Подключение к MongoDB...');
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Подключено к MongoDB');

    const db = client.db(DB_NAME);
    const usersCol = db.collection('pl_users');

    // Проверяем, существует ли админ
    const existingAdmin = await usersCol.findOne({ username: 'Admin' });
    
    if (existingAdmin) {
      console.log('⚠️  Пользователь Admin уже существует');
      console.log('📝 Обновляем пароль на admin123...');
      
      await usersCol.updateOne(
        { username: 'Admin' },
        { 
          $set: { 
            password: 'admin123',
            role: 'admin',
            email: 'admin@efl-league.gg'
          } 
        }
      );
      
      console.log('✅ Пароль админа обновлён!');
    } else {
      console.log('📝 Создаём нового админа...');
      
      const admin = {
        username: 'Admin',
        email: 'admin@efl-league.gg',
        password: 'admin123', // В продакшене NextAuth будет сравнивать напрямую
        role: 'admin',
        joinedAt: new Date(),
        avatar: null,
        team: null,
        teamId: null
      };

      await usersCol.insertOne(admin);
      console.log('✅ Админ создан!');
    }

    console.log('\n🔐 Данные для входа:');
    console.log('Логин: Admin');
    console.log('Пароль: admin123');
    console.log('\n🌐 Войдите на сайте: /auth/login');

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n✅ Соединение закрыто');
  }
}

createAdmin();

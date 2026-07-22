export default function RulesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container max-w-4xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2">📋 Правила</h1>
          <p className="text-[var(--text-muted)]">
            Правила и регламент EFL League
          </p>
        </div>

        <div className="card prose prose-invert max-w-none">
          <h2>1. Общие положения</h2>
          <p>
            EFL League — это киберспортивная лига по Counter-Strike 2,
            проводимая на регулярной основе.
          </p>

          <h2>2. Требования к участникам</h2>
          <ul>
            <li>Возраст участников — от 16 лет</li>
            <li>Наличие активного Steam аккаунта</li>
            <li>Соблюдение правил Fair Play</li>
          </ul>

          <h2>3. Формат турниров</h2>
          <p>
            Турниры проводятся в различных форматах: одиночный/двойной
            олимпийский, групповой этап + плей-офф.
          </p>

          <h2>4. Правила матчей</h2>
          <ul>
            <li>Формат: BO1, BO3 или BO5 (в зависимости от этапа)</li>
            <li>Система веты карт</li>
            <li>Таймауты: 4 по 30 секунд на команду</li>
          </ul>

          <h2>5. Запрещенные действия</h2>
          <ul>
            <li>Использование читов и эксплойтов</li>
            <li>Токсичное поведение</li>
            <li>Договорные матчи</li>
          </ul>

          <h2>6. Санкции</h2>
          <p>
            За нарушение правил предусмотрены дисквалификация, бан и другие
            санкции.
          </p>

          <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-xl">
            <p className="text-sm">
              💡 Полный регламент доступен в нашем{' '}
              <a
                href="https://discord.gg/RSmd8rAV4V"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark font-bold"
              >
                Discord сервере
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

# Frontend-trainee-assignment-winter-2025 (Клон Авито)

Клон популярной платформы объявлений с базовым функционалом: размещение, редактирование и просмотр объявлений в категориях "Недвижимость", "Авто" и "Услуги".

---

## 🚀 Запуск проекта

### Предварительные требования
- Node.js v20+
- npm v9+

### 1. Установка зависимостей
```bash
# Для клиента
cd client
npm install

# Для сервера
cd server
npm install
```

### 2. Запуск сервера
```bash
cd server
npm start
# Сервер будет доступен на http://localhost:3000
```

### 3. Запуск клиента
```bash
cd client
npm run dev
# Клиент будет доступен на http://localhost:5173
```

---

## 🛠 Технологии

### Обязательные
| Технология | Назначение |
|------------|------------|
| React 18+  | Базовый фреймворк для UI |
| Node.js 20 | Серверная платформа |
| react-router-dom | Маршрутизация |

### Необязательные (выбор обоснован)
| Технология | Причина выбора |
|------------|----------------|
| **Redux Toolkit** | Упрощает управление глобальным состоянием, поддерживает асинхронные операции |
| **TypeScript** | Повышает надежность кода за счет статической типизации |
| **ESLint + Prettier** | Автоматизирует форматирование и соблюдение стиля кода |
| **React Hook Form** | Упрощает валидацию сложных форм с многошаговым вводом |

---

## 🎯 Особенности реализации

### Ключевые функции
- Динамическая фильтрация по категориям 
- Многошаговая форма создания объявлений
- Сохранение черновиков в localStorage
- Пагинация на клиентской стороне
- Адаптивная верстка

---

## 📂 Структура проекта
```
project/
├── client/           # Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── store/    # Redux логика
│   │   └── ...
├── server/           # Backend
│   ├── app.js        # Основной серверный файл
│   └── ...
```

---

## 🤝 Как внести вклад
1. Форкните репозиторий
2. Создайте feature-ветку: `git checkout -b feature/your-feature`
3. Закоммитьте изменения: `git commit -m 'Add amazing feature'`
4. Запушьте в GitHub: `git push origin feature/your-feature`
5. Создайте Pull Request

---

Лицензия: [MIT](LICENSE)

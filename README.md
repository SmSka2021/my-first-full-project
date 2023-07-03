# Used in this project

backend: REST API with NestJS, Docker and MongoDB TypeScript
frontend: TypeScript, React, NextJS, Redux, Tailwind

## How to use it?

```bash
cd backend
npm install
docker-compose up --build -d

```

```bash
cd frontend
yarn install
yarn dev

```

## Notes

Реализован функционал списка добрых дел
• Регистрации, авторизация, обновление данных, удаления пользователя ();
• Авторизованный пользователь управляет своим списком добрых дел (CRUD);
• Авторизованный пользователь может добавлять людей по общедоступному уникальному идентификатору (NickName) в друзья и смотреть их список добрых дел;

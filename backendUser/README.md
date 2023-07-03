# Used in this project

REST API with NestJS, Docker and MongoDB TypeScript

## How to use it?

```bash
cd backendUser
npm install
docker-compose up --build -d
```


## Notes

Реализован функционал списка добрых дел
• Регистрации, авторизация, обновление данных, удаления пользователя ();
• Авторизованный пользователь управляет своим списком добрых дел (CRUD);
• Авторизованный пользователь может добавлять людей по общедоступному уникальному идентификатору (NickName) в друзья и смотреть их список добрых дел;

```bash
APP_PORT=3001
MONGODB_URL=mongodb://mongodb:27017/UsersGoodWork
```

If you directly using your working machine and MongoDB installed on your machine

```bash
APP_PORT=3001
MONGODB_URL=mongodb://localhost:27017/UsersGoodWork
```

You can start the project using the following command

```bash
docker-compose up --build -d
```

REST API

```bash
localhost:3001/user/  GET- all users
```

```bash
localhost:3001/tasks/  GET- all tasks
```

```bash
localhost:3001/user/register  POST- create one user + body{ name: string, email: string, password: string, nickName: string}
```

```bash
localhost:3001/profile GET/with JWT-getID user
```

```bash
localhost:3001/user/nick/:nickName  GET/with JWT- get one user by nickName
```

```bash
localhost:3001/auth/login  POST- login user + body{ name: string, password: string}
```

```bash
localhost:3001/user/:id  GET/with JWT- one user by id
```

```bash
localhost:3001/user/:id  PUT/with JWT- update one user by id + body: optional{ name: string, email: string, password: string, nickName: string}
```

```bash
localhost:3001/user/:id  DELETE/with JWT- delete one user by id
```

```bash
localhost:3001/user/:id/task  POST/with JWT- create one task user's + body{ title: string,  description: string;}
```

```bash
localhost:3001/user/:idUser/task/:idTask  PUT- update one task user's +  body{ title: string,  description: string;}
```

```bash
localhost:3001/user/:idUser/task/:idTask  DELETE/with JWT- delete one task user's
```

```bash
localhost:3001/user/friend  POST/with JWT- add friends users + body{ idUser, idFriend}
```

```bash
localhost:3001/user/:idUser/friend/:idFriend  DELETE/with JWT- remove checked friend user's
```

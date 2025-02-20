## Getting Started
```bash
npm i
# and
npm run dev
```

## PostgreSQLの立ち上げ方
```bash
#起動
docker-compose up -d
#接続
docker ps
#コンテナに入って直接SQL
docker exec -it habit-tracker-db psql -U user -d habit_tracker
```

## prisma
```bash
# prisma立ち上げる
npx prisma migrate dev --name init
# DBをGUI管理 
npx prisma studio

```
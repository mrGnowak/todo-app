# TODOAPP

## Dev
- Uruchomić bazę danych w Dockerze `docker-start-dev.cmd`
- Serwer uruchomić w trybie `Debug` w `VS Code`. Będzie dostępny na porcie `8080`.
- Front uruchomić przez:
```
cd src/main/frontend
yarn vite
```
> W `vite.config.ts` jest zapisany endpoint dla `/api` = `"http://127.0.0.1:8080`

## Prod
1. Zbudować backend (`Maven`)
2. Zbudować frontend (`yarn build`)
3. Uruchomić docker-compose `docker-start-all.cmd`

> Frontend powinien być dostępny na porcie `8081`
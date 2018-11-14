## Đồ Án
> Xây dựng hệ thống truy xuất nguồn gốc của thực phẩm với Blockchain

## Note
* Port of system
```
Client: 3003
API: 3004
Web: 3005
```
* Run
```
// Client
$ cd web-client
$ pm2 start main.js --name demo101-webclient
// API
$ cd api
$ pm2 start src/main.js --name demo101-api
// Web admin
$ cd web-admin
$ pm2 start start.sh --name demo101-webadmin
```

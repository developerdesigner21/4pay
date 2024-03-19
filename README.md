FrontEnd:
1. root file
2. yarn
3. yarn dev:shop-gql
4. new terminal -> yarn dev:admin-gql


Backend
1. cd api/
2. composer install --ignore-platform-req=ext-intl
3. php artisan serve

php artisan storage:link

sudo chown -R www-data:www-data storage
sudo chown -R www-data:www-data bootstrap/cache

yarn build:shop-gql
yarn build:admin-gql

pm2 restart number
pm2 restart number

pm2 --name shop-gql start yarn -- run start:shop-gql
pm2 --name admin-gql start yarn -- run start:admin-gql
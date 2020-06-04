#!/usr/bin/env bash

rm ./db.json
npm run build

echo "commit site changes"
git add .

DATE=`date +%Y-%m-%d`
git commit -am "update ${DATE}" --allow-empty
git push

cd public
git init
git add .
git commit -am 'Update docs'
git push https://github.com/bluehymn/cn.konvajs.git master --force
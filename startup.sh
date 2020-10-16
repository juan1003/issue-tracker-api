#!/bin/bash

read -p 'NODE_ENV: ' NODE_ENV
read -p 'DB_NAME: ' DB_NAME
read -p 'DB_USER: ' DB_USER
read -sp 'DB_PASS: ' DB_PASS
read -p 'DB_HOST: ' DB_HOST
read -p 'SECRET: ' SECRET

# read -p 'AWS_ACCESS_KEY: ' AWS_ACCESS_KEY
# read -sp 'AWS_SECRET_KEY: ' AWS_SECRET_KEY
# read -p 'S3_BUCKET: ' S3_BUCKET

echo NODE_ENV=\"$NODE_ENV\" > .env
echo DB_NAME=\"$DB_NAME\" >> .env
echo DB_USER=\"$DB_USER\" >> .env
echo DB_PASS=\"$DB_PASS\" >> .env
echo DB_HOST=\"$DB_HOST\" >> .env
echo SECRET=\"$SECRET \">> .env

# echo AWS_ACCESS_KEY=\"$AWS_ACCESS_KEY\" >> .env
# echo AWS_SECRET_KEY=\"$AWS_SECRET_KEY\" >> .env
# echo S3_BUCKET=\"$S3_BUCKET\" >> .env
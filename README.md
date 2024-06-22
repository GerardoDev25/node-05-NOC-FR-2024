# NOC

## dev
before to start make sure you have the necessaries tools 
  * nodejs V20
  * docker
  * yarn

1 clone the file __.env.template__ to __.env__ 
2 config the environments variables
```
PORT=3000
MAILER_SERVICE=gmail
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false

# mongo db
MONGO_URL=mongodb://gerardo:123456@localhost:27017/
MONGO_DB_NAME=NOC
MONGO_USER=gerardo
MONGO_PASS=123456

# postgres db
POSTGRES_URL=postgresql://postgres:123456@localhost:5432/NOC
POSTGRES_USER=postgres
POSTGRES_DB=NOC
POSTGRES_PASSWORD=123456

``` 

3 install the packages dependencies __yarn install__

4 prepare prisma migration __yarn prisma migrate dev --name {name}__

5 run app development mode __yarn dev__


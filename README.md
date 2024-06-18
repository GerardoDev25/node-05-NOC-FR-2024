NOC

# dev

1 clone the file __.env.template__ to __.env__ 
2 config the environments variables
```
PORT=3000
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false

``` 

3 install the packages dependencies __yarn install__


4 if you have issue with permission with the folder mongo-test and postgres-test please run the following commands on linux

```sh
sudo chmod -R 755 postgres-test
sudo chmod -R 755 mongo-test

```
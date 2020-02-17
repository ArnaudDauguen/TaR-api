# I. Présentation


# 2. Installation
```
git clone git@git.ynov-bordeaux.com:85791/try-and-redie.git
cd try-and-redie
```
### Import bases datas
#### With docker
```
sudo docker pull mongo
sudo docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:latest

sudo docker cp ./db/Dungeons.json mongodb:/Dungeons.json
sudo docker cp ./db/Stuff.json mongodb:/Stuff.json
sudo docker cp ./db/Terrain.json mongodb:/Terrain.json
sudo docker cp ./db/Users.json mongodb:/Users.json
sudo docker exec -it mongodb bash
```
```
mongoimport -c dungeons -d Dungeons < Dungeons.json
mongoimport -c stuffs -d Stuffs < Stuff.json
mongoimport -c terrains -d Terrains < Terrain.json
mongoimport -c users -d Users < Users.json
```
#### Or import manually
![Pixel Track](https://github.com/Forsapt/pixel-track/blob/master/icon.png?raw=true)

# Pixel Track

Pixel track is an application for gathering site statistics.

Technologies used:
 - Backend
    * Express.js
    * Passport.js
 - Fronted:
    * React.js
    * styled-components
    * axios
 - Database:
    * Postgresql

[Demo](https://pixel-track-forsapt.herokuapp.com/)

## Installation

``` bash
# clone repo
git clone https://github.com/Forsapt/pixel-track.git
cd pixel-track

# build
docker build -t pixel-track .

# run container with variable action to initialize database
docker run -d -p 8080:8080 \
    -e PORT=8080 \
    -e DATABASE_URL="..." \
    -e GOOGLE_CLIENT_ID="..." \
    -e GOOGLE_CLIENT_SECRET="..." \
    -e JWT_SECRET="..." \
    -e ACTION="create_database" \
    --name pixel-track-init \
    pixel-track
docker stop pixel-track-init
docker rm pixel-track-init

# run it again
docker run -d -p 8080:8080 \
    -e PORT=8080 \
    -e DATABASE_URL="..." \
    -e GOOGLE_CLIENT_ID="..." \
    -e GOOGLE_CLIENT_SECRET="..." \
    -e JWT_SECRET="..." \
    --name pixel-track-init \
    pixel-track
```

FROM node
WORKDIR /usr/src/app
COPY backend ./backend
COPY frontend ./frontend

RUN cd frontend &&\
    npm install &&\
    npm run build &&\
    cd ../backend &&\
    npm install &&\
    cp -a ../frontend/build/* ./public
WORKDIR /usr/src/app/backend
CMD [ "node", "src/app.js" ]

FROM node
WORKDIR /usr/src/app
COPY backend ./backend
COPY frontend ./frontend

RUN cd frontend &&\
    yarn install &&\
    yarn build &&\
    cd ../backend &&\
    yarn &&\
    cp -a ../frontend/build/* ./public
WORKDIR /usr/src/app/backend
CMD [ "node", "src/app.js" ]

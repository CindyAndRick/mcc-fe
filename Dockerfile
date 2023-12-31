FROM node:20 AS build
RUN mkdir /app
WORKDIR /app
COPY . .

# ENV REACT_APP_USER_API_URL=http://mcc-be-user-service:30500/
# ENV REACT_APP_CHAT_API_URL=http://mcc-be-chat-service:30501/
ENV REACT_APP_USER_API_URL=http://192.168.49.2:30500/
ENV REACT_APP_CHAT_API_URL=http://192.168.49.2:30501/
# ENV REACT_APP_USER_API_URL=http://101.133.165.164:5000/
# ENV REACT_APP_CHAT_API_URL=http://49.234.53.27:5000/

RUN npm install && npm run build
# RUN npm install 
# CMD ["npm", "start"]

# EXPOSE 3000


FROM nginx
WORKDIR  /usr/share/nginx/html
COPY custom.conf /etc/nginx/conf.d/custom.conf
RUN rm -rf ./*
COPY --from=build /app/build .

EXPOSE 80

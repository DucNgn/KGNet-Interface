FROM node:12
WORKDIR /app
COPY . .
RUN npm cache clean --force
RUN npm install
RUN npm run build

FROM nginx:1.21.1-alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

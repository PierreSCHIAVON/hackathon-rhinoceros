FROM node:21-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Debug
RUN ls -la
RUN npm run build
RUN ls -la dist

EXPOSE 3000
CMD ["npm", "start"]
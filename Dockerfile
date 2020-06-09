FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install cors --save


# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
#ENV GOOGLE_APPLICATION_CREDENTIALS="/usr/src/app/apikey.json"

EXPOSE 4000
CMD ["node","app.js"]


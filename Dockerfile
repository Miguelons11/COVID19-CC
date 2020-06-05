FROM node:10-alpine

# Create app directory
# RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Add node_modules to the path
# ENV PATH usr/src/app/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install cors
#RUN npm install -g @vue/cli

#RUN npm install vue
#RUN npm install -g @vue/cli
#RUN npm i -g @vue/cli-service
#RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000
# RUN "node app.js && cd /client && npm run serve"
CMD ["node","app.js"]
# RUN cd client/ && npm install && npm install -g @vue/cli
# CMD ["sh", "-c", "cd client/ && npm run serve"]


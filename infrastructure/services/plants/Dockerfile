FROM node:lts
ENV APP_PATH /project
WORKDIR $APP_PATH
COPY . .
RUN yarn install
RUN yarn global add nodemon typescript
CMD ["yarn", "--cwd", "services/plants", "start"]

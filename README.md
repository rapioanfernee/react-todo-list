# React TODO List

- This application is created using Create-React-App
- This project is deployed in github pages
- Currently deployed in https://rapioanfernee.github.io/react-todo-list/

# Screenshots

![image](https://user-images.githubusercontent.com/8468303/112153796-a3350300-8c1e-11eb-9d96-44264981912c.png)

## Steps to run

### Deployed version

- Go to https://rapioanfernee.github.io/react-todo-list/

### Local Version

- Delete `package-lock.json` and `node_modules` to properly install all dependencies
- Run `npm install`
- Create a `.env` file in the root directory of the project and copy the contents of `.env.example` to the created file

## Steps to deploy

- Run `npm run predeploy` to build the project for github pages
- Run `npm run deploy` to deploy the project to github pages

## Alternatives for API

If the current API is not working, the alternative github repository for a test rest server is on https://github.com/rapioanfernee/todo-list-express-aws .

- run `npm dev` to start the server and change the API environment variable `REACT_APP_API_URL` in .env of this project to `http://localhost:3001`.

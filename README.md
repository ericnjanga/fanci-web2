This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

React application allowing people to connect with each other via Google Map and post notifications

### Developed by 
[Eric Njanga](https://www.ericnjanga.com) / eric.njanga@gmail.com / Toronto, Canada.

## Table of Contents

- [JavaScript Style Guide](#javascript-style-guide)


## JavaScript Style Guide
Code is structured by [ESLint](https://eslint.org/) and follows [JavaScript Style Guide](https://github.com/airbnb/javascript)

<!---
## Table of Contents

- [Project Dependencies](#project-dependencies)
- [Development Steps](#development-steps)
  - [Setting up routes and shell login/logout system](#routes-login-logout-shell)
  - [Font Awesome (through npm)](#xxx)
  - [Adding Twitter Bootstrap (through npm)](#xxx)
  - [Using modularized CSS](#xxx)
  - [Connecting with firebase](#xxx)
  - [Login/logout with firebase](#xxx)
  - [Creating content with firebase](#xxx)
  - [Views transition](#xxx)
  - [Posting a update (twitter like with SVG circle)](#xxx)


## Project Dependencies
- [React Router](https://github.com/ReactTraining/react-router)
- [Firebase](https://www.npmjs.com/package/firebase)
- More coming ...

## Development Steps
Describes the incremental development steps and the features added

### Setting up routes and shell login/logout system
[See the branch here](https://github.com/ericnjanga/react__therock-fanclub/tree/routes-shell-auth).
The steps:
- Using [React Router](https://github.com/ReactTraining/react-router) to setup routes
  - Unauthenticated users:
    - They only have access to 2 pages: login and terms and conditions routes
    - When they log in (so get authenticated), they must be immediately redirected to the home route
  - Authenticated users:
    - They have access to all pages, except login
    - When they log out (so gets unauthenticated), they must be immediately redirected to the login route, regardless of the current route
- Organize the layout into components
- Setup a shell login/logout system to simulate layout change (state change) when user authenticates in/out
--->
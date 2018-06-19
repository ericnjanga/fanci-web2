This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

React application allowing people to connect with each other via Google Map and post notifications

### Developed by 
[Eric Njanga](https://www.ericnjanga.com) / eric.njanga@gmail.com / Toronto, Canada.

## Table of Contents
- [JavaScript Style Guide](#javascript-style-guide)
- [Good React Patterns](#good-react-patterns)
- [Print the JS documentation](#print-js-documentation)


## JavaScript Style Guide
Code is structured by [ESLint](https://eslint.org/) and follows [JavaScript Style Guide](https://github.com/airbnb/javascript). Check rules inforcement in <b>.eslintrc</b> file.

## Good React Patterns
Functional programing patterns:
- First class objects leading to <b>Higher-order Functions (HoF)</b>: Heavily used in the React ecosystem, HoFs are functions that take a function as a parameter, optionally some other parameters, and return a function. The returned function is usually enhanced with some special behaviors.
- <b>Purity</b>: Also very used in the React ecosystem, pure functions are functions which do not change anything that is not local to them (they don't change the state, they don't modify higher scope variables, ...). Pure functions are easier to debug and reuse.
- <b>Immutability</b>: In the immutability pattern, functions create and return new variables and values.

## Print JS documentation
The JS documentation is printed in two steps. From your terminal, type:
- babel src --out-dir src-babel
- ./node_modules/.bin/esdoc -c .esdoc.json
# HeartString

## A little about HeartString

HeartString is a full-stack application meant to invoke the feeling of connecting with a stranger. Users of HeartString can post anonymous Hearts to express how they are feeling. Other user can respond to Heart you have posted, and if one of the responses moves you, you can choose to connect with them. Users you are connected to can see 
which hearts posted are yours. Try to make as many connections as you can!

## Development
* You can read more about the project using the wiki located at: https://github.com/CamChandler98/HeartString/wiki
* To start a development environment:
    1. Clone the repository at: https://github.com/CamChandler98/HeartString
    2. Run the command "npm install" from the react-app directory in your terminal to install dependencies for the front end
    3. Run the command "pipenv install" from the root directory in your terminal to install dependencies for the backend and create a virtual environment.
    4. Run the command "flask run" from the root directory to start the backend server.
    5. Run the command "npm start" from the react-app directory to start the frontend server.
    6. Navigate to the localhost port specified in config/index.js

## Technologies Used
* Javascript
* HTML/CSS
* Reactjs
* Redux
* Python
* Node.js
* Flask
* SQLAlchemy
* Socket.io
* Postgres
* Heroku
* AWS S3
* Git/Github
* Faker


## Application Architecture 

HeartString is built using a React frontend , a Flask web framework , Flask-SQLAlchemy ORM and Postgresql RDMS 

### React

React's components and state management greatly eases the process of translating new features into intuitive UI elements

### Redux 

Redux is used as a store for HeartString as well as being used to make API calls to the backend server

### Socket.io

Socket.io to emit and listen to messages on the frontend and the backend. THis allows user to receive notifications when they are messaged and to instantly message each other.


### Flask and Flask-SQLAlchemy

Flask and Flask-SQLAlchemy greatly increased the speed of developent by easing the process of writing API routes and database models


## Conclusion and Next Steps

HeartString has all the functionality it needs to be a serviceable app , but there are a lot of times where it feels very empty. Future plans include features that allow users to connect in other ways such as short surveys and live group activity. The style is something I am greatly satisfied by, but the transitions between different components can be very jarring so in the future it would also be great to include some animation to ease those transitions


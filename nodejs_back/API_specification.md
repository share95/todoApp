Task Management API

This API allows you to manage tasks for specific users. 
It uses json as both the recieving and sending format.
For database it uses mongoDB, with mongoose for nodejs models and schemas.
The structure should be pretty clear on backend: two controllers with endopints for two entities we will be working with, models for CRUD and additional validation, middleware for error handling and security, routes with mapped responding controller functions, and exported requests in requests_postman so you can test the backend itself. 
Also the documentation will be covering successful requests and responses, all of the errors are handlet with appropriate status codes and messages (etc 404 not found, 400 bad request...)

# USERS
Endpoints for managing logged users and to register new users.
User contains email, username and password. The whole model contains timestamps and the db id.

### POST /api/users/login:
It is supposed to give you the JWT (access token) if the login credentials are correct.
Request: 
`{
  "username": "danilo",
  "password" : "12345"
}`


Response: status 200
`{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZGFuaWxvIiwiZW1haWwiOiJkYW5pbG9zYXJvdmljQGhvdG1haWwuY29tIiwiaWQiOiI2NTA5MjAyZWRjOTkyOWQyOWQwZjIwNWQifSwiaWF0IjoxNjk1MjEyNTY3LCJleHAiOjE2OTUyMTQzNjd9.n2RsLI0Zy2MskKiYgqQKp9P-ttRu5Yt_DFfqB8JZFnY"
}`

### POST /api/users/register:
Registers a new user into the database

Request:
`{
  "username" : "danilo2",
  "password" : "12345",
  "email" : "danilo.sarovic@pmf.edu.rs"
}`

Response: status 201


### GET /api/users/logged-user
Returns data of the user currently logged in
Request: 
empty body, requires a bearer token for auth 

Response: STATUS 200
`{
  "username": "danilo",
  "email": "danilosarovic@hotmail.com",
  "id": "6509202edc9929d29d0f205d"
}`

----------

# TASKS
Endpoints for managing tasks, if they belong to the logged user.
Tasks contain title, due (the date and time when the task is due), description, and completed flag. All of these endpoints are protected to work only for logged users, and to allow users to only CRUD their own tasks.

###  GET /api/tasks/
Returns a JSON array of all of the logged user's tasks.

Request: 
empty body, requires a bearer token for auth 

Response: STATUS 200
`[
  {
    "_id": "6509df44a92da2accee6aedc",
    "user_id": "6509202edc9929d29d0f205d",
    "title": "Do the test 2",
    "completed": false,
    "due": "2023-09-20T00:00:00.000Z",
    "createdAt": "2023-09-19T17:49:56.724Z",
    "updatedAt": "2023-09-19T17:49:56.724Z",
    "__v": 0
  }
]`

### POST/api/tasks/
Creates a new task from the sent data, returns the newly created task if successful.

Request: requires bearer token
`{
  "title" : "Do the test 3",
  "due" : "2023-09-20",
  "decription" : "Do the ndoejs and react test 3"
}`

Response: STATUS 201
`{
  "user_id": "6509202edc9929d29d0f205d",
  "title": "Do the test 3",
  "completed": false,
  "due": "2023-09-20T00:00:00.000Z",
  "_id": "650ae78f4d761f1fb1fa124c",
  "createdAt": "2023-09-20T12:37:35.966Z",
  "updatedAt": "2023-09-20T12:37:35.966Z",
  "__v": 0
}`

### PUT /api/tasks/:id 
Used to update a task object with the sent data based on the forwarded id.

Request: requires bearer token
`{
  "title" : "Do the test",
  "due" : "2023-09-20T23:59:00.000Z",
  "decription" : "Do the ndoejs and react test"
}`


Response : STATUS 200

`{
  "_id": "650ae78f4d761f1fb1fa124c",
  "user_id": "6509202edc9929d29d0f205d",
  "title": "Do the test",
  "completed": false,
  "due": "2023-09-20T23:59:00.000Z",
  "createdAt": "2023-09-20T12:37:35.966Z",
  "updatedAt": "2023-09-20T12:44:05.764Z",
  "__v": 0
}`

### PATCH /api/tasks/:id
This method is ment for a partial update of a task object, so we would not need to send a whole object, but just what we want changed. It is handy for setting a task to done or not done, or for triggering when editing just one field without posting the whole form. Returns the whole updated object, so it can be handy for mapping on the frontend after checking some task done.

Request: requires bearer token
`{
  "completed" : true
}`

Response: STATUS 200
`{
  "_id": "650ae78f4d761f1fb1fa124c",
  "user_id": "6509202edc9929d29d0f205d",
  "title": "Do the test",
  "completed": true,
  "due": "2023-09-20T23:59:00.000Z",
  "createdAt": "2023-09-20T12:37:35.966Z",
  "updatedAt": "2023-09-20T12:48:19.436Z",
  "__v": 0
}`


### DELETE /api/tasks/:id
Endpoint for deleting a task by id and returns the deleted object.

Request: empty, but requires bearer token

Response:STATUS 200
`{
  "_id": "650ae78f4d761f1fb1fa124c",
  "user_id": "6509202edc9929d29d0f205d",
  "title": "Do the test",
  "completed": true,
  "due": "2023-09-20T23:59:00.000Z",
  "createdAt": "2023-09-20T12:37:35.966Z",
  "updatedAt": "2023-09-20T12:48:19.436Z",
  "__v": 0
}`


### GET /api/tasks/:id
Endpoint for returning a single task object by id. Handy for an on click detail view.

Request: empty, but requires bearer token

Response: STATUS 200
`{
  "_id": "6509df44a92da2accee6aedc",
  "user_id": "6509202edc9929d29d0f205d",
  "title": "Do the test 2",
  "completed": false,
  "due": "2023-09-20T00:00:00.000Z",
  "createdAt": "2023-09-19T17:49:56.724Z",
  "updatedAt": "2023-09-19T17:49:56.724Z",
  "__v": 0
}`


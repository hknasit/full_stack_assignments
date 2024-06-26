/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const bodyParser = require('body-parser');
  const fs = require('fs');

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}))

  function readFileData(path){
    return new Promise((resolve, rejects) => {
      fs.readFile(path, 'utf-8', (err, data) => {
        resolve(JSON.parse(data))
      })
    })
  }

  app.get('/todos', async (req, res)  => {
    const fileData = await readFileData("todos.json")
    res.status(200).json(fileData);
  })

  app.get('/todos/:id', async (req, res) => {
    
    const fileData = await readFileData('todos.json');
    if(!fileData.length == 0){
      
      const todo = new Array(...fileData).find((todo) => todo.id == req.params.id)
      if(todo){
      
        res.status(200).json(todo);
      }else {
      res.status(404).send("Data not found");
      }
    }else {
      res.status(404).send("Data not found");
    }
  })

  function writeFileData(path, data){
    return new Promise( (resolve, reject) => {
     fs.writeFileSync(path, data)
      resolve()
    })
  }

  app.post('/todos', async (req, res) => {
    // console.log(req.body)
    let oldTodos = await readFileData('todos.json');
    const lastNumber = Number(new Array(...oldTodos).pop()?.id || 0);
    const newTodo = {id:lastNumber+1, ...req.body}
    let newTodos = [...oldTodos, newTodo];
    await writeFileData('todos.json', JSON.stringify(newTodos));

    res.status(201).json({id: lastNumber+1})
  })

  app.put('/todos/:id', async (req, res) => {

    const oldTodos =await readFileData('todos.json');
    const oldTodo = new Array(...oldTodos).find((todo) => todo.id == req.params.id);
    if(oldTodo){
      const newTodos =  Array(...oldTodos).map((todo) => {
        if(todo.id == req.params.id){
          const newTodo = {id: req.params.id, ...req.body}
          return newTodo
        }else {
          return todo
        }
      })

      await writeFileData('todos.json', JSON.stringify(newTodos));
      res.status(200).send("todo updated")
    }else {
      res.status(404).send("Data not found")
    }
  })

  app.delete('/todos/:id',async (req, res) => {
    const oldTodos = await readFileData('todos.json');
    const todoToRemove  = oldTodos.find((todo) => todo.id == req.params.id);
     if(todoToRemove){
       // remove from the array and write the new array in the file
       const newTodos = oldTodos.filter((todo) => todo.id != todoToRemove.id);
       await writeFileData('todos.json', JSON.stringify(newTodos))
    
       res.status(200).send("Data deleted")
    }else{
      res.status(404).send("Data not found")
    }
  })

  // app.listen(3000, () => {
  //   console.log("Todo server is listening on port 3000")
  // })

  
  module.exports = app;
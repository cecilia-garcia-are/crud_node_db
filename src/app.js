import express from 'express';
import db from './utils/database.js';
import Todo from './models/todoModels.js';
import 'dotenv/config';
import cors from 'cors';



//Modelo
Todo

//PORT SERVIDOR DE NODE
const PORT = process.env.PORT ?? 8000

//conexion con la base de datos

db.authenticate()
  .then(() => {console.log('Conexión correcta')})
  .catch(error => console.log(error))

//sincronizando mi base de datos

db.sync()
  .then(() => {console.log('Base de datos sincronizada')})
  .catch(error => console.log(error))

//mi exress
const app = express()
app.use(express.json())
app.use(cors())

//health check
app.get('/', (req, res) => {
    res.send('Ok')
})


//GET para obtener todas las tareas en la ruta'/todos'
app.get ('/todos', async (req, res) => {
    try {
        const todos = await Todo.findAll()
        res.json(todos)
    } catch (error) {
        res.status(400).json(error)
    }
})

// SELECT * FROM todos WHERE id= ?
//GET/ '/todos/:id' (obtener una tarea por el id)
// **mandamos el id en este get con path params*//

app.get('/todos/:id', async(req, res) => {
    try {
      const {id}= req.params
      const todo = await Todo.findByPk(id)
      res.json(todo)
    } catch (error) {
      res.status(400).json(error)
    }
  })


//CREATE NEW TODO (creando una tarea)

app.post ('/todos', async (req, res) => {
    try {
      const { body } = req
      // mandar info a la base de datos 
    // * INSERT INTO 
    const todo = await Todo.create(body)
    res.status(201).json(todo)
      
    } catch (error) {
      res.status(400).json(error)
      
    }
    
  })


//PUT (para actualizar nuestra tarea)
//PUT '/todos/:id
  app.put('/todos/:id', async (req, res) => {
    try {
      const {id} =req.params
      const {body} = req
      // primer obj es la informacion, segundo obj es el where
      const todo = await Todo.update(body, {
        where: {id} 
      })
      res.json(todo)
  
    } catch (error) {
      res.status(400).json(error);
    }
  })

//DELETE (eliminar una tarea por su id)
//DELETE '/todos/:id'
app.delete('/todos/:id', async (req, res) => {
    try {
      const{ id } = req.params
      await Todo.destroy({
        where: {id}
      })
      res.status(204).end() // termina la peticion
  
    } catch (error) {
      
    }
  })



//MY SERVER
app.listen(PORT, () => {
console.log(`Se esta ejecutando el servidor ${PORT}`)
})
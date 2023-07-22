require('./db/connect')
const express = require('express')
const app = express()
const tasks = require  ('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/errror-handle')

//Middleware   

app.use(express.static('./public'))
app.use(express.json())

//routes
app.get('/', (req, res)=>{
    res.status(200).send('Task Manager App...')
})
app.use('/api/v1/tasks', tasks)
app.use('/api/v1/tasks/:id', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is Listening on port ${port}` )) 
    } catch (error) {
        console.log(error);
        
    }
}

start()
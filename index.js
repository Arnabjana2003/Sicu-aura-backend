import { app } from './app.js'
import dbConnect from './db.js'
import config from './config.js'

const port = config.port

dbConnect()
.then(()=>{
    app.listen(port ||8000,()=>console.log("Server started at the post 8000"))
})
.catch(error=>{
    console.error(error)
})
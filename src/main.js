require("dotenv").config()

const express = require("express")
const {sequelize} = require("./db/models") //const db = require('./db/models');

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())

const userRoute = require('./routes/user.route');
// import postRoute from './routes/post.route.js'
// import imgRoute from './routes/postimagen.route.js'
// import commentRoute from './routes/comment.route.js'
// import tagRoute from './routes/tag.route.js'
//rutas:
app.use("/user", userRoute);
// app.use("/post", postRoute);
// app.use("/image", imgRoute);
// app.use("/comment", commentRoute);
//app.use("/tag", tagRoute)


app.listen(PORT, async(error) => {
    if(error) {
        console.error(error.message)
        process.exit(1)
    }
    console.log(`App iniciada correctamente en el puerto ${PORT}`)
    //await sequelize.sync({force: true})
})

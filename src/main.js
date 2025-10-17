const userRoute = require('./routes/user.route.js')
const postRoute = require('./routes/post.route.js')
const commentRoute = require('./routes/comment.route.js')
const tagRoute = require('./routes/tag.route.js')
const authMiddleware = require('./middlewares/authentication.js')
const authRoute = require('./routes/auth.route.js')
require("dotenv").config()

const express = require("express")
const {sequelize} = require("./db/models") //const db = require('./db/models');

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())


//rutas:
app.use('/auth', authRoute);
app.use("/user", authMiddleware, userRoute);
app.use("/post",authMiddleware, postRoute);
app.use("/comment",authMiddleware, commentRoute);
app.use("/tag",authMiddleware, tagRoute);


app.listen(PORT, async(error) => {
    if(error) {
        console.error(error.message)
        process.exit(1)
    }
    console.log(`App iniciada correctamente en el puerto ${PORT}`)
    //await sequelize.sync({force: true})
})

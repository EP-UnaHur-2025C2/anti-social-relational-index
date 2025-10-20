
const authMiddleware = require('./middlewares/authentication.js')

require("dotenv").config()

const {userRoute,postRoute, commentRoute,tagRoute , authRoute} = require("./routes/index.js")

const express = require("express")
const {sequelize} = require("./db/models") 

const app = express()

const swaggerUI = require("swagger-ui-express")
const yaml = require("js-yaml")
const fs = require("fs")
const swaggerDocumentation = yaml.load(fs.readFileSync("./swagger.yaml", "utf-8"))
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation))

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

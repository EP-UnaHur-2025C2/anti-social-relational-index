const express = require("express")
const {sequelize} = require("./db/models")

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())

app.listen(PORT, async(error) => {
    if(error) {
        console.error(error.message)
        process.exit(1)
    }
    console.log(`App iniciada correctamente en el puerto ${PORT}`)
    //await sequelize.sync({force: true})
})

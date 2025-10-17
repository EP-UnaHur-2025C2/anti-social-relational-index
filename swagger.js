const swaggerAutogen = require("swagger-autogen")

const outputFile = "./swagger.json"
const endPointsFiles = ["./src/main.js"]

const doc = {
    info:{
        title: "UnaHur Anti-Social Net",
        description: "AP inspirada en plataformas populares que permiten a los usuarios realizar publicaciones y recibir comentarios sobre las mismas."
    },
    host: "localhost:3000",
    schemes: ["http"]
}

swaggerAutogen()(outputFile, endPointsFiles, doc)
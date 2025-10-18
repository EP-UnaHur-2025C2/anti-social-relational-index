const swaggerAutogen = require("swagger-autogen")

const outputFile = "./swagger.json"
const endPointsFiles = ["./src/main.js"]

const doc = {
    info:{
        title: "UnaHur Anti-Social Net",
        description: "API inspirada en plataformas populares que permiten a los usuarios realizar publicaciones y recibir comentarios sobre las mismas."
    }
}

swaggerAutogen(outputFile, endPointsFiles, doc)
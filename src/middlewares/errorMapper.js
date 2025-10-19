const errorMapper = (error) => {
    error.details.map((e) => {
        return {
            atributo: e.path.join("."),
            detalle: e.message
        }
    })
}

module.exports = {errorMapper}
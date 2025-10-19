const errorMapper = (error) => {
    return error.details.map((e) => ({
        atributo: e.path.join("."),
        detalle: e.message
    }))
}

module.exports = {errorMapper}
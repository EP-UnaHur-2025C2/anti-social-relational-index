
const invalidId = (req, res, next) =>{
    if(req.params.id <= 0){
        return res.status(400).json({message:"Bad request: no se puede operar con un id negativo o igual a 0"})
    }

    next()
}

module.exports = {invalidId}

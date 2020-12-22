function mustBeInteger(req, res, next) {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}
// //by name 
function mustBeString(req,res, next){
    const name = req.params.name;
    if (name===""){
        res.status(400).json({message :'Name Must Be In String '})
    }
    else{
        next()
    }
}
function checkFieldsPost(req, res, next) {
    const { title, content, tags } = req.body
    if (title && content && tags) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}
module.exports = {
    mustBeInteger,
    mustBeString,
    checkFieldsPost
}
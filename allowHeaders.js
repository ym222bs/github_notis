module.exports = (req, res, next) => {
 res.header('Access-Control-Allow-Credentials', 'true')
 res.header('Access-Control-Allow-Headers', '*')
 res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
 res.header('Access-Control-Allow-Origin', '*')
 next()
}
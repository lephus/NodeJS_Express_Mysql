const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
   // throw new UnauthenticatedError('No token provided')
    res.status(401).json({ msg: 'No token provided'});
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, "projectbiatuoigialai_phu_long_deptrai_482739302893729272")
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Not authorized to access this route'});
    //throw new UnauthenticatedError('Not authorized to access this route')
  }
}

module.exports = authenticationMiddleware

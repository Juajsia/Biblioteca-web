import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
  const headerToken = req.get('authorization')
  if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
    try {
      const token = headerToken.slice(7)
      jwt.verify(token, process.env.SECRET_KEY || 'mi_llave_secreta_super_segura')
      next()
    } catch (error) {
      res.status(401).json({
        err: 'invalid token'
      })
    }
  } else {
    res.status(401).json({
      err: 'access denied'
    })
  }
}

export const validateRolToken = (type = []) => (req, res, next) => {
  const headerToken = req.get('authorization')
  const token = headerToken.slice(7)
  const payLoad = jwt.verify(token, process.env.SECRET_KEY || 'mi_llave_secreta_super_segura')
  if (type.includes(payLoad.type)) {
    next()
  } else {
    res.status(401).json({
      message: 'permissions denied'
    })
  }
}

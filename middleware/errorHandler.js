const errorHandler = (err, req, res, next) => {
  return res.status(500).json({ msg: 'something is wrong' })
}

module.exports = errorHandler

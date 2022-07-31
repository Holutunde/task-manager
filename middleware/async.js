const asyncWrap = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
      //express handling error using next method
    }
  }
}

module.exports = asyncWrap

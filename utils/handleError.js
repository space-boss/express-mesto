module.exports.handleError = (err, res, errName, errCode, errMessage) => {
    if (err.name === errName) {
      res.status(errCode).send({ message: errMessage })
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
};

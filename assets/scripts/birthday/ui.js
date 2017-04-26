'use Strict'

const onSuccessDisplayBirthdays = function (data) {
  console.log('show bdays was successful' + data)
}

const onError = function (response) {
  console.error(response)
}

module.exports = {
  onSuccessDisplayBirthdays,
  onError
}

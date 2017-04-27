'use Strict'

const birthdayStore = require('../birthdayStore')

const onSuccessDisplayBirthdays = function (data) {
  console.log('show bdays was successful' + birthdayStore.birthdayStore)
  birthdayStore.birthdayStore = data
  // next steps are to display the birthdays on the front end
  // next steps are to add a create botton so the user can add birthdays
}

const onError = function (response) {
  console.error(response)
}
const createBirthdaySuccess = function () {
  console.log('Your request was successful and returned no content')
}

module.exports = {
  onSuccessDisplayBirthdays,
  onError,
  createBirthdaySuccess
}

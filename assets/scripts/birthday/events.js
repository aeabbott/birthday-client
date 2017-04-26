'use Strict'

const birthdayApi = require('./api.js')
const birthdayUi = require('./ui.js')

// function run when show all bdays button is pressed
const displayAllBirthdays = function () {
  console.log('display all birthdays ran')
  birthdayApi.indexBirthdays()
  .then(birthdayUi.onSuccessDisplayBirthdays)
  .catch(birthdayUi.onError)
}

module.exports = {
  displayAllBirthdays
}

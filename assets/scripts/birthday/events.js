'use Strict'
const getFormFields = require(`../../../lib/get-form-fields`)
const birthdayApi = require('./api.js')
const birthdayUi = require('./ui.js')

// function run when show all bdays button is pressed
const displayAllBirthdays = function () {
  console.log('display all birthdays ran')
  birthdayApi.indexBirthdays()
  .then(birthdayUi.onSuccessDisplayBirthdays)
  .catch(birthdayUi.onError)
}

// function to display the add a birthday modal
const displayAddBirthdayModal = function (event) {
  console.log('display add birthday modal was clicked')
  event.preventDefault()
  $('#add-birthday-modal').modal({show:true})
}

// function to create birthday when save changes button is pressed in add birthday

const createNewBirthday = function (event) {
  event.preventDefault()
  console.log('save change button inside birthday modal was pressed')
  const data = getFormFields(event.target)
  const birthday = data.birthday
  console.log(data)
  if (birthday.given_name.length !== 0 && birthday.born_on.length !== 0) {
    birthdayApi.createBirthday(data)
  .then(birthdayUi.createBirthdaySuccess)
  .catch(birthdayUi.onError)
  }
}

module.exports = {
  displayAllBirthdays,
  displayAddBirthdayModal,
  createNewBirthday
}

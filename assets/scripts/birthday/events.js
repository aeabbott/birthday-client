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

// function to create birthday when save changes button is pressed inside add birthday modal

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

// function to update birthday when save changes button is pressed inside update birthday modal
const updateBirthday = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  const birthday = data.birthday
  let id = $('.update-birthday-btn').data('id')
  console.log(id, data)
  if (birthday.given_name.length !== 0 && birthday.born_on.length !== 0){
  birthdayApi.patchBirthday(id, data)
  .then(birthdayUi.onSuccessPatchBirthday)
  .catch(birthdayUi.onError)
  }
}

// hide alerts when modals are closed
const hideMessages = function () {
  $('.birthday-created-message').hide()
  $('.birthday-updated-message').hide()
}

const onClearBirthdays = function (event) {
  event.preventDefault()
  birthdayUi.clearBirthdays()
}

// get birthdays in the next 30 days
const getBirthdaysThirtyDays = function () {
  console.log('get birthdays in the next 30 days function ran')
  birthdayApi.indexBirthdays()
  .then(birthdayUi.onSuccessStats)
  .catch(birthdayUi.onError)
}

module.exports = {
  displayAllBirthdays,
  displayAddBirthdayModal,
  createNewBirthday,
  updateBirthday,
  hideMessages,
  onClearBirthdays,
  getBirthdaysThirtyDays

}

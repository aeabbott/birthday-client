'use Strict'

// link required files
const showAllBirthdaysTemplate = require('../templates/birthday-listing.handlebars')
const showOneBirthdayTemplate = require('../templates/single-birthday-list.handlebars')
const birthdayApi = require('./api.js')


// start functions- function to show all the birthdays with handlebars list
const onSuccessDisplayBirthdays = function (data) {
  console.log('show bdays was successful' + data.birthdays)
  let showAllBirthdays = showAllBirthdaysTemplate({birthdays: data.birthdays})
  // empty the handle bars list first
  $('.show-all-birthdays-content').empty()
  // show the handlebars list
  $('.show-all-birthdays-content').append(showAllBirthdays)
  // when the remove birthday button is clicked in the handle bars list
  $('.remove-birthday-btn').on('click', removeBirthday)
    // save button is pressed inside udpate birthday modal to update birthday
  $('.update-birthday-btn').on('click', displayUpdateBirthdayModal)
}

const onError = function (response) {
  console.error(response)
}

const createBirthdaySuccess = function (data) {
  console.log('Your request was successful and returned no content')
  $('#add-birthday')[0].reset()
  console.log(data.birthday)
  $('.birthday-created-message').show()
  // Add the newly created birthday to the list, when the list is already shown
  const addOneBirthday = showOneBirthdayTemplate({birthday: data.birthday})
  console.log(addOneBirthday)
  $('.show-all-birthdays-content').append(addOneBirthday)
  // when the remove birthday button is clicked in the handle bars list
  $('.remove-birthday-btn').on('click', removeBirthday)
    // save button is pressed inside udpate birthday modal to update birthday
  $('.update-birthday-btn').on('click', displayUpdateBirthdayModal)
}

// remove birthday
const removeBirthday = function (data) {
  event.preventDefault()
  console.log('remove birthday button was pressed')
  $(this).closest('ul').remove()
  let id = $(this).data('id')
  birthdayApi.destroyBirthday(id)
  .then(onSuccessRemoveBirthday)
  .catch(onError)
}

const onSuccessRemoveBirthday = function (event) {
  console.log('remove birthday successful was ran')
}

// update birthday modal
const displayUpdateBirthdayModal = function (event) {
  event.preventDefault()
  let id = $(this).data('id')
  console.log('update birthday button was pressed' + id)
  $('#update-birthday-modal').modal({show:true})
  birthdayApi.showBirthday(id)
  .then(onSuccessPreFillBirthdayFields)
  .catch(onError)
}

const onSuccessPatchBirthday = function (data) {
  console.log('patch birthday success ran', data)
  $('.birthday-updated-message').show()
}

const onSuccessPreFillBirthdayFields = function (data){
  $('#given-name-field').val(data.birthday.given_name)
  $('#family-name-field').val(data.birthday.family_name)
  $('#nickname-field').val(data.birthday.nickname)
  $('#bday').attr(data.birthday.born_on)
}

const clearBirthdays = function () {
  $('.content').empty()
}


// show # of birthdays coming up
const onSuccessStats = function (data) {
  // get current date
  const today = new Date()
  // get month and day
  // const date = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear()
  const date = today.getMonth() + 1 + '/' + today.getDate()
  // create an array of only the born_on attributes from the birthday object
  const birthdaysOnly = data.birthdays.map(function (a) { return a.born_on })
  // function to take a string and change to a date
  const birthdaysAsDates = birthdaysOnly.map(function (a) { return new Date(a) })
  // create a new array of only months and day?
  // const birthdayMonthDay = birthdaysAsDates.map(function (a) { return a.getMonth() + 1 + '-' + a.getDate() + '-' + today.getFullYear() })
  const birthdayMonthDay = birthdaysAsDates.map(function (a) { return a.getMonth() + 1 + '/' + today.getDate() })
  //  function to compare numbers
  const isComingUp = function (value) { if (value >= date) return true }
  // filter through array and create a new array of only the birthdays coming up
  const filteredBirthdays = birthdayMonthDay.filter(isComingUp)
  // count the length of the array to get the number of birthdays coming up
  const upcomingBirthdays = filteredBirthdays.length

  console.log(today)
  console.log(date)
  console.log(birthdaysOnly)
  console.log(birthdaysAsDates)
  console.log(birthdayMonthDay)
  console.log(filteredBirthdays)
  console.log(upcomingBirthdays)

}

module.exports = {
  onSuccessDisplayBirthdays,
  onError,
  createBirthdaySuccess,
  displayUpdateBirthdayModal,
  onSuccessRemoveBirthday,
  onSuccessPatchBirthday,
  clearBirthdays,
  onSuccessStats

}

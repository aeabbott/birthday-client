'use Strict'

// const birthdayStore = require('../birthdayStore')
// link required files
const showAllBirthdaysTemplate = require('../templates/birthday-listing.handlebars')
const getFormFields = require(`../../../lib/get-form-fields`)
const birthdayApi = require('./api.js')
// const todayDate = require('./getCurrentDate.js')



// start functions
const onSuccessDisplayBirthdays = function (data) {
  console.log('show bdays was successful' + data.birthdays)
  let showAllBirthdays = showAllBirthdaysTemplate({birthdays: data.birthdays})
  // empty the handle bars list first
  $('.show-all-birthdays-content').empty()
  // show the handlebars list
  $('.show-all-birthdays-content').append(showAllBirthdays)
  // when the remove birthday button is clicked in the handle bars list
  $('.remove-birthday-btn').on('click', removeBirthday)
  $('.update-birthday-btn').on('click', displayUpdateBirthdayModal)
  // save button is pressed inside udpate birthday modal to update birthday


}

const onError = function (response) {
  console.error(response)
}

const createBirthdaySuccess = function (data) {
  console.log('Your request was successful and returned no content')
  $('#add-birthday')[0].reset()
  console.log(data.birthday)
  $('.birthday-created-message').show()

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

// // show # of birthays coming up
// const onSuccessStats = function (data) {
//   // get today's month and date  and change it to a number to compare as an int
//   const today = new Date()
//   const date = today.getMonth()+1+ '-' + today.getDate()
//   const dateParse = date.replace('-', '')
//   const dateAsNumber = parseInt(dateParse, 10)
//   // Create and array of the birthdays with only the month and date as an int
//   const birthdaysOnly = data.birthdays.map(function (a) {
//     return a.born_on.substring(5, 10).replace('-', '')
//   })
//   const birthdaysAsNumbers = birthdaysOnly.map(Number)
//   // filter through new array and return the number of birthdays that within 30 days
//   function isBigger (value) { return value >= dateAsNumber}
//   const filteredBirthdays = birthdaysAsNumbers.filter(isBigger)
//   // count the filtered birthdays array to show how many birthdays are coming up
//   const upcomingBirthdays = filteredBirthdays.length
//
//   $('#birthday-stats').text('You have ' + upcomingBirthdays + ' birthdays remaining this year!')
//
//   console.log(date)
//   console.log(dateParse)
//   console.log(dateAsNumber)
//   console.log(birthdaysOnly)
//   console.log(birthdaysAsNumbers)
//   console.log(filteredBirthdays)
//   console.log(upcomingBirthdays)
//
// }


const onSuccessPreFillBirthdayFields = function (data){
  $('#given-name-field').val(data.birthday.given_name)
  $('#family-name-field').val(data.birthday.family_name)
  $('#nickname-field').val(data.birthday.nickname)
  $('#bday').val(data.birthday.born_on)
}


module.exports = {
  onSuccessDisplayBirthdays,
  onError,
  createBirthdaySuccess,
  displayUpdateBirthdayModal,
  onSuccessRemoveBirthday,
  onSuccessPatchBirthday
  // onSuccessStats

}

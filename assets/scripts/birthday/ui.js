'use Strict'

// const birthdayStore = require('../birthdayStore')
// link required files
const showAllBirthdaysTemplate = require('../templates/birthday-listing.handlebars')
const getFormFields = require(`../../../lib/get-form-fields`)
const birthdayApi = require('./api.js')

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
  $('#bday').val(data.birthday.born_on)
}

const clearBirthdays = function () {
  $('.content').empty()
}

module.exports = {
  onSuccessDisplayBirthdays,
  onError,
  createBirthdaySuccess,
  displayUpdateBirthdayModal,
  onSuccessRemoveBirthday,
  onSuccessPatchBirthday,
  clearBirthdays

}

'use Strict'

// const birthdayStore = require('../birthdayStore')
// link required files
const showAllBirthdaysTemplate = require('../templates/birthday-listing.handlebars')
const birthdayApi = require('./api.js')

// start functions
const onSuccessDisplayBirthdays = function (data) {
  console.log('show bdays was successful' + data.birthdays)
  let showAllBirthdays = showAllBirthdaysTemplate({birthdays: data.birthdays})
  // show the handlebars list
  $('.show-all-birthdays-content').append(showAllBirthdays)
  // when the remove birthday button is clicked in the handle bars list
  $('.remove-birthday-btn').on('click', removeBirthday)
}

const onError = function (response) {
  console.error(response)
}

const createBirthdaySuccess = function (data) {
  console.log('Your request was successful and returned no content')
  // I don't think I need the birthdayStore, but we'll see
  // birthdayStore.birthdayStore = data.birthday
  console.log(data.birthday)
}

const onSuccessRemoveBirthday = function (event) {
  console.log('remove birthday successful was ran')
}

const removeBirthday = function (data) {
  event.preventDefault()
  console.log('remove birthday button was pressed')
  $(this).closest('ul').remove()
  let id = $(this).data('id')
  birthdayApi.destroyBirthday(id)
  .then(onSuccessRemoveBirthday)
  .catch(onError)
}


module.exports = {
  onSuccessDisplayBirthdays,
  onError,
  createBirthdaySuccess,
  onSuccessRemoveBirthday

}

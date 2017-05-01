'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events.js')
const birthdayEvents = require('./birthday/events.js')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')

$(() => {
  authEvents.addHandlers()

  // hiding alerts on page load
  $('.acct-success-message').hide()
  $('.password-mismatch-message').hide()
  // navbar hide on page load-show after sign in
  $('.navbar').hide()
  // hiding birthday content on page load
  $('.birthday-content').hide()
  // log in and reg tab events
  $('#register-form-link').on('click', authEvents.showSignUpForm)
  $('#login-form-link').on('click', authEvents.showLogInForm)
  $('.change-pass-btn').on('click', authEvents.displayChangePassModal)
  // when show birthdays is clicked, display all the birthdays
  $('.get-all-birthdays').on('click', birthdayEvents.displayAllBirthdays)
  $('.add-birthday').on('click', birthdayEvents.displayAddBirthdayModal)
  // save button is pressed inside create birthday modal to add new birthdays
  $('#add-birthday').on('submit', birthdayEvents.createNewBirthday)
  $('#update-birthday').on('submit', birthdayEvents.updateBirthday)
  // update this later
  // $('.get-all-birthdays').on('click', birthdayEvents.getBirthdaysThirtyDays)
  // hide success & failure messages when modals are closed
  $('.cls-add-birthday-modal').on('click', birthdayEvents.hideMessages)
  $('.clear-birthdays').on('click', birthdayEvents.onClearBirthdays)
})

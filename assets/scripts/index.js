'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events.js')

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

})

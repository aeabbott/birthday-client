'use strict'
const store = require('../store')
const authEvents = require('./events')

const signUpSuccess = (data) => {
  console.log(data)
  $('.acct-success-message').show()
  $('.password-mismatch-message').hide()
  // authEvents.showLogInForm()
  $('#register-form')[0].reset()
  $('#login-form').show()
  $('#register-form').hide()
  $('#register-form-link').removeClass('active')

}

const signUpFailure = (error) => {
  console.error(error)
  $('.password-mismatch-message').show()
  }

  const signInSuccess = (data) => {
    console.log('signIn success ran data is:', data)
    store.user = data.user
  $('.login-signup-container').hide()
  $('.password-wrong-message').hide()
  $('.password-mismatch-message').hide()
  $('.acct-success-message').hide()
  $('.birthday-content').show()
  $('.navbar').show()
  $('#login-form')[0].reset()
  $('.birthday-created-message').hide()
  $('.birthday-updated-message').hide()
  $('.pass-success-message').hide()
  $('.old-password-mismatch-message').hide()
  }

  const signInFailure = (error) => {
  // console.error('signIn failed ran data is:', error)
  $('.password-mismatch-message').show()
}

const changePasswordSuccess = (data) => {
  console.log('changePassword was successful and data is:', data)
  $('.old-password-mismatch-message').hide()
  $('.pass-success-message').show()

}

const changePasswordFailure = (error) => {
  console.error('changePassword failed failed ran data is:', error)
  $('.old-password-mismatch-message').show()
}

const signOutSuccess = (data) => {
  store.user = null
  $('.login-signup-container').show()
  $('.birthday-content').hide()
  $('.navbar').hide()
  $('.birthdays-list').hide()
  $('#birthday-stats').hide()

}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess
}

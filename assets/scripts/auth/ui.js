'use strict'
const store = require('../store')
const authEvents = require('./events')

const signUpSuccess = (data) => {
  console.log(data)
  $('acct-success-message').show()
  $('.password-mismatch-message').hide()
  authEvents.showLogInForm()
}

const signUpFailure = (error) => {
  $('.password-mismatch-message').show()
  }

  const signInSuccess = (data) => {
    // console.log('signIn success ran data is:', data)
    store.user = data.user
  $('.login-signup-container').hide()
  $('.password-wrong-message').hide()
  $('.password-mismatch-message').hide()
  $('acct-success-message').hide()
  $('.birthday-content').show()
  $('.navbar').show()
  }

  const signInFailure = (error) => {
  // console.error('signIn failed ran data is:', error)
  $('.password-wrong-message').show()
}

const changePasswordSuccess = (data) => {
  console.log('changePassword was successful and data is:', data)
  store.user = data.user
}

const changePasswordFailure = (error) => {
  console.error('changePassword failed failed ran data is:', error)
}


module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure
}

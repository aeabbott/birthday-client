'use Strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  console.log('sign up ran')
  // this is pointing to the event.target
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const showSignUpForm = function (event) {
  event.preventDefault()
  // switch to show the sign up form content when header tab is clicked
  console.log ('Sign up tab header was clicked')
  	$("#login-form").hide()
  	$("#register-form").show()
    $('#login-form-link').removeClass('active')
    $(this).addClass('active')

}

const onSignIn = function (event) {
  event.preventDefault()
  // console.log('sign in ran')
  const data = getFormFields(this)
  api.signIn(data)
  .then(ui.signInSuccess)
  .catch(ui.signInFailure)
}

const showLogInForm = function (event) {
  event.preventDefault()
  // switch to show the log in form content when header tab is clicked
  console.log ('Log in tab header was clicked')
  	$("#login-form").show()
  	$("#register-form").hide()
    $('#register-form-link').removeClass('active')
    $(this).addClass('active');
}

const addHandlers = () => {
  $('#login-form').on('submit', onSignIn)
  $('#register-form').on('submit', onSignUp)
}

module.exports = {
  addHandlers,
  showSignUpForm,
  showLogInForm
}

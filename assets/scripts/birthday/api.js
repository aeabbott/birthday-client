const config = require('../config')
const store = require('../store')

// show all birthdays
const indexBirthdays = function () {
  return $.ajax({
    url: config.apiOrigin + '/birthdays',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// get one birthday
const showBirthday = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/birthdays/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// create one birthday
const createBirthday = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/birthdays/',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const destroyBirthday = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/birthdays/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const patchBirthday = function (id, data) {
  return $.ajax({
    url: config.apiOrigin + '/birthdays/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  indexBirthdays,
  showBirthday,
  createBirthday,
  destroyBirthday,
  patchBirthday
}

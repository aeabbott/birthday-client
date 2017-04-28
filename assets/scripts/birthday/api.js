const config = require('../config')
const store = require('../store')


const indexBirthdays = function () {
  return $.ajax({
    url: config.apiOrigin + '/birthdays',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

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

module.exports = {
  indexBirthdays,
  createBirthday,
  destroyBirthday
}

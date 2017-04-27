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

module.exports = {
  indexBirthdays,
  createBirthday
}

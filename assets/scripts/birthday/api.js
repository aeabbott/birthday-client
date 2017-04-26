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


module.exports = {
  indexBirthdays
}

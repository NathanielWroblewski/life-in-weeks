namespace('Life.Views')

var VALID_DATE = /^(\d{1,2}).(\d{1,2}).(\d{4})$/,
    VALID_EXPECTANCY = /^\d{1,2}$/

Life.Views.Form = function(config) {
  this.el = config.el

  this._on = {
    change: null
  }

  this.initialize = function() {
    this.setListeners()
  }

  this.setListeners = function() {
    var birthdate  = this.el.querySelector('.field:first-of-type'),
        expectancy = this.el.querySelector('.field:last-of-type')

    birthdate.addEventListener('keyup', this.setBirthdate.bind(this))
    expectancy.addEventListener('keyup', this.setExpectancy.bind(this))
  }

  this.setBirthdate = function(e) {
    if (this.validDate(e.currentTarget.value)) {
      this.trigger('change', {
        dob: e.currentTarget.value.substring(0, 10)
      })
    }
  }

  this.setExpectancy = function(e) {
    if (VALID_EXPECTANCY.test(e.currentTarget.value)) {
      this.trigger('change', {
        expectancy: e.currentTarget.value.substring(0, 2)
      })
    }
  }

  this.validDate = function(date) {
    if (VALID_DATE.test(date)) {
      var match = date.match(VALID_DATE),
          month = parseInt(match[1], 10),
          day   = parseInt(match[2], 10),
          year  = parseInt(match[3], 10)

      return (
        month > 0 && month < 13 && day > 0 && day < 32 && year > 0 && year < 3000
      )
    }
    return false
  }

  this.trigger = function(event, details) {
    this._on[event](details)
  }

  this.on = function(event, callback) {
    this._on[event] = callback
  }

  this.initialize()
}

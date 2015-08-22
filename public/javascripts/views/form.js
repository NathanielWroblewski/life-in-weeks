namespace('Life.Views')

var VALID_DATE = /^\d{1,2}.\d{1,2}.\d{4}$/,
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
    if (VALID_DATE.test(e.currentTarget.value)) {
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

  this.trigger = function(event, details) {
    this._on[event](details)
  }

  this.on = function(event, callback) {
    this._on[event] = callback
  }

  this.initialize()
}

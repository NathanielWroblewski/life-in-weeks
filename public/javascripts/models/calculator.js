namespace('Life.Models')

var WEEKS_IN_A_YEAR = 52,
    DATE_PATTERN = /(\d{4}).(\d{2}).(\d{2}).*/

Life.Models.Calculator = function(config) {
  this.dob = new Date(config.dob)
  this.now = new Date()
  this.expectancy = config.expectancy
  this.calendar = []

  this._on = {
    change: null
  }

  this.generateCalendar = function() {
    this.calendar = []

    for (var i = 0; i < WEEKS_IN_A_YEAR * this.expectancy; i++) {
      var dateInTime = new Date(this.dob.getTime())
      dateInTime.setDate(this.dob.getDate() + (7 * i))

      this.calendar.push({
        date:    dateInTime.toJSON().replace(DATE_PATTERN, '$2-$3-$1'),
        elapsed: dateInTime.getTime() < this.now.getTime(),
        age:     dateInTime.getYear() - this.dob.getYear()
      })
    }
  }

  this.set = function(details) {
    if (details.dob)        this.dob = new Date(details.dob)
    if (details.expectancy) this.expectancy = details.expectancy
    this.generateCalendar()
    this.trigger('change')
  }

  this.toJSON = function() {
    return this.calendar
  }

  this.trigger = function(event, details) {
    this._on[event](details)
  }

  this.on = function(event, callback) {
    this._on[event] = callback
  }
}

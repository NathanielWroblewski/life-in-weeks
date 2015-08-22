!function() {
  var DEFAULT_BDAY = '07/07/1986',
      DEFAULT_LIFE_EXPECTANCY = 90

  var calculator = new Life.Models.Calculator({})

  var calendar = new Life.Views.Calendar({
    el: document.querySelector('.life'),
    model: calculator
  })

  calculator.set({
    dob: DEFAULT_BDAY,
    expectancy: DEFAULT_LIFE_EXPECTANCY
  })

  var tooltip = new Life.Views.Tooltip({
    el: document.querySelector('.tooltip-container'),
    view: calendar
  })

  calendar.setListeners()

  var form = new Life.Views.Form({
    el: document.querySelector('.form')
  })

  form.on('change', function(details) {
    calculator.set(details)
    if (details.dob) {
      document.querySelector('.date').innerHTML = details.dob
    } else {
      document.querySelector('.expectancy').innerHTML = details.expectancy
    }
  })
}()

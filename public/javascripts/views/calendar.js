namespace('Life.Views')

Life.Views.Calendar = function(config) {
  this.el = config.el
  this.model = config.model

  this._on = {
    mouseover: null
  }

  this.initialize = function() {
    this.model.on('change', function() {
      this.render()
      this.setListeners()
    }.bind(this))
  }

  this.setListeners = function() {
    var weeks = this.el.querySelectorAll('div')

    for (var i = 0; i < weeks.length; i++) {
      (function(node) {
        node.addEventListener('mouseenter', this.handleMouseOver.bind(this))
        node.addEventListener('mouseleave', this.handleMouseOver.bind(this))
      }.bind(this))(weeks[i])
    }
  }

  this.handleMouseOver = function(event) {
    this.trigger('mouseover', {
      x:     event.pageX,
      y:     event.pageY,
      hover: event.type === 'mouseenter',
      date:  event.currentTarget.dataset.date,
      age:   event.currentTarget.dataset.age
    })
  }

  this.template = function(days) {
    var html = ''

    for (var i = 0; i < days.length; i++) {
      var className = days[i].elapsed ? 'elapsed' : 'remaining',
          date = days[i].date,
          age  = days[i].age

      html += '<div class="' + className + '" ' +
        'data-date="' + date + '" data-age="' + age + '"></div>'
    }
    return html
  }

  this.render = function() {
    this.el.innerHTML = this.template(this.model.toJSON())
  }

  this.on = function(event, callback) {
    this._on[event] = callback
  }

  this.trigger = function(event, details) {
    this._on[event](details)
  }

  this.initialize()
}

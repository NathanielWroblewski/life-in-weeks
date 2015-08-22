namespace('Life.Views')

Life.Views.Tooltip = function(config) {
  this.el = config.el
  this.view = config.view

  this.initialize = function() {
    this.setListeners()
  }

  this.setListeners = function() {
    this.view.on('mouseover', this.render.bind(this))
  }

  this.template = function(details) {
    return(
      '<p>' +
        '<span class="date">' + details.date + '</span>' +
        details.age + ' years old' +
      '</p>'
    )
  }

  this.render = function(details) {
    this.el.style.top  = details.y - 48 + 'px'
    this.el.style.left = details.x + 25 + 'px'
    this.el.style.visibility = (details.hover ? 'visible' : 'hidden')

    this.el.querySelector('.tooltip').innerHTML = this.template(details)
  }

  this.initialize()
}

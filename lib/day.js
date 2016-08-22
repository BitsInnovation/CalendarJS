DAYS_OF_WEEK = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

function Day(year, month, day) {
  this.events = []
  this.opens  = []
  this.date = new Date(year, month, day)

}

Day.prototype.drawDay = function (context) {
  var header = "<div id='day'>"+ (this.date.getMonth()+1) + "/" + this.date.getDate() + "/" + this.date.getFullYear() +"<div id='increments'>"
  var startIncrement = context.settings.startTime
  var endIncrement = context.settings.endTime
  var numberOfIncrements = (endIncrement - startIncrement) * context.settings.timeIncrementsPerHour
  for (var i = 0; i < numberOfIncrements; i++) {
    header += "<div id='time' data-increment='"+ (startIncrement + i) +"'></div>"
  }
  header += "</div></div>"
  return header
};

Day.prototype.importEvents = function (events) {
  this.events = events
}

Day.prototype.importOpens = function (opens) {
  this.opens = opens
}

Day.prototype.addEvent = function (event) {
  this.events.push(event)
}

Day.prototype.removeEvent = function (event) {
  var self = this
  self.events.forEach(function(ev, i) {
    if (ev.start === event.start) {
      self.events.splice(i, 1)
    }
  })
}

Day.prototype.addOpen = function (open) {
  this.opens.push(open)
}

Day.prototype.removeOpen = function (open) {
  var self = this
  self.opens.forEach(function(op, i) {
    if (op.start === open.start) {
      self.opens.splice(i, 1)
    }
  })
}

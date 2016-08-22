CALENDAR_TYPES = {"WEEK":  0,
                  "DAY":   1,
                  "MONTH": 2}

function Calendar(options) {
  this.settings = options || {
    calendarHeight: 1000,
    calendarWidth: 500,
    calendarType: CALENDAR_TYPES.WEEK,

    // WEEK CALENDAR SETTINGS
    defaultDaysToDisplay: 3,

    // AJAX-y CONFIGURATIONS
      ajaxUrl: "./sample.json"

  }

  this.days = []

  this.setupCalendar()
}

Calendar.prototype.drawCalendar = function () {

}

Calendar.prototype.setupCalendar = function (start) {
  this.days = []
  if (this.settings.calendarType === CALENDAR_TYPES.WEEK) {
    var daysToDisplay = this.settings.defaultDaysToDisplay
    var start = start || new Date()
    for (var i = 0; i < daysToDisplay; i++) {
      this.days.push(new Day(start.getFullYear(), start.getMonth(), start.getDate()+i))
    }
  }
  this.retrieveCalendar()
}

Calendar.prototype.changeDefaultDaysToDisplay = function (daysToDisplay) {
  this.settings.defaultDaysToDisplay = daysToDisplay
  this.setupCalendar(this.days[0].date)
}

Calendar.prototype.nextPage = function () {
  var daysToDisplay = this.settings.defaultDaysToDisplay
  var lastDay = this.days[daysToDisplay-1].date
  var nextPageStartDate = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate()+1)
  this.setupCalendar(nextPageStartDate)
}

Calendar.prototype.prevPage = function () {
  var daysToDisplay = this.settings.defaultDaysToDisplay
  var lastDay = this.days[0].date
  var prevPageStartDate = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate()-daysToDisplay)
  this.setupCalendar(prevPageStartDate)
}

Calendar.prototype.retrieveCalendar = function () {
  var start = this.days[0].date.getTime()
  var end   = this.days[this.settings.defaultDaysToDisplay-1].date.getTime()
  var url = this.settings.ajaxUrl+"?start="+start+"&end="+end
  $.getJSON(url, function(data) {
    console.log(data)
  })
}

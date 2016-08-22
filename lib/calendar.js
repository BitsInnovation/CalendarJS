CALENDAR_TYPES = {"WEEK":  0,
                  "DAY":   1,
                  "MONTH": 2}

function Calendar(element, options) {
  this.settings = options || {
    calendarHeight: 1000,
    calendarWidth: 500,
    calendarType: CALENDAR_TYPES.WEEK,

    // WEEK CALENDAR SETTINGS
    defaultDaysToDisplay: 3,
    timeIncrements: 0.5,
    startTime: 7,
    endTime: 19,

    // MONTH CALENDAR SETTINGS

    // AJAX-y CONFIGURATIONS
    ajaxUrl: "./sample.json",

    htmlElement: element,
  }

  this.days = []

  this.setupCalendar()
}

Calendar.prototype.draw = function () {
  var self = this
  var calendarElement = this.settings.htmlElement
  calendarElement.html("")

  calendarElement.append("<button id='prevCalendar'><</button><button id='home'>Home</button><button id='nextCalendar'>></button>")

  $('#prevCalendar').on("click", function() {
    self.prevPage()
    self.draw()
  })

  $('#nextCalendar').on("click", function () {
    self.nextPage()
    self.draw()
  })

  $('#home').on("click", function() {
    self.setupCalendar()
    self.draw()
  })

  this.days.forEach(function(day) {
    calendarElement.append(day.drawDay())
  })
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
    // Do nothing right now.
  })
}

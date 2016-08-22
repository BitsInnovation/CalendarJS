// Create an event using either of these:
// new Event("Title", "8/23/2016 3:30 PM", "8/23/2016 4:30 PM")
// new Event("Title", 1471980600000, 1471984200000)
function Event(title, start, end) {
  if (typeof(start) === 'number' || typeof(start) === 'string') {
    this.start = new Date(start)
  } else {
    this.start = start
  }

  if (typeof(end) === 'number' || typeof(end) === 'string') {
    this.end = new Date(end)
  } else {
    this.end = end
  }

  this.title = title
}

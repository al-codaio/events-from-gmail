// Create Google Calendar events from sending an email in Gmail
// Author: Al Chen (al@coda.io)
// Last Updated: September 3rd, 2021
// See full writeup here: TBD

//////////////// Setup and global variables ////////////////////////////////

GMAIL_LABEL = 'EventsFromEmail'
DEFAULT_EVENT_TIME = 30
DATE_FORMAT = 'ROW' // US (m/d/y) or ROW (d/m/y)

//////////////////////////////////////////////////////////////////////////// 

function getEmail() {
  var label = GmailApp.getUserLabelByName(GMAIL_LABEL);
  var threads = label.getThreads();
  
  // Only create events for unread messages in the GMAIL_LABEL
  for (var i = 0; i < threads.length; i++) {    
    if (threads[i].isUnread()) {
      var emailSubject = threads[i].getFirstMessageSubject()
      var emailMessage = threads[i].getMessages()[0].getPlainBody()
      var [eventTitle, startTime, endTime, isAllDay, optionalParams] = parseEmail(emailSubject, emailMessage)  
      createEvent(eventTitle, startTime, endTime, isAllDay, optionalParams) 
      threads[i].markRead()
    } 
  }
}

function parseEmail(subject, message) {
  var eventDetails = []
  eventDetails = subject.split(",")

  // Decide if event is all-day based on if there is a time
  var allDay = eventDetails[2] ? false : true

  // Convert dates/times into useable format
  var [startTime, endTime, isAllDay] = calcDateTime(eventDetails[1], eventDetails[2] ? eventDetails[2] : '' , allDay)
  
  // Optional params in event: 0 = emails, 1 = description
  var lines = message.split(/\r?\n/)
  var [guests, description] = parseMessage(lines)  
  if (guests != '' || description != '') {
    var optionalParams = {guests: guests, description: description}
  }
  return [eventDetails[0], startTime, endTime, isAllDay, optionalParams]  
}

// Parse body of email for cc: and event description
function parseMessage(lines) {
  if (lines[0].toLowerCase().indexOf('cc:') != -1) {
    var guests = lines[0].substring(3, lines[0].length)
    var description = lines[1].length > 1 ? lines[1] : ''
  } else {
    var guests = ''
    var description = lines[0]    
  }
  return [guests, description]
}

function createEvent(eventTitle, startTime, endTime, isAllDay, optionalParams) {
  var calPayload
  
  // For single-day events don't need an end date
  if (startTime == endTime) {
    calPayload = [eventTitle, startTime, ,optionalParams]  
  } else {
    calPayload = [eventTitle, startTime, endTime, optionalParams]
  }
  
  if (isAllDay) {
    var event = CalendarApp.getDefaultCalendar().createAllDayEvent(...calPayload)
  } else {
    var event = CalendarApp.getDefaultCalendar().createEvent(...calPayload)
  }
  Logger.log('Event Added: ' + eventTitle + ', ' + startTime + '(ID: ' + event.getId() + ')');
}

function calcDateTime(rawDate, rawTime, isAllDay) {
  var dashModifierIndex = rawDate.indexOf("-")
  var isMultiDay = dashModifierIndex == -1 ? false : true 
  
  // Get time if event is not an all-day event
  if (isAllDay == false && isMultiDay == false) {
    var [month, day, year] = parseDate(rawDate)
    var [hours, minutes] = convertTime12to24(rawTime)
    var newDateStart = new Date(year, month - 1, day, hours, minutes)
    var newDateEnd = new Date(newDateStart)
    newDateEnd.setMinutes(newDateStart.getMinutes() + DEFAULT_EVENT_TIME)
  }  else {
    // Set start and end date if event is multi-day
    if (isMultiDay) {
      var startDate = rawDate.substring(0, dashModifierIndex)
      var endDate = rawDate.substring(dashModifierIndex + 1, rawDate.length)
      var [startMonth, startDay, startYear] = parseDate(startDate)
      var [endMonth, endDay, endYear] = parseDate(endDate) 
      var newDateStart = new Date(startYear, startMonth - 1, startDay)
      var newDateEnd = new Date(endYear, endMonth - 1, endDay)
      isAllDay = true
    } else {
      var [month, day, year] = parseDate(rawDate)
      var newDateStart = newDateEnd = new Date(year, month - 1, day)
    }    
  }
  return [newDateStart, newDateEnd, isAllDay]
}

// Get month, day, year from date with slash
function parseDate(date) {
  var dateDetails = date.split("/")  
  
  // US or ROW date format
  if (DATE_FORMAT == 'US') {
    var month = parseInt(dateDetails[0].trim())
    var day = parseInt(dateDetails[1].trim())  
  } else {
    var month = parseInt(dateDetails[1].trim())
    var day = parseInt(dateDetails[0].trim())
  }  
  var year = dateDetails[2] ? parseInt(dateDetails[2].trim()) : 2021  
  return [month, day, year]
}

// Convert AM/PM to 24-hour time
const convertTime12to24 = (time12h) => {
  var upperCaseTime = time12h.toUpperCase()
  
  // Figure out if time contains AM or PM 
  if (upperCaseTime.indexOf("AM") != -1) {
    var index = upperCaseTime.indexOf("AM")
  } else {
    var index = upperCaseTime.indexOf("PM")
  }
   
  // Get time and modifier (AM/PM) based on position of modifier
  var newTime = upperCaseTime.substring(0, index)
  var modifier = upperCaseTime.substring(index, index + 2)
  
  // Get hours/minutes depending on if there is a : in time
  if (upperCaseTime.indexOf(':') != -1) {
    var [hours, minutes] = newTime.split(':');
  } else {
    var [hours, minutes] = [newTime, 0]
  }  
  if (hours === '12') { hours = '00' }
  if (modifier === 'PM') { hours = parseInt(hours, 10) + 12 }
  return [hours, minutes];
}
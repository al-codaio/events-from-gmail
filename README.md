# Create Google Calendar events from sending yourself an email using Google Apps Script
This [Google Apps Script](https://github.com/al-codaio/events-from-gmail/blob/main/create_gcal_events_from_gmail.js) allows you to create a Google Calendar event by sending yourself an email in Gmail. Unlike Gmail's [current feature](https://support.google.com/a/users/answer/9308677?hl=en) to create Google Calendar events, this script allows you to be on a mobile device.

## What this script does
You send yourself an email that looks like this:

<img src="https://p-ZmF7dQ.b0.n0.cdn.getcloudapp.com/items/6quYvLG8/434c5fbe-7f8c-48c0-9d2a-44279740c055.jpg?v=c70b5fc03f9b56a2a20d596e31b6d395" alt="send yourself an email with google calendar details" width="500"/>

...and a Google Calendar event gets created with all the relevant fields filled out:

<img src="https://p-ZmF7dQ.b0.n0.cdn.getcloudapp.com/items/KouJ7e9P/cec04cf3-a71f-48ef-9a0d-5d2267698540.jpg?v=ec03c345de716c37a60dc594b2caaf62" alt="create google calendar event from email" width="700"/>

## Writing the email
The only required content you need to include in the email is the subject line. The minimum info you need is the event title and the date (separated by a comma). Some examples on what you could write in the subject line:
- `Schedule appointment, 9/3, 3PM`: An event with the title "Schedule appointment" gets created on September 3rd at 3:00PM
- `Schedule appointment, 9/3`: An all-day event with the title "Schedule appointment" gets created on September 3rd
- `Schedule appointment, 9/3-9/5`: A multi-day event with the title "Schedule appointment" gets created from September 3rd to September 5th

### Optional fields in event
If you want to invite guests to your event and know their email addresses, you simply write "cc: johndoe@gmail.com, janedoe@gmail.com" as the first line in the body of the email (multiple emails need to be separated by a comma). To add a description to the event, just write the description in the second line of the email. So if the body of your email looks like this:

```
cc: johndoe@gmail.com, janedoe@gmail.com
Need to schedule an appointment with John and Jane
```

The Google Calendar event will invite johndoe@gmail.com and janedoe@gmai.com as guests to your event and "Need to schedule an appointment with John and Jane" gets added to the descriptoin of the event.

## Setup 

## Notes
- If you add a time for the event in the subject line, it needs to have "AM" or PM" appended to the time
- Events get created based on the timezone setting of your Google Apps Script (which defaults to the timezone of your computer)

## Tutorials
Read the full write-up [here](http://www.tbd.com) on why I wrote this script and watch the video tutorial below to setup the script:

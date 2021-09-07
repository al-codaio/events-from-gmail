# Create Google Calendar events from sending yourself an email
This [Google Apps Script](https://github.com/al-codaio/events-from-gmail/blob/main/create_gcal_events_from_gmail.js) allows you to create a Google Calendar event by sending yourself an email in Gmail. Unlike Gmail's [current feature](https://support.google.com/a/users/answer/9308677?hl=en) to create Google Calendar events, this script allows you to be on a mobile device.

## What this script does
You send yourself an email that looks like this:

<img src="https://p-ZmF7dQ.b0.n0.cdn.getcloudapp.com/items/6quYvLG8/434c5fbe-7f8c-48c0-9d2a-44279740c055.jpg?v=c70b5fc03f9b56a2a20d596e31b6d395" alt="send yourself an email with google calendar details" width="500"/>

...and a Google Calendar event gets created with all the relevant fields filled out:

<img src="https://p-ZmF7dQ.b0.n0.cdn.getcloudapp.com/items/KouJ7e9P/cec04cf3-a71f-48ef-9a0d-5d2267698540.jpg?v=ec03c345de716c37a60dc594b2caaf62" alt="create google calendar event from email" width="700"/>

### Main features
- Switch between U.S. (m/d/y) and non-U.S. (d/m/y) date formats in the subject line of your email
- Create all-day and multi-day events
- Invite guests and add to the description of the event by writing in the body of the email (see [Optional fields in event](https://github.com/al-codaio/events-from-gmail#optional-fields-in-event) below)

## Formatting the email 
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
1. Create a new [Google Apps Script](https://www.script.google.com) project and replace the default code in the editor with the [script](https://github.com/al-codaio/events-from-gmail/blob/main/create_gcal_events_from_gmail.js). Hit ⌘+S to save the script.
2. Create a Gmail label called "EventsFromEmail" (this is the `GMAIL_LABEL` variable in [line 8](https://github.com/al-codaio/events-from-gmail/blob/main/create_gcal_events_from_gmail.js#L8)). If you call the label something else, just make sure to change this line of the script.
3. The `DEFAULT_EVENT_TIME` in [line 9](https://github.com/al-codaio/events-from-gmail/blob/main/create_gcal_events_from_gmail.js#L9) is 30 minutes (change if necessary). Also decide if your date format is "US" or "ROW" (rest of the world) in [line 10](https://github.com/al-codaio/events-from-gmail/blob/main/create_gcal_events_from_gmail.js#L10).
4. Setup a Gmail filter so that all emails you send to yourself automatically get labeled "EventsFromEmail" and skip the inbox (but still stay unread). The recipient email address should use the [+ trick](https://support.google.com/a/users/answer/9308648?hl=en) in Gmail to setup your Gmail filter. For instance, I set up a filter so that all emails sent to "al+cal@coda.io" go to my "EventsFromEmail" label:
<img src="https://p-ZmF7dQ.b0.n0.cdn.getcloudapp.com/items/5zuNLqe4/895e3aa4-6016-41c7-95a8-fc22ac56a646.jpg?v=dacea20230a5893e3d7d5fb4c1370b1a" width="500"/>

5. Send yourself a test email to make sure the filter works correctly and the email shows up in your "EventsFromEmail" label.
6. Back in Google Apps Script, select the `getEmail` function in the toolbar and click "Run" to run the script for the first time.
7. Click "Allow" when asked to give Google Apps Script permission to access your Gmail and Google Calendar.
8. You may get a screen saying Google hasn't verified the app. Click "Advanced" and click the link to continue to use the script:
<img src="https://user-images.githubusercontent.com/1314187/132148655-ed9f5737-7fa7-4849-ba7e-185d2ca48662.jpg" width="500"/>

9. Set up a [time-driven trigger](https://developers.google.com/apps-script/guides/triggers/installable#time-driven_triggers) so that the `getEmail` function runs every 10 minutes, 30 minutes, or whatever interval suits you (I set mine to every 15 minutes):
<img src="https://user-images.githubusercontent.com/1314187/132265012-e5b62b75-a2a5-4999-9fc1-5569a9217eae.jpg" width="300"/>
<img src="https://user-images.githubusercontent.com/1314187/132148877-2cd34e96-553c-405f-b87d-d9999bd9f86e.jpg" width="500"/>

## Notes & Caveats
- If you add a time for the event in the subject line, it needs to have "AM" or PM" appended to the time
- Events get created based on the timezone setting of your Google Apps Script (which defaults to the timezone of your computer)
- If you change timezones, you may need to [update](https://developers.google.com/apps-script/concepts/manifests#editing_a_manifest) the `appscript.json` file with the new timezone you're in. See this [Wikipedia article](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (specifically the "TZ database name" column) for the proper formatting of timezone names.

## Tutorials
Read the full write-up [here](https://www.thekeycuts.com/dear-analyst-76-productivity-hack-for-creating-a-google-calendar-event-by-sending-yourself-an-email) on why I wrote this script and watch the video tutorial below to setup the script:

[![create google calendar events from gmail](https://user-images.githubusercontent.com/1314187/132382848-4b6baa2e-6d9e-4efe-8e04-94f8e5b0d279.png)](https://www.youtube.com/watch?v=DbbT0zPGzVY)

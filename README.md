# Fix App

This React Native app scans a device for security or privacy flaws, and reports the status of a scan to a specfied Elasticsearch index.

Currently tested is:

- Is the device jail broken?
- Is there a passcode/fingerprint enabled on the device?
- Is location services enabled?
- Is bluetooth enabled?

Some other information sent to Elasticsearch are:

- UUID of device
- What platform (Android, iOS, Windows...)
- What is the OS version?
- Timestamp of scan performed

The user can scan as many times as they like, but data is reported to the index a maximum of once per day.

# Screenshots

## Android

![Android Results](docs/images/AndroidResults.png)

## iPhone

![iPhone Results](docs/images/iOSResults.png)

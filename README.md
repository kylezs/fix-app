# Fix App
This React Native app "scans" a device for security or privacy flaws, and reports the status of a scan to a specfied Elasticsearch index.

Currently tested is:
- Is the device jail broken?
- Is there a passcode/fingerprint enabled on the device?
- Is location services on?
- What is the OS version?

Some other information sent to Elasticsearch are:
- UUID of device
- What platform (Android, iOS, Windows...)
- Timestamp of scan performed
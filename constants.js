export const SCAN_SCREEN = "Scan";
export const RESULTS_SCREEN = "Results";
export const SETTINGS_SCREEN = "Settings";
// contains the scan and results stack screen
export const HOME_SCREEN = "Home";

// These should not be made into a pass or fail, nor should they be coloured
export const METADATA_LIST = [
  "UUID",
  "@timestamp",
  "platform",
  "version",
  "email",
];

export const METADATA_KEY_TO_DISPLAY = {
  UUID: "Device UUUID",
  "@timestamp": "Time of scan",
  platform: "Platform",
  version: "Operating system version",
  email: "Your account email",
};

// Translate the keys sent to the backend, to a better display for the user
export const RESULT_KEY_TO_DISPLAY = {
  isNotJailBroken: "Your device should not be jail broken",
  pinOrFingerPrintPass:
    "Your device should have a pin and/or fingerprint enabled",
  locationServicesPass:
    "Location services should be off if you are not using them",
  bluetoothPass: "Bluetooth should be off if you are not using it",
};

import { decode, encode } from "base-64";
import { registerRootComponent } from "expo";
import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

// Fix [ReferenceError: Can't find variable: btoa]
// which appears when running in XCode / on iPhone
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a
// native build, the environment is set up appropriately
registerRootComponent(App);

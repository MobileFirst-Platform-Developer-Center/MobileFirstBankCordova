IBM MobileFirst Platform Foundation
===
## MobileFirstBanking
A sample application demonstrating how to instrument an IBM MobileFirst application to gather analytics information regarding user behavior and device information.

### Usage

1. From a command-line window, navigate to the project's root folder and run the commands:
  - Add a platform: `cordova platform add`
  - Register the application: `mfpdev app register`
2. Use either Maven, MobileFirst CLI or your IDE of choice to build and deploy the available [`MobileFirstBankAdapter`](https://github.com/MobileFirst-Platform-Developer-Center/MobileFirstBankAdapter/tree/release80) and []`MobileFirstBankAuthAdapter`](https://github.com/MobileFirst-Platform-Developer-Center/MobileFirstBankAuthAdapter/tree/release80) adapters.
3. In the MobileFirst console, under **Applications** → **MobileFirstBank** → **Security** → **Map scope elements to security checks**, add a mapping from `restricted` to `MobileFirstBankUserLogin`.
4. Back in the command-line, run the Cordova application by running the `cordova run` command.

### Supported Levels
IBM MobileFirst Platform Foundation 8.0

### License
Copyright 2016 IBM Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

<!-- ABOUT THE PROJECT -->
## About The Project
You can use application to write down, and editable debts your friends in very simple i fast way.

Appliaction work on ios and android system.

<!-- BUILD WITH -->
## Build With
<ul>
  <li><a href="#built-with">React Native</a></li>
  <li><a href="#built-with">Expo</a></li>
</ul>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

* node - https://nodejs.org/en/download/

* react native - https://www.npmjs.com/package/react-native

* expo - https://docs.expo.io/get-started/installation/

* optional xcode - https://apps.apple.com/pl/app/xcode/id497799835?l=pl&mt=12

* optional android studio - https://developer.android.com/studio

  

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/sebastiangolab/zeszycik.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Install Yarn packages
   ```sh
   yarn install
   ```
4. Rebuild ios and android folders
   ```sh
   expo eject
   ```
5. Optional you check
   ```sh
   npx @react-native-community/cli doctor
   ```

#### On IOS

If you want run application on IOS, you must follow additional steps:

1. Run pod install on ios
   ```sh
   npx pod-install ios
   ```
2. Init bundle
   ```sh
   react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios
   ```


<!-- CONTACT -->
## Contact

Sebastian Gołąb - sebagolab97@gmail.com

Project Link: https://github.com/sebastiangolab/zeszycik.git





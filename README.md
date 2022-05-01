# Auction App for Art Galleries

This repository contains one component:

* the **mobile client**, which provides a client for users to review galleries and bid on artworks.

This document aims to give an overview about the techstack. In addition, the reader gets to know how to install and setup a local development environment.

# Related repositories

* the **server** ([respository](https://github.com/barisarabasuren/auction_app_server))

### High-Level Overview
![Architecture](./architecture.jpeg?raw=true)

# Mobile Client

### Techstack
The entire mobile application of auction app is written using:
- [react-native](https://create-react-app.dev/)

Extra libraries used were:
- [react-native-paper](https://reactnativepaper.com/)
- [expo](https://docs.expo.dev/)
- [react-native-countdown-component](https://www.npmjs.com/package/react-native-countdown-component)
- [react-navigation](https://reactnavigation.org/)

### Installation
Requirements:
* [node.js](https://nodejs.org/en/)
* [xcode](https://developer.apple.com/xcode/)
* [android studio](https://developer.android.com/studio)

```zsh
git clone https://github.com/barisarabasuren/auction_app_mobile
cd ./auction_app_mobile
npm install
npm run ios
```

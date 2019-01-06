# Turtle Movie Chat

## How to run

First, clone the project in the chosen directory and run `yarn install && react-native link`. If you're planning to run on iOs enter ios folder using `cd ios` and install all required Pods with 
`pod install`. Now you should be good to go, to run on Android just type `react-native run-android` and for iOs I'd recommend opening the project's `.xcodeworkspace` with XCode and run with it.

## Architecture

The project's architecture is mostly based on what Redux states. There's a single source of truth (the global state) and the project is built around it although in some specific cases I like to keep some data in the component itself rather than the state when its usage is completely local. The project also makes usage of a very known library: **redux-saga**. Redux Saga's flow is sophisticated and simple way of working with redux: components fires actions and the sagas are responsible for taking care of them, with the usage of sagas is much easier to detect any kind of issues and control better all fired actions and handle them precisely.

## If you had more time, what would you like to improve?

I would like to implement an authentication system so users could have their personal accounts therefore would be possible to implement future features much easier such as like/dislike buttons, favorites, custom names and profile pictures. Also, would be amazing to have lazy loading for movies' list, users would not have to download large amounts of data and the list would be more performatic.
# Sinful App

This project is a [React Native](https://facebook.github.io/react-native/) boilerplate that can be used to kickstart a mobile application.

The boilerplate provides **an architecture optimized for building solid cross-platform mobile applications** through separation of concerns between the UI and business logic. It is extremely documented so that each piece of code that lands in your application can be understood and used.

## Architecture

The driving goal of the architecture of the boilerplate is separation of concerns. Namely:

- **Presentational components are separated from containers** (aka "screens").

    Presentational components are small components that are concerned with *how things look*. Containers usually define whole application screens and are concerned with *how things work*: they include presentational components and wire everything together.

    If you are interested you can [read more about it here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

- **State is managed using global [Redux](https://redux.js.org/) stores**.

    When applications grow, sharing state and its changes can become very hard. Questions like "How can I access this data?" or "When did this change?" are common, just like passing data around components just to be able to use it in nested components.

    With Redux, state is shared using global *stores*, and changes are predictable: *actions* are applied by *reducers* to the state. While the pattern can be a bit much for small projects, the clear separation of responsibilities and predictability helps with bigger applications.

    If you are interested you can [read more about it here](https://redux.js.org/introduction/motivation).

- **Application side-effects (API calls, etc.) are separated from UI and state manipulation using [Redux Saga](https://redux-saga.js.org/)**.

    Using Redux Saga has two benefits: keeping application side-effects and related business logic out of UI components, as well as executing that logic in an asynchronous way without ending in callback hell.

    Sagas are triggered by Redux actions and can also trigger Redux actions to alter state. By using JavaScript generators (`yield`), sagas are written in a synchronous-like manner while still executing asynchronously.

## Content

The boilerplate contains:

- a [React Native](https://facebook.github.io/react-native/) (v0.57.8) application (in "[ejected](https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md)" mode to allow using dependencies that rely on native code)
- a [clear directory layout](#directory-layout) to provide a base architecture for your application
- [Redux](https://redux.js.org/) (v3.7) to help manage state
- [Redux Persist](https://github.com/rt2zz/redux-persist) (v5.9) to persist the Redux state
- [Redux Sagas](https://redux-saga.js.org) (v5.0) to separate side-effects and logic from state and UI logic
- [React Navigation](https://reactnavigation.org/) (v3.0.9) with a [`NavigationService`](App/Services/NavigationService.js) to handle routing and navigation in the app, with a splash screen setup by default
- [reduxsauce](https://github.com/infinitered/reduxsauce) (v0.7) to facilitate using Redux
- [apisauce](https://github.com/infinitered/apisauce) (v0.15) to make [axios](https://github.com/axios/axios) even better
- [prettier](https://prettier.io/) and [eslint](https://eslint.org/) preconfigured for React Native

The boilerplate includes an example (displaying fake user data) from UI components to the saga. The example is easy to remove so that it doesn't get in the way.

## Directory layout

- [`App/Components`](App/Components): presentational components
- [`App/Config`](App/Config): configuration of the application
- [`App/Containers`](App/Containers): container components, i.e. the application's screens
- [`App/Images`](App/Images): images used by the application
- [`App/Sagas`](App/Sagas): redux sagas
- [`App/Services`](App/Services): application services, e.g. API clients
- [`App/Stores`](App/Stores): redux [actions, reducers and stores](https://redux.js.org/basics)
- [`App/Theme`](App/Theme): base styles for the application

For more information on each directory, click the link and read the directory's README.

## Updates

The boilerplate will follow new React-Native releases as soon as libraries and tools used here are compatible.

## Requirements

Node 8 or greater is required. Development for iOS requires a Mac and Xcode 9 or up, and will target iOS 9 and up.

You also need to install the dependencies required by React Native:

- for [Android development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-3)
- for [iOS development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies)


## Running the project

Assuming you have all the requirements installed, you can setup and run the project by running:

- `yarn install` to install the dependencies
- create your [configuration file `App/Config/index.js`](App/Config) from `index.dev.js` (in you are in dev environment) and fill the missing values
- `yarn run android` to run the Android application (remember to start a simulator or connect an Android phone)
- `yarn run ios` to run the iOS application (remember to start a simulator or connect an iPhone phone)

## Useful documentation

### Deployment

- Using [Fastlane](https://fastlane.tools/) to automate builds and store deployments (iOS and Android)
  - [Distributing beta builds](docs/beta%20builds.md)


### Package dependencies

- You may want to use [CocoaPods](https://cocoapods.org/) to manage your dependencies (iOS only)
  - [Using CocoaPods to manage your package dependencies](docs/setup%20cocoapods.md)

## License

This project is released under the [MIT License](LICENSE).

## About us

[TheCodingMachine](https://www.thecodingmachine.com/) is a web and mobile agency based in Paris and Lyon, France. We are [constantly looking for new developers and team leaders](https://www.thecodingmachine.com/nous-rejoindre/) and we love [working with freelancers](https://coders.thecodingmachine.com/). You'll find [an overview of all our open source projects on our website](https://thecodingmachine.io/open-source) and on [Github](https://github.com/thecodingmachine).

## Alternative boilerplates

We looked into existing boilerplates before starting this project, and while many of them are awesome, we did not find what we were looking for.

The most popular is [mcnamee's Starter Kit](https://github.com/mcnamee/react-native-starter-kit), which is unfortunately [limited by *Expo*](https://facebook.github.io/react-native/docs/getting-started#caveats) and misses Redux Saga.

If we look at the rest (and ignore unmaintained projects), many popular boilerplates are too opinionated: they include 3rd party services or very strong architecture choices that we are not comfortable with. To name a few: [Snowflake](https://github.com/bartonhammond/snowflake) runs with a Hapi Server running on Redhat OpenShift, [Hasura's boilerplate](https://github.com/hasura/react-native-auth-boilerplate) uses Hasura's SaaS for authentication, [Apollo's StarterKit](https://github.com/sysgears/apollo-universal-starter-kit) is targeted at GraphQL using Apollo, the [Meteor Boilerplate](https://github.com/spencercarli/react-native-meteor-boilerplate) targets Meteor…

Finally some did not contain the architecture we are looking for (the separation of concerns with Redux, Sagas, etc.), for example [re-start](https://github.com/react-everywhere/re-start).

One interesting exception is [Ignite IR Boilerplate "Andross"](https://github.com/infinitered/ignite-ir-boilerplate-andross), but after consideration we decided not to use it because of the large amount of unnecessary code/components it provided.

![Logo](./assets/images/header.png)

# OpenStream

This project aims to become a client fetching titles of popular streaming services.

## Prerequisites

-   [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
-   [Expo Cli](https://docs.expo.dev/workflow/expo-cli/)
-   [Watchman](https://facebook.github.io/watchman)

After ejecting from Expo Cli -

-   [Xcode 12](https://developer.apple.com/xcode)
-   [Cocoapods 1.10.1](https://cocoapods.org)
-   [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
-   [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

-   [axios](https://github.com/axios/axios) for fetching/networking.
-   [graphql](https://graphql.org) for structured query
-   [prop-types](https://github.com/facebook/prop-types) to type-check our components exposed properties.
-   [react-navigation](https://reactnavigation.org/) navigation library.
-   [expo-secure-storage](https://github.com/ammarahm-ed/react-native-mmkv-storage#readme) as storage solution.
-   [expo-video-player](https://www.npmjs.com/package/expo-video-player) for playback.
<!-- -   [web3](https://www.npmjs.com/package/web3) -->
-   [redux](https://redux.js.org/) for state management.
-   [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.
-   [jest](https://facebook.github.io/jest/) and [react-native-testing-library](https://callstack.github.io/react-native-testing-library/) for testing.

## Folder structure

This template follows a very simple project structure:

-   `redux`: This folder contains all actions that can be dispatched to redux.
    -   `reducers`: This folder should have all your reducers, and expose the combined result using its `index.js`
    -   `store`: Folder to put all redux middlewares and the store.
-   `assets`: Asset folder to store all images, vectors, etc.
-   `components`: Folder to store any common component that you use through your app (such as a generic button)
    -   `Common`: File to store all common components used in the application.
-   `constants`: Folder to store any kind of constant that you have.
    -   `Colors`: File to store all the color styling concerns related to the application theme.
-   `navigation`: Folder to store the navigators.
-   `screens`: Folder that contains all your application screens/features.
    -   `Screen`: Each screen should be stored inside its folder and inside it a file for its code and a separate one for the styles and tests.
        -   `Screen.tsx`
        -   `Screen.test.ts`
-   `test-utils`: Folder to store tests-related utilities and components.
-   `App.tsx`: Main component that starts whole app.

### Using scripts from console (After Ejecting from Expo)

The template already has scripts to execute the project calling a specific environment defined into the package.json file. Keep in mind that if you are going to create new `envs` you have to define the script to build the project properly.

To define which env you want to use, just keep the structure `yarn [platform]: [environment]`

DEV: `yarn ios` or `yarn android`

STG: `yarn ios:staging` or `yarn android:staging`

PROD: `yarn ios:prod` o `yarn android:prod`

Also, you can use npm following the same rule as before: `npm run ios:staging`

Modify the environment variables files in root folder (`.env.development`, `.env.production` and `.env.staging`)

#### Android

A map associating builds with env files is already defined in `app/build.gradle` you can modify or add environments if needed.

For multiple enviroments to work you would need to change `-keep class [YOUR_PACKAGE_NAME].BuildConfig { *; }` on `proguard-rules.pro` file.

#### iOS

The basic idea in iOS is to have one scheme per environment file, so you can easily alternate between them.

To create a new scheme:

-   In the Xcode menu, go to Product > Scheme > Edit Scheme
-   Click Duplicate Scheme on the bottom
-   Give it a proper name on the top left. For instance: "qa"
-   Then edit the newly created scheme to make it use a different env file. From the same "manage scheme" window:

    Expand the "Build" tab on the left menu

    -   Click "Pre-actions", and under the plus sign select "New Run Script Action"
    -   Where it says "Type a script or drag a script file", type: `echo ".env.qa" > /tmp/envfile` replacing `.env.qa` with your file.

-   Also, you will need to select the executable for the new schema:

    Expand the "Run" tab on the left menu

    -   Under the "Executable" dropdown select the ".app" you would like to use for that schema

## Generate production version

These are the steps to generate `.apk`, `.aab` and `.ipa` files

### Expo Build

For Android

To generate .apk or .aab file `expo build:android -t apk` and `expo build:android -t aab` respectively.

For iOS

`expo build:ios -t ipa`

### Android

1. Generate an upload key
2. Setting up gradle variables
3. Go to the android folder
4. Execute `./gradlew assemble[Env][BuildType]`

Note: You have three options to execute the project
`assemble:` Generates an apk that you can share with others.
`install:` When you want to test a release build on a connected device.
`bundle:` When you are uploading the app to the Play Store.

For more info please go to https://reactnative.dev/docs/signed-apk-android

### iOS

1. Go to the Xcode
2. Select the schema
3. Select 'Any iOS device' as target
4. Product -> Archive

For more info please go to https://reactnative.dev/docs/publishing-to-app-store

## Components

Components are the basic blocks of a react native application, but since we​​ aim to minimize development complexity, all the components are at the same nesting level.

Another important thing is the use of propTypes to check the kind of data that your components need to work properly. If the component receives some data from others, the type of these props must be defined, and in case you need it the default value of the property too.

### Static resources:

To keep an application scalable and organized, the global static resources that are used in the application have to be created in a specific file.

### We manage three main folders for that:

-   Assets: Here you can store all the images and icons that you need through the app. You have as an example the icon ic_home.png, to respond with the different device screen densities just create inside the same folder the image and all the scaled versions that you need. RN only handles x1, x2 and x3 in this case, you have.

    -   assets
        -   ic_home
            -   ic_home.png
            -   ic_home@2x.png
            -   ic_home@3x.png

<!-- -   Localization: This folder contains all the locale objects that you need to create a multilingual application. Create a file for each locale, inside define an object then maintain the nesting sorted by the screen that contains the text that you need and the text you want to show. As the last step, remember to create a reference inside the Localization.js file and add it to LocalizedStrings. -->

## Redux

Once the components are defined, they are tied to the management of information through the application. For this, Redux is implemented with the store-reducer-action structure as usual, however, not only the data is handled through the actions but the success and error responses are also defined by the same form.

### Controllers folder and API connection handler

To keep the networking layer simple, the template uses a single Axios instance in the `httpClient.js`. It uses interceptors to define common side effects for the responses.

When you need communication with a service you have to create a function to manage the operation and grouping according to the kind of transaction inside a controller file, please keep all of those inside the controllers' folder.

While the data transfer between the API and the app is working you must use the success and error actions that help you to catch the result of the operation. With this method, you can track the interaction through the redux store. This is useful because you can create behaviors based on those states in a quick and simple way

### Redux folder

3 folders divide the redux work

-   Store: Here you define the store shape and you can configure the persistReducer and middlewares.
-   Actions: Remember to create the file and the corresponding test for each action classification. Here you define actions for success and error scenarios.
-   Reducers: You have the error and success reducers by default. Create the other classifications and try to keep simple each file. Here you modify the store.

## Screens

In this folder, you have the main objects to apply the composition architecture. Just create a folder for each screen you have in your application, call all the components and static resources you need to render the scene and finally use the corresponding hooks to interact with redux and create behaviors depending on the store.

To keep the structure, place the set of tests needed for each screen with the file {namefile.test.js}

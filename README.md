# Basic food week application

*Incomplete*

Project initialised with Expo, using Google Firebase, react-native-elements, @react-native-picker/picker and @react-navigation/drawer. 

The database instance lives in the gitignored config.js file, that exports the initialised {db}

```javascript
let app = (!firebase.apps.length) ? firebase.initializeApp(firebaseConfig): null; 

export const db = app.database(); 
```



## Basic functions

The app saves recipes to a Firebase Realtime db, from where the user can then select a single recipe to view, or alternatively, create and then view a full week menu for the family in one go (using an Elements Cards component).

## Functions that didn't make it. 

A shopping list function that generates a weekly shopping list from the selected recipes. 

## What would have been nice

More developed UI and potentially, server side intelligence to maintain a more sophisticated week menu system that would reduce food waste by keeping track of portion sizes. 


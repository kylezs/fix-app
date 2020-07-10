# Setting up for Development

1. Copy the `env.example` file into a file called `.env` in the root of the project (where `.env.example` is now).
2. Replace the values with values for your elasticsearch index. The user must have create_doc permissions, and if the index doesn't exist (i.e. you want it created on the first document push) it will require create index permissions.

## iOS

`yarn ios`

## Android

`yarn android`

Note, you must have [Xcode and Android Studio setup correctly](https://reactnative.dev/docs/environment-setup) for this to work.

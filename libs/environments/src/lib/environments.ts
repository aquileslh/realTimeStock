// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dominio: 'https://mi.dominio',

  keys: {
    one: 'onekey',
    two: 'twokey',
  },

  tokenFinnhub: 'bu9jf2748v6tjsddpvpg',
  domainFinnhub: 'https://finnhub.io/api/v1/stock/',

  firebaseConfig: {
    apiKey: 'AIzaSyASBGpVTdqzMqGM_WlHUNBWhTRURKaKjC8',
    authDomain: 'sharesofstock-35a56.firebaseapp.com',
    databaseURL: 'https://sharesofstock-35a56.firebaseio.com',
    projectId: 'sharesofstock-35a56',
    storageBucket: 'sharesofstock-35a56.appspot.com',
    messagingSenderId: '468234275502',
    appId: '1:468234275502:web:cde98bc307ad4db5f3fb3f',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

## Getting Started with GS PHONES APP

### The parts of the aplication are already been deployed both the API and the App.
- The API is deployed in Heroku: https://gs-phones-list.herokuapp.com/api/phones
- The App is hosted by Firebase: https://gs-phones-list.web.app/

## To be able to work locally with the API:

1. Go to `backend` folder.
2. Run `npm start` in order to install all the dependencies.
3. Edit the `start` script in the package JSON file and point to nodemon to be able to start the development server.
  + `start` script should be: `nodemon app.js` instead of `node app.js`.
4. Run `npm start` and be ready to go.

After you should be able to navigate to [http://localhost:5000](http://localhost:5000) and obtain and response of the API.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Thanks for the oportunity!

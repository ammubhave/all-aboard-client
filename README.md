# All A-Board Client

This is the client component of All A-Board. View the (main project page)[https://github.com/ammubhave/all-aboard] for All A-Board for getting started instructions.

## Running the client

You can start the expo client by running the following command. This will open a browser window, where you can then click "Run in web browser" on the left to open the app on a web browser. Alternatively, you can setup Expo to display the app on your mobile device as well. Note that you will need to manually edit in the server URI in app/config/constants.tsx. Following the instructions on Expo's website for learning how to run apps this way.

```
expo start
```

By default, the client connects the production instance of the server. To connect to a local version, for example running on localhost:3000, you need to edit app/config/constants.tsx and set the `SERVER_URI` to `http://localhost:3000/`.

## Deployment

The app is both deployed on Expo and on Github pages at (https://all-aboard.amolbhave.com/)[https://all-aboard.amolbhave.com/]. For deploying to expo, you can click on the corresponding publish link when you run expo start. For deploying to Github pages, run the following command.

```
npm run deploy
```

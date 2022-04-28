# OAUTH Refresher

This project is used to generate OAUTH refresh tokens for different providers. 

## Quick Start

This project can only be used in your local machine. Run the following to get started: 

```
yarn dev
```

## Google

To use this to generate OATUH tokens from the Google Identity API for server-side webapps peroform the following steps.

1. Add `http://localhost:3000/google` as a redirect_uri for your project at the [Developer Console here](https://console.cloud.google.com/apis/credential).
2. Add your Client ID as `NEXT_PUBLIC_CLIENT_ID` and Client Secret as `NEXT_PUBLIC_CLIENT_SECRET` to your `.env`.
3. Run `yarn dev` and go to [http://localhost:3000/google](http://localhost:3000/google) ro get started.
4. Input the scopes you requested and click Login with Google.

## License
OAUTH Refresher is open source software by [MeetBit Inc.](https://meetbit.io/) [licensed as MIT](https://github.com/MeetBit/oauth-refresher/blob/master/LICENSE).
# Skale Logging Sample Dapp

### Overview

This sample dApp represents a simple playground for users new to
Terminal to drop in their credentials and immediately test Skale
logging.  For more details on why the Terminal logging interface is
especially useful for dApps deployed on Skale sidechains, consider
checking out [this article](https://blog.terminal.co/integrating-skale-with-terminal/) on the Terminal blog.  

Read more about the Skale Elastic Blockchain Network [here](https://skale.network/)

For more information about Terminal, check out the [official
documentation](https://docs.terminal.co/)

### Installation

Clone this repository: `git@github.com:Terminal-Systems/skale-blog-example.git`

Install dependencies with either of the following commands:

`yarn install` or `npm install`

Start the app:

`yarn start` or `npm start`

*NOTE:* In order to connect your metamask wallet to Skale, be sure to
add a custom RPC provider with the following skale endpoint:

http://sip1.skalenodes.com:10046

You will also need to obtain Skale test ether in order to use this dApp.
You can obtain some by passing your address and the above skale endpoint
to the following faucet:

http://faucet.skale.network/

### Usage Guide

In order to correctly log RPC requests from this dApp, you will need to
replace the default credentials in the app with those from your own
Terminal account.  For more information on how to locate your
credentials on Terminal, see [this](https://docs.terminal.co/logs-analytics/create-an-api-key) section of the docs.

Once you have successfully located your credentials, make the following changes to this app:

In `/public/index.html` locate the Terminal `<script>` on line 28.
Replace the `apiKey` and `projectId` properties of the object passed
into the `startLogging` function with the respective credentials
obtained from your Terminal account.

Lastly, in `/src/constants/credentials`, replace the `apiKey` and
`projectId` values with your credentials, respectively.

If you have any trouble along the way, don't hesitate to get help in the
[official Terminal Discord channel](https://discord.gg/uPvV5qF).


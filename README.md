# Subdot - Bringing power back to the people

[![wakatime](https://wakatime.com/badge/user/77078a50-96cc-4da2-b32c-08e468259a40/project/e42f2e90-715e-440e-a242-876e1e5affaf.svg)](https://wakatime.com/badge/user/77078a50-96cc-4da2-b32c-08e468259a40/project/e42f2e90-715e-440e-a242-876e1e5affaf)

Project link - https://subdot.netlify.app
Demo video - https://youtu.be/JVkSsFW-gHE

#### `Note`: This is the front end code of Subdot and the back end code can be found in this repository - https://github.com/its-me-sv/subdot-backend

## Setup:
Update the `REST_API` and `ADVERT_BENEFICIAR` values in the `src/utils/constants.ts`

## Usage:
```
yarn install
yarn start
yarn build (to build the code)
```
#### `Note`: Consider using `yarn` to manage your code. You may face some issues with `NPM`

## About
Subdot is a decentralized social media platform powered by Substrate and Subsocial that provides users with complete control over their data and content. By removing a central authority, the platform allows users to participate in decision-making, governance, and rewards for their contributions. Subdot is a safe and transparent environment where users can connect, share their views, and collaborate with one another. Its commitment to web 3 technology ensures a more equitable and democratic social media platform that prioritizes the needs of its users.

## Features of Subdot:
1. The platform is decentralized.
2. Users are rewarded for their contributions.
3. Users have the ability to tip and transfer tokens to each other.
4. Real-time notifications are provided for most actions.
5. Businesses can advertise on the platform.

## Business model
On a monthly basis, we utilize the reputation system (mentioned below) to identify the top reputed users, and provide them with tokens as rewards. The tokens are received from advertisers who can register for an account and post real-time advertisements, with no collection of user data for advertising purposes. The advertiser is charged per minute for the advertisement, and the tokens are transferred to a beneficiary, with a proportion of the amount taken to manage Subdot's expenses, and the remaining tokens are given to the top reputed users. As a result, the rewards for being a top reputed user may vary every month, with more rewards available for users when there are more advertisements. This approach incentivizes user engagement, increases user activity on the platform, and attracts new users.

## Tech stack
Front end - ReactJs, Vite, TypeScript, GraphQl, Polkadot and Subsocial SDKs

Back end - NodeJs, ExpressJS, JavaScript, Mongoose (MongoDB)
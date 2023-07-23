# Subdot - Bringing power back to the people

[![wakatime](https://wakatime.com/badge/user/77078a50-96cc-4da2-b32c-08e468259a40/project/e42f2e90-715e-440e-a242-876e1e5affaf.svg)](https://wakatime.com/@DarkKnight7/projects/fxruavcaqm) + [![wakatime](https://wakatime.com/badge/user/77078a50-96cc-4da2-b32c-08e468259a40/project/0c3150ef-2822-4442-8782-f95a03750efe.svg)](https://wakatime.com/@DarkKnight7/projects/ifwjteehbc)

#### `Note`: This is the front end code of Subdot and the back end code can be found in this repository - https://github.com/its-me-sv/subdot-backend

## APAC Roadmap: Latest Enhancements in the "APAC Edition"
1. User-to-user communication via chat [implemented]
2. Advertisement posting dashboard with scheduling and filtering for adult content [implemented]
3. Extra statistical information on the reputation page [implemented]
4. Public sharing of posts [implemented]
5. Rewarding top users with fund transfers based on RP score [pending implementation]

## Pow
To verify that the code (for `APAC Roadmap`) was written during the `official hack period` (3 to 23 July 2023), kindly check the commit history [here](https://github.com/its-me-sv/subdot-frontend/commits/main?after=b869a13c79c753978403420949f2ee6559641cb5+104&branch=main&qualified_name=refs%2Fheads%2Fmain) where there is no commit between `July 5, 2023 (2 days after the APAC opening ceremony)` and `March 17, 2023`. The same goes for the [backend code](https://github.com/its-me-sv/subdot-backend/commits/main?after=9035fb04b0021f6d9eb358ac1104b2c184fc98a5+34&branch=main&qualified_name=refs%2Fheads%2Fmain) as well

## Links

Project link - https://subdot.netlify.app

Demo video (APAC edition) - https://youtu.be/xC0IGI8IIyI

Demo video (Europe edition) - https://youtu.be/JVkSsFW-gHE

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

Back end - NodeJs, ExpressJS, JavaScript, Mongoose (MongoDB), Cassandra (AstraDB), Google App Engine, Google Vision AI, Cloudinary
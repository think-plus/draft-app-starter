1. Make sure you are on Node version >=20.
2. Install the Shopify CLI on your local machine globally with `npm install -g @shopify/cli@latest`
3. Install dependencies with `npm install`.
4. Create a MySQL database and provide the URL to an `.env` file in the top level of the directory (as shown in the `.example.env`).
5. Generate Prisma artifacts and push migrations with `npm run prisma migrate dev` (or `npm run setup`).
6. Run the command `npm run config:link`. You will be asked to login to your Partner account and create a new app to link to this codebase. You will be able to see the changes on your app's configuration file (`shopify.app.toml`).
7. Run the development environment with `npm run dev`. You will be asked to choose a development store from your Partner account to preview the app. Afterwards you will be prompted to update your app's URL automatically, where you can choose 'Yes'.
8. Whenever you add new GraphQL queries in your Remix app, make sure to name them and then run `npm run graphql-codegen`. This will simplify the experience with response data types.
9. Whenever you add new routes in your app, make sure to name them like `app.{url}.tsx`. You can also add them to the app navigation menu as a `Link`, through the `NavMenu` component in the file `app.tsx`.
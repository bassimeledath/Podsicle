This is the frontend of Podsicle

An .env is required in order to run this app because it connects to Firebase & Postgres Database


## Getting Started

First, install the dependencies:

```
npm install
```

Second, run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Specifications

- Community:

Everyone can check out community podcasts on Podsicle community page and see trending podcasts.

- User registration:

Users are required to log in in order to use the Podsicle Playground and keep track of their creations.

- Playground:

Users can use the playground to experiment with various Google voices and see how the app turns a research paper link into a podcast.

- Action:

Users can take an action on a podcast like giving feedback, like or dislike.

## Files and Directories

- app - main application directory.
  - (dashboard) - layout for all main pages
      - community - community page
      - history - history page
      - playground - playground page
      - podcast - individual podcast page
  - api - handle input/output of API calls
  - sign-in - handle signin page and authentication function with Firebase

- components - reusable UI components

- public - static resources

- lib - contains functions used in the application (utility functions and data fetching). This folder was automatically ignored by Github.

- package.json - all dependencies for the app


# Bored Games Web App

Bored Games is a project that creates a community of board game enthusiasts in your local neighborhood. Apps like Turo and Airbnb exist, so why not an app where you can rent board games from your neighbors?

It is split into two parts. This is the front end, and the backend is located at [here.](https://github.com/MichaelMifsudSweeney/BoredGames-API)

## Tech Stack

**Client:** React, SCSS, MaterialUI, Board Game Atlas

**Server:** Node, Express


## Deployment

#### To Deploy the Back End:

```bash
  git clone https://github.com/MichaelMifsudSweeney/BoredGames-API.git
```
(or download it from Code > Download Zip)

You'll need to create a .env file with variables for PORT and BACKEND_URL (There's also a .env_sample, you can just edit the filename to .env)

You'll need to install node modules with:
```bash
  npm i
```

When you're ready to go you can hit:
```bash
  node index.js
```
 or if you have nodemon:
 ```bash
  npx nodemon
```

#### To Deploy the Front End:
```bash
  git clone https://github.com/MichaelMifsudSweeney/bored-games.git
```
(or download it from Code > Download Zip)

You'll need to create a .env file with variables for REACT_APP_API_URL and REACT_APP_CURRENT_USER_ID (There's also a .env_sample, you can just edit the filename to .env)

You'll need to install node modules with:
```bash
  npm i
```

When you're ready to go you can hit:
```bash
  npm start
```
## Features

- Browse through posted board games, see number of players, and playtime
- See board game details like descriptions, owner name, comments if available, and board game condition
- Reserve a board game on the Game Details Page
- See board games you've posted and reserved on the Profile Page

- Return and comment on board games you've reserved
- remove board games you've posted
- Add a board game with field validation and auto complete

## Known Issues
- During Autocomplete, the correct board game needs to be selected via click, not keyboard
## API Used

Huge shout out to [Board Game Atlas](https://github.com/matiassingers/awesome-readme) for creating such a robust hub for board game information.


## Next Steps
- Add in walking distance with Google Distance Matrix API
- MongoDB and 0Auth
- Social Features like chat and message boards

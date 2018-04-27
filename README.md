# \<bunsen\>

This is the UI for the Bunsen.



To develop you'll need to set up a gateway and a the UI.

In one terminal set up the gateway...
```
git clone git@github.com:bunsenbrowser/bunsen
cd bunsen/www/nodejs-project
npm install
node index.js
```

In another terminal set up the UI and dat share it...
```
git clone git@github.com:bunsenbrowser/bunsen-ui.git
cd bunsen-ui
npm install
bower install
dat share
```

Then open your Dat Archive UUID using the gateway like http://localhost:3000/<the dat archive uuid from your dat share command>

Now when you edit files in the bunsen-ui folder, refresh your browser and your changes will be shared through the gateway.

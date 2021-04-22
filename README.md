# Binary Visualized

I made this interactive website to visualize counting in binary!

Live Site: https://harryli0088.github.io/binary-visualized/

Built using Svelte and TypeScript.


## Adding Jest testing to Svelte template
1. Install packages
```
npm i -D @types/jest babel-jest jest ts-jest
```
2. Add test script to ```package.json```
```json
{
  "scripts": {
    "test": "jest --watch"
  }
}
```
3. Copy ```babel.config.js``` and ```jest.config.js``` to project root
4. Run ```npm test``` whenever you want to test


## Deploying to Github Pages
1. Install gh-pages package
```
npm i -D gh-pages
```
2. Update ```package.json``` with these values
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d public"
  },
  "homepage": "https://harryli0088.github.io/binary-visualized/"
}
```
3. Update imports in index.html to have a period in front of every path
```
...
	<link rel='icon' type='image/png' href='./favicon.png'>
	<link rel='stylesheet' href='./global.css'>
	<link rel='stylesheet' href='./build/bundle.css'>

	<script defer src='./build/bundle.js'></script>
...
```
4. Run ```npm deploy``` whenever you want to deploy

# Covid Track

## Usage
Installation: (this will take several minutes to install)
```
git clone https://github.com/matthew29tang/covid-track
cd ./covid-track
npm install
```

Usage:
```
npm start
```

## Dev Notes
Adding a new page:
* Rename `src/pages/Plot.js` to be whatever name you want
* In `router/Routing.js` update the import of your component name (from the previous step). Also update the component in the Route later on (in the render function)

Adding new dependencies:
* `npm install pkg --save`

Matthew is a genius
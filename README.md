AKQA Your Basket Test
=========

AKQA Your Basket Test

### Setup
---

Run `npm install` from the root folder to install all the development dependencies. After the dependencies are installed run `gulp` which will start will start an express test server. The gulp task will watch for changes in the both the scripts and scss folders and will detect changes in the html file in the public folder. 

The gulp task will auto refresh the page whenever changes are detected usng gulp-livereload. Gulp will also minify the css and concatenate all JS files in the scripts folder.

The app can be viewed at `http://localhost:4000` once the server is running.
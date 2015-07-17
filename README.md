gulp-starter
============

Starter Gulp + Browserify project forked from https://github.com/greypants/gulp-starter with the intention of changing it
for more general use, including code quality checks and jasmine for testing (as opposed to upstream which uses mocha, chai).

## Usage

`git clone https://github.com/stephen-james/gulp-starter.git your-new-repo-name`

## Run gulp and be amazed.

just run the `default` gulp task with:
```
gulp
```

This will run the `default` gulp task defined in `gulp/tasks/default.js`, which has the following task dependencies: ['sass', 'images', 'markup', 'fonts', 'watch']
- The `sass` task compiles your css files.
- `images` moves images copies images from a source folder, performs optimizations, the outputs them into the build folder
- `markup` doesn't do anything but copy an html file over from src to build, but here is where you could do additional templating work.
- `fonts` doesn't do anything but copy an font files over from src to build.
- `watch` has `watchify` as a dependency, which will run the browserifyTask with a `devMode` flag that enables sourcemaps and watchify, a browserify add-on that enables caching for super fast recompiling. The task itself starts watching source files and will re-run the appropriate tasks when those files change.

### Configuration
All paths and plugin settings have been abstracted into a centralized config object in `gulp/config.js`. Adapt the paths and settings to the structure and needs of your project.

### Additional Features and Tasks

#### Icon Fonts

```
gulp iconFont
```

Generating and re-generating icon fonts is an every once and a while task, so it's not included in `tasks/default.js`. Run the task separately any time you add an svg to your icons folder. This task has a couple of parts.

##### The task
The task calls `gulp-iconfont` and passes the options we've configured in [`gulp/config.js`](https://github.com/greypants/gulp-starter/blob/icon-font/gulp/config.js#L27). Then it listens for a `codepoints` that triggers the generation of the sass file you'll be importing into your stylesheets. [`gulp/iconFont/generateIconSass`](./gulp/tasks/iconFont/generateIconSass.js) passes the icon data to [a template](./gulp/tasks/iconFont/template.sass.swig), then outputs the resulting file to your sass directory. See the [gulp-iconFont docs](https://github.com/nfroidure/gulp-iconfont) for more config details. You may reconfigure the template to output whatever you'd like. The way it's currently set up will make icons usable as both class names and mixins.

```sass
.twitter-button
  +icon--twitter // (@include in .scss syntax)
```

or

```html
<span class="icon -twitter"></span>
```

#### Production files

There is also a `production` task you can run:
```
gulp production
```
This will run JavaScript tests, then re-build optimized, compressed css and js files to the build folder, as well as output their file sizes to the console. It's a shortcut for running the following tasks: `karma`, `images`, `iconFont` `minifyCss`, `uglifyJs`.

#### JavaScript Tests with Karma
This repo includes a basic js testing setup with the following: [Karma](http://karma-runner.github.io/0.12/index.html) with [Jasmine](http://jasmine.github.io/2.3/introduction.html)

To run the tests and start monitoring files:
```
./node_modules/karma/bin/karma start
```

Want to just run `karma start`? Either add `alias karma="./node_modules/karma/bin/karma"` to your shell config or install the karma command line interface globally with `npm install -g karma-cli`.


--

the original gulp-starter was Made with ♥ at [Viget](http://viget.com)!

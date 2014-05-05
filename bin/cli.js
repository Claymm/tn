#!/usr/bin/env node

var child_process = require('child_process'),
  updateNotifier = require('update-notifier'),
  colors = require('colors'),
  package = require('../package.json'),
  recipes = require('../lib/recipes'),
  setup = require('../lib/setup');

var args = process.argv.slice(2);
var args_ln = args.length;

if (args[0] !== '-h' && args[0] !== '--help') {
  var cmd = args[0];

  // version
  if (cmd === '-v' || cmd === '--version') {
    console.log(package.version);
    return;
  }

  // list
  if (cmd === 'list') {
    displayBanner();

    recipes.list(args[1] === 'readme');
  }

  // default
  else if (cmd === 'default') {
    displayBanner();

    recipes.setDefault(args.slice(1));
  }

  // set
  else if (cmd === 'save') {
    displayBanner();

    recipes.save(args[1], args.slice(2));
  }

  // rename
  else if (cmd === 'rename') {
    displayBanner();

    recipes.rename(args[1], args[2]);
  }

  // remove
  else if (cmd === 'remove') {
    displayBanner();

    recipes.remove(args[1]);
  }

  // reset
  else if (cmd === 'reset') {
    displayBanner();

    recipes.reset();
  }

  // install
  else if (cmd === 'install') {
    displayBanner(false);

    setup.install();
  }

  // uninstall
  else if (cmd === 'uninstall') {
    displayBanner(false);

    setup.uninstall();
  }

  // alias for 'ti build'
  else {

    // prepend build
    args.unshift('build');

    // execute ti
    child_process.spawn('ti', args, {

      // So that Ti CLI can setRawMode
      stdio: 'inherit'
    });
  }
}

// help
else {

  displayBanner();

  console.log('Commands:');
  console.log();
  console.log('  *'.cyan + '\t\t\t' + 'executes `ti build *` to save you 6 more keystrokes!');
  console.log();
  console.log('  list'.cyan + '\t\t\t' + 'lists all recipes in the book');
  console.log('  default <name>/*'.cyan + '\t' + 'sets a recipe (name) to always start out with (default: ios)');
  console.log('  save <name> *'.cyan + '\t\t' + 'save a recipe, possibly overriding a built-in');
  console.log('  rename <old> <new>'.cyan + '\t' + 'renames a recipe');
  console.log('  remove <name>'.cyan + '\t\t' + 'removes a recipe, possibly restoring an overridden built-in');
  console.log('  reset'.cyan + '\t\t\t' + 'removes all custom recipes and default, restoring the built-in');
  console.log();
  console.log('  install'.cyan + '\t\t' + 'installs the Titanium CLI hook');
  console.log('  uninstall'.cyan + '\t\t' + 'uninstalls the Titanium CLI hook');
  console.log();
  console.log('  -h, --help'.cyan + '\t\t' + 'displays help');
  console.log('  -v, --version'.cyan + '\t\t' + 'displays the current version');
  console.log();
}

function displayBanner(update) {

  if (update !== false) {
    var notifier = updateNotifier({
      packagePath: '../package.json'
    });

    // check for updates
    notifier.update && notifier.notify();
  }

  // display banner
  console.log('TiNy'.cyan.bold + ', version ' + package.version);
  console.log(package.about.copyright);
  console.log();
}
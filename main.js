import "https://cdn.jsdelivr.net/npm/jquery.terminal/js/jquery.terminal.min.js"
import "https://cdn.jsdelivr.net/npm/jquery.terminal/js/jquery.terminal.js"
/*
  Terminal Commands for JavaScript Terminal Emulator
  https://terminal.jcubic.pl/
*/


var updateLines = [];
var updateIndex = 0;
var scanlines   = $('.scanline');
var time        = (window.innerHeight * 2) / 170;
const bustedOS  = $('#Busted-terminal');




/**
 * @desc Terminal Commandline Interface
 * @param {object} $ - jQuery
 * @param {object} undefined - undefined
 * @return {undefined}
 * */
var terminal = $('#Busted-OS').terminal(function (command, term) {
  if (command.match(/^\s*exit\s*$/)) {
    $('.bustedOS').addClass('collapse');
    term.disable();
  } else if (command !== '') {
    processCommand(command, term);
  }
}, {
  greetings:
    '\n' +
    '__________                __             .___        ________    _________\n' +
    '\\______   \\__ __  _______/  |_  ____   __| _/        \\_____  \\  /   _____/\n' +
    ' |    |  _/  |  \\/  ___/\\   __\\/ __ \\ / __ |  ______  /   |   \\ \\_____  \\ \n' +
    ' |    |   \\  |  /\\___ \\  |  | \\  ___// /_/ | /_____/ /    |    \\/        \\\n' +
    ' |______  /____//____  > |__|  \\___  >____ |         \\_______  /_______  /\n' +
    '-----------------------------------------------------------------------------------------------------------------------------------------------------------\n',
  // greetings: 'Welcome to Busted-OS',
  name: 'Busted-OS',
  height: 200,
  prompt: '#> ',
  onInit: function () {
    reSize();
  },
});




function reSize() {
  // for window height of 170 it should be 2s
  var height = window.innerHeight;
  var width  = window.innerWidth;
  var time   = (height * 2) / 170;
  scanlines[0].style.setProperty("--time", time);
  bustedOS.css('width', width / 2);
  bustedOS.css('height', height - (height / 3));
  
}


function _help(term) {
  term.echo('Busted-OS Commands:');
  term.echo('-help : display this help message');
  term.echo('-clear : clear the terminal');
  term.echo('-date : display the current date');
  term.echo('-time : display the current time');
  
  term.echo('-vol -set -<value> : set the volume to <value>');
  term.echo('-vol -inc : increase the volume by 5%');
  term.echo('-vol -dec : decrease the volume by 5%');
  term.echo('-vol -mute : mute the volume');
  term.echo('-vol -unmute : unmute the volume');
  term.echo('-vol -toggle : toggle the volume');
  term.echo('-vol -status : display the current volume');
  term.echo('-vol -status -mute : display the current volume and mute status');
  
}




function _setVolume(command, term) {

}


function _clear(term) {

}


/***
 * @desc Processes the command entered by the user using regex
 * @param {string} command - The command entered by the user
 * @param {object} term - The terminal object
 * */
function processCommand(command, term) {
  var cmd = command.trim();
  
  
  if (cmd.match(/-help/i)) {
    _help(term);
  }
  
  if (cmd.match(/-clear/i)) {
    _clear(term);
  }
  
  if (cmd.match(/-date/i)) {
    term.echo(new Date());
  }
  
  if (cmd.match(/-time/i)) {
    term.echo(new Date().toLocaleTimeString());
  }
  
  if (cmd.match(/-vol -set -[0-9]{1,3}/i)) {
    _setVolume(cmd, term);
  }
  
  
  // Unrecognized cmd
  if (!cmd.match(/-help/i) && !cmd.match(/-clear/i) && !cmd.match(/-date/i) && !cmd.match(/-time/i) && !cmd.match(/-vol -set -[0-9]{1,3}/i)) {
    term.echo('Unrecognized command: ' + command, {
      finalize: function (div) {
        div.css('color', 'red');
      }
    });
    
  }
  
}

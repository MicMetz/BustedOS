import "https://cdn.jsdelivr.net/npm/jquery.terminal/js/jquery.terminal.min.js"
import "https://cdn.jsdelivr.net/npm/jquery.terminal/js/jquery.terminal.js"
/*
  Terminal Commands for JavaScript Terminal Emulator
  https://terminal.jcubic.pl/
  
  Using https://github.com/toofpaste/PlagueInc/tree/master/ as a reference
*/


var updateLines = [];
var updateIndex = 0;
var scanlines   = $('.scanline');
var time        = (window.innerHeight * 2) / 170;
const bustedOS  = $('#Busted-terminal');


window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    var input = $("#busted-terminal-input");
    input.text("");
    $("#busted-terminal-content").append("<div>" + input + "</div>");
    input.focus();
  }
});

$("#busted-terminal-close").click(function () {
  $("#Busted-terminal").hide();
});

$("#busted-terminal-minimize").click(function () {
  $("#Busted-terminal").hide();
});


window.addEventListener("resize", function () {
  resize();
});


/**
 * @desc Terminal Commandline Interface
 * @param {object} $ - jQuery
 * @param {object} undefined - undefined
 * @return {undefined}
 * */
var terminal = $('#Busted-OS').terminal(function (command, term) {
  if (command.match(/^\s*exit\s*$/)) {
    bustedOS.addClass('collapse');
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
    ' |______  /____//____ /  |__|  \\___ / ____ |         \\_______  /_______  /\n' +
    '\n\n',
  
  name: 'Busted-OS',
  height: 200,
  prompt: '#> ',
  enabled: $('body').attr('onload') === undefined,
  onInit: function () {
    resize();
  },
});




function resize() {
  var height = window.innerHeight;
  var width  = window.innerWidth;
  var time   = (height * 2) / 170;
  scanlines[0].style.setProperty("--time", time);
  bustedOS.css('width', width / 2);
  bustedOS.css('height', height - (height / 3));
  
}


function terminalUpdate() {
  
  
  
  // if (updateIndex >= updateLines.length) {
  //   updateIndex = 0;
  // }
  //
  // terminal.echo(updateLines[updateIndex]);
  // updateIndex++;
  
  // if (updateIndex < updateLines.length) {
  //   setTimeout(termUpdate, 1000);
  // }
}


function _help(term) {
  term.echo('Busted-OS Commands:');
  term.echo('-help : display this help message');
  term.echo('-clear : clear the terminal');
  term.echo('-date : display the current date');
  term.echo('-time : display the current time');
  
  term.echo('-vol -set -<value> : set the volume to a value between 0 and 100');
  term.echo('-vol -inc : increase the volume by 5% (default), or by a value between 0 and 100');
  term.echo('-vol -dec : decrease the volume by 5% (default), or by a value between 0 and 100');
  term.echo('-vol -mute : mute the volume');
  term.echo('-vol -unmute : unmute the volume');
  term.echo('-vol -toggle : toggle the volume');
  term.echo('-vol -status : display the current volume');
  term.echo('-vol -status -mute : display the current volume and mute status');
  
}




function _setVolume(command, term) {
  var cmd = command.trim();
  var vol = cmd.match(/-set -[0-9]{1,3}/i);
  vol     = vol[0].replace(/-set -/i, '');
  vol     = parseInt(vol);
  term.echo('Volume set to ' + vol + '%');
  
}




function _clear(term) {
  term.clear();
  term.echo(
    '\n' +
    '__________                __             .___        ________    _________\n' +
    '\\______   \\__ __  _______/  |_  ____   __| _/        \\_____  \\  /   _____/\n' +
    ' |    |  _/  |  \\/  ___/\\   __\\/ __ \\ / __ |  ______  /   |   \\ \\_____  \\ \n' +
    ' |    |   \\  |  /\\___ \\  |  | \\  ___// /_/ | /_____/ /    |    \\/        \\\n' +
    ' |______  /____//____ /  |__|  \\___ / ____ |         \\_______  /_______  /\n' +
    '\n\n',
  );
  
}


function _incVolume(command, term) {
  var cmd = command.trim();
  var vol = cmd.match(/-inc -[0-9]{1,3}/i);
  vol     = vol[0].replace(/-inc -/i, '');
  vol     = parseInt(vol);
  term.echo('Volume increased by ' + vol + '%');
}


function _decVolume(command, term) {
  var cmd = command.trim();
  var vol = cmd.match(/-dec -[0-9]{1,3}/i);
  vol     = vol[0].replace(/-dec -/i, '');
  vol     = parseInt(vol);
  term.echo('Volume decreased by ' + vol + '%');
}


function _getDate(cmd, term) {
  var date = new Date();
  var day  = date.getDate();
  var mon  = date.getMonth() + 1;
  var year = date.getFullYear();
  term.echo(day + '/' + mon + '/' + year);
}


function _getCurrentTime(cmd, term) {
  var date = new Date();
  var hour = date.getHours();
  var min  = date.getMinutes();
  var sec  = date.getSeconds();
  term.echo(hour + ':' + min + ':' + sec);
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
    _getDate(cmd, term);
  }
  
  if (cmd.match(/-time/i)) {
    // term.echo(new Date().toLocaleTimeString());
    _getCurrentTime(cmd, term);
  }
  
  if (cmd.match(/-vol -set -[0-9]{1,3}/i)) {
    _setVolume(cmd, term);
  }
  
  if (cmd.match(/-vol -inc/i)) {
    _incVolume(cmd, term);
  }
  
  if (cmd.match(/-vol -dec/i)) {
    _decVolume(cmd, term);
  }
  
  
  // Unrecognized cmd
  if (!cmd.match(/-help/i) && !cmd.match(/-clear/i) && !cmd.match(/-date/i) && !cmd.match(/-time/i) && !cmd.match(/-vol -set -[0-9]{1,3}/i) && !cmd.match(/-vol -inc/i) && !cmd.match(/-vol -dec/i)) {
    term.echo('Unrecognized command: ' + command, {
      finalize: function (span) {
        span.css('color', 'red');
      }
    });
    
  }
  
}


setInterval(terminalUpdate, 1000);

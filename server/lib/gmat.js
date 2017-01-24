'use strict';

var childProcess = require('child_process');
var Q = require('q');
var Promise = Q.Promise;
var fs = require('fs');
var path = require('path');
var scriptBuilder = require('./scriptBuilder');

exports = {};

exports.runSim = runSim;
exports.runScript = runScript;

module.exports = exports;

function runSim(simulation) {
   var script = scriptBuilder.buildScript(simulation);
   return runScript(script);
}

function runScript(script) {
   return saveScript(script)
      .then(runGmat);
}

// private


function saveScript(script) {
   var filename = newFileName();

   return new Promise(function resolver(resolve, reject) {

      fs.writeFile(filename, script, function(err) {
         if (err) {
            console.log(err);
            reject(err);
         } else {
            resolve(filename);
         }
      });
   });
}

function newFileName() {
   var num = Date.now();
   var filename = makeFileName(num);
   return filename;
}


function makeFileName(num) {

   var dir = './scripts/';
   var base = 'sim';
   var extension = 'script';
   var filename = path.resolve(__dirname, dir +  base + num + '.' + extension);
   return filename;
}


function runGmat(filename) {


   return new Promise(function resolver(resolve, reject) {

      var command = buildCommand(filename);
      childProcess.exec(command, function(err, stdout, stderr) {
         if (err) {
            console.log(err);
            reject(err);
         } else {
            var output = {
               stdout: stdout
            };
            resolve(output);
         }
         deleteFile(filename);
      });
   });

   function buildCommand(filename) {

      var gmat = path.resolve(__dirname, './gmat-dist/R2016a/bin/GmatConsole');
      var command = gmat + ' ' + filename;
      return command;
   }
}


function deleteFile(filename) {
   fs.unlink(filename,function(err) {
      if (err) {
         console.log(err);
      }
   });
}

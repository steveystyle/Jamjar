'use strict'

const express = require('express')
const fs = require('fs');
const path = require('path');

module.exports = function (parent, options) {
    const controllerDir = path.join(__dirname, '../controllers');
    var verbose = options.verbose;
    fs.readdirSync(controllerDir).forEach(function (name) {
        var file = path.join(controllerDir, name);
        verbose && console.log('\n %s:', name);
        var cObj = require(file);
        var name = cObj.name || name;
        var suffix = cObj.suffix || '';
        var app = express();
        var handler;
        var method;
        var url;
        for (var key in cObj) {
            if (~['name', 'suffix', 'before'].indexOf(key)) continue;
            switch (key) {
                case 'home':
                    method = 'get';
                    url = '/';
                    break;
                case 'menus':
                    method = 'get';
                    url = '/' + name;
                    break;
                case 'lunch':
                    method = 'get';
                    url = '/' + name + '/' + key;
                    break;
                case 'dinner':
                    method = 'get';
                    url = '/' + name + '/' + key;
                    break;
                default:
                    throw new Error('route ' + name + '.' + key + ' not set in switch case.' + url);
            }
            handler = cObj[key];
            url = url + suffix;
            if (cObj.before) {
                app[method](url, cObj.before, handler);
                verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), url, key);
            } else {
                app[method](url, handler);
                verbose && console.log('     %s %s -> %s', method.toUpperCase(), url, key);
            }
        }
        parent.use(app);
    });
};



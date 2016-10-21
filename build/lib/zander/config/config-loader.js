"use strict";
var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var SimpleFilePathMatchLoader = (function () {
    function SimpleFilePathMatchLoader(configPath) {
        this.configPath = configPath;
    }
    SimpleFilePathMatchLoader.prototype.loadConfig = function () {
        var _this = this;
        var configuration = [];
        return new Promise(function (resolve, reject) {
            var promise;
            _this.configPath.forEach(function (val) {
                var configFilePath = path.join(process.cwd(), val);
                promise = _this.parseFile(configFilePath);
                promise.then(function (data) {
                    configuration.push(data);
                });
            });
            promise.then(function () {
                resolve(configuration);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    SimpleFilePathMatchLoader.prototype.parseFile = function (configFilePath) {
        return new Promise(function (resolve, reject) {
            fs.readFile(configFilePath, function (err, data) {
                if (err)
                    return reject(err);
                resolve(data);
            });
        });
    };
    return SimpleFilePathMatchLoader;
}());
exports.SimpleFilePathMatchLoader = SimpleFilePathMatchLoader;
var WildcardFilePathConfigLoader = (function () {
    function WildcardFilePathConfigLoader(wildcardPath) {
        this.wildcardPath = wildcardPath;
    }
    WildcardFilePathConfigLoader.prototype.loadConfig = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.resolvePaths()
                .then(function (files) {
                var configuration = new Array();
                var promise;
                files.forEach(function (val) {
                    var configFilePath = path.join(process.cwd(), val);
                    promise = _this.parseFile(configFilePath);
                    promise.then(function (data) {
                        configuration.push(data);
                    });
                });
                promise
                    .then(function () {
                    resolve(configuration);
                })
                    .catch(function (err) {
                    reject(err);
                });
            });
        });
    };
    WildcardFilePathConfigLoader.prototype.resolvePaths = function () {
        var _this = this;
        var files = new Array();
        return new Promise(function (resolve, reject) {
            var wildPathCount = _this.wildcardPath.length;
            _this.wildcardPath.forEach(function (val) {
                glob(val, function (err, matches) {
                    Array.prototype.push.apply(files, matches);
                    if (--wildPathCount == 0) {
                        resolve(files);
                    }
                });
            });
        });
    };
    WildcardFilePathConfigLoader.prototype.parseFile = function (configFilePath) {
        return new Promise(function (resolve, reject) {
            fs.readFile(configFilePath, function (err, data) {
                if (err)
                    return reject(err);
                resolve(data);
            });
        });
    };
    return WildcardFilePathConfigLoader;
}());
exports.WildcardFilePathConfigLoader = WildcardFilePathConfigLoader;

//# sourceMappingURL=config-loader.js.map

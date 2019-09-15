#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const copy = require("fs-extra").copy;
class Builder {
    constructor(args, dir) {
        this.arguments = [''];
        this.appName = 'awesome-wasm-app';
        this.directory = '';
        this.arguments = args;
        this.directory = dir;
    }
    build() {
        this.setAppInfo();
        this.createApp();
    }
    listArguments() {
        this.arguments.forEach(function (val, index, array) {
            console.log(index + ': ' + val);
        });
    }
    setAppName(name) {
        this.appName = name;
    }
    setAppInfo() {
        if (Builder.checkCommandLineArguments(this.arguments)) {
            this.setAppName(this.arguments[2]);
        }
    }
    createApp() {
        if (Builder.isAppNameValid(this.appName, this.directory)) {
            fs_1.mkdirSync(this.appName);
        }
        // copy source folder to destination
        copy(`${__dirname}/../src/includes`, `${this.directory}/${this.appName}`, function (err) {
            if (err) {
                console.log('An error occured while copying the folder.');
                return console.error(err);
            }
            console.log('App Created!');
        });
    }
    static isAppNameValid(name, directory) {
        try {
            fs_1.statSync(`${directory}/${name}`);
            if (Builder.isFolderEmpty(name)) {
                return true;
            }
            return false;
        }
        catch (e) {
            return true;
        }
    }
    static checkCommandLineArguments(args) {
        return args.length >= 3;
    }
    static isFolderEmpty(path) {
        return fs_1.readdirSync(path).length == 0;
    }
}
exports.Builder = Builder;
const builder = new Builder(process.argv, process.cwd());
builder.build();
//# sourceMappingURL=main.js.map
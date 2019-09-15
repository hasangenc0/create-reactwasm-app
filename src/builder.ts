#! /usr/bin/env node

import {statSync, mkdirSync, readdirSync} from 'fs';
const copy = require("fs-extra").copy;

export class Builder {
  arguments: Array<string> = [''] ;
  appName: string = 'awesome-wasm-app';
  directory: string = '';

  constructor(args: Array<string>, dir: string) {
    this.arguments = args;
    this.directory = dir;
  }

  build() : void {
    this.setAppInfo();

    this.createApp();
  }

  listArguments() : void {
    this.arguments.forEach(function (val, index, array) {
      console.log(index + ': ' + val);
    });
  }

  setAppName(name:string) {
    this.appName = name;
  }

  setAppInfo() : void {
    if(Builder.checkCommandLineArguments(this.arguments)) {
      this.setAppName(this.arguments[2]);
    }
  }

  createApp() : void {
    if(Builder.isAppNameValid(this.appName, this.directory)) {
      mkdirSync(this.appName);
    }

    // copy source folder to destination
    copy(`${__dirname}/../src/includes`, `${this.directory}/${this.appName}`, function (err: any) {
      if (err){
          console.log('An error occured while copying the folder.')
          return console.error(err)
      }
      console.log('App Created!')
    });

  }

  static isAppNameValid(name: string, directory: string): boolean {
    try {
      statSync(`${directory}/${name}`);
      if (Builder.isFolderEmpty(name)) {
        return true;
      }
      return false
    } catch(e) {
      return true;
    }
  }

  static checkCommandLineArguments(args: Array<string>): boolean {
    return args.length >= 3;
  }

  static isFolderEmpty(path: string) : boolean {
    return readdirSync(path).length == 0;
  }
}

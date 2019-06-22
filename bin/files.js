"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
class Files {
    static copyFileSync(source, target) {
        var targetFile = target;
        //if target is a directory a new file with the same name will be created
        if (fs.existsSync(target)) {
            if (fs.lstatSync(target).isDirectory()) {
                targetFile = path.join(target, path.basename(source));
            }
        }
        fs.writeFileSync(targetFile, fs.readFileSync(source));
    }
    static copyFolderRecursiveSync(source, target) {
        let self = this;
        var files = [];
        //check if folder needs to be created or integrated
        var targetFolder = path.join(target, path.basename(source));
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder);
        }
        //copy
        if (fs.lstatSync(source).isDirectory()) {
            files = fs.readdirSync(source);
            files.forEach(function (file) {
                var curSource = path.join(source, file);
                if (fs.lstatSync(curSource).isDirectory()) {
                    self.copyFolderRecursiveSync(curSource, targetFolder);
                }
                else {
                    self.copyFileSync(curSource, targetFolder);
                }
            });
        }
    }
}
exports.Files = Files;
//# sourceMappingURL=files.js.map
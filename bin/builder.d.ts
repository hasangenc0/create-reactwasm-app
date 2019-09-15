#! /usr/bin/env node
export declare class Builder {
    arguments: Array<string>;
    appName: string;
    directory: string;
    constructor(args: Array<string>, dir: string);
    build(): void;
    listArguments(): void;
    setAppName(name: string): void;
    setAppInfo(): void;
    createApp(): void;
    static isAppNameValid(name: string, directory: string): boolean;
    static checkCommandLineArguments(args: Array<string>): boolean;
    static isFolderEmpty(path: string): boolean;
}

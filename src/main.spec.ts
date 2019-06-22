import { Builder } from './main'

test('Checks command line arguments', () => {
  const args: Array<string> = ['/usr/local/bin/node', '/usr/local/bin/create-wasm-app', 'app_name'];
  expect(Builder.checkCommandLineArguments(args)).toBe(true);
});

test('Checks is the folder name already exists', () => {
  expect(Builder.isAppNameValid('folder', process.cwd())).toBe(true);
});

test('Checks is the folder empty', () => {
  expect(Builder.isFolderEmpty('src')).toBe(false);
});

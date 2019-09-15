import { Builder } from './builder'

const builder = new Builder(process.argv, process.cwd());

builder.build();

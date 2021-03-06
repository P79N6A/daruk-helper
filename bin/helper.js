#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const help = require('../src')
const template = Object.keys(require('../template')).join('、')

program
  .version(require('../package').version, '-v, --version')
  // .usage('<command> [options]')

program
  .command('help [dirnames...]')
  // .option('-g, --generate', 'generate dir, default: service plugins')
  .option('-t, --typings', `scanning dir generate typings default: ${template}`)
  .description('daruk helper tools')
  .action((dirnames, options) => {
    options = options || dirnames
    if (!Array.isArray(dirnames)) {
      dirnames = []
    }
    help(dirnames, options)
  })

program.on('command:*', function () {
  console.error(chalk.red('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' ')))
  process.exit(1)
})

program.parse(process.argv)

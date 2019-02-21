#!/usr/bin/env node
const { prompt } = require('enquirer');
const fs = require('fs');
const colors = require('ansi-colors');

const vp_theme = {
    styles: {
      primary: colors.blue,
      muted: colors.yellow
    }
  }
  

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const setup = async () => {
    const response = await prompt([
        {
            type: 'select',
            name: 'project-choice',
            message: 'What project template would you like to generate?',
            theme: vp_theme,
            choices: CHOICES
        },
        {
            type: 'input',
            name: 'project-name',
            message: 'Project name:',
            validate: function (input) {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                else return 'Project name may only include letters, numbers, underscores and hashes.';
            }
        }
    ]);

    console.log(response);
}

setup();



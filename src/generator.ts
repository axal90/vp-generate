import { prompt } from 'enquirer';
import { promises as fs } from 'fs';
import { MoveFiles } from './move-files';
import { Answers } from './interfaces/answers';

export class Generator {

    constructor(){
        this.setup();
    }

    getChoices = async () => {
        return await fs.readdir(`${__dirname}/templates`);
    }

    setup = async () => {
        const choices = await this.getChoices();
        const answers: Answers = await prompt([
            {
                type: 'select',
                name: 'projectChoice',
                message: 'What project template would you like to generate?',
                choices: choices
            },
            {
                type: 'input',
                name: 'projectName',
                message: 'Project name:',
                validate: function (input) {
                    if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                    else return 'Project name may only include letters, numbers, underscores and hashes.';
                }
            }
        ]);
    
        new MoveFiles(answers);
        
    }

}
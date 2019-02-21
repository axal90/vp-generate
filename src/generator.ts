import { prompt } from 'enquirer';
import { promises as fs } from 'fs';
import { MoveFiles } from './move-files';
import { Answers } from './interfaces/answers';
import { resolve } from 'path';

export class Generator {

    private templates: string[];

    constructor(){
        this.setup();
        this.templates = [];
    }

    setTemplates = async () => {
        try {
            this.templates = await fs.readdir(resolve(__dirname, '../templates'));
        } catch (error) {
            console.error(error);
        }
    }

    setup = async () => {
        await this.setTemplates();
        const answers: Answers = await prompt([
            {
                type: 'select',
                name: 'projectChoice',
                message: 'What project template would you like to generate?',
                choices: this.templates
            },
            {
                type: 'input',
                name: 'projectName',
                message: 'Project name:',
                validate: function (input: string) {
                    if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                    else return 'Project name may only include letters, numbers, underscores and hashes.';
                }
            }
        ]);
    
        new MoveFiles(answers);
        
    }

}
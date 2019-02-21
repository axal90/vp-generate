import { promises as fs } from 'fs';
import { Answers } from './interfaces/answers';
export class MoveFiles {

    private projectChoice: string;
    private projectName: string;
    private templatePath: string;
    private currentDirr: string;

    constructor(answers: Answers) {

        this.projectChoice = answers['projectChoice'];
        this.projectName = answers['projectName'];
        this.templatePath = `${__dirname}/templates/${this.projectChoice}`;
        this.currentDirr = process.cwd();

        fs.mkdir(`${this.currentDirr}/${this.projectName}`).then(() => {
            this.run(this.templatePath, this.projectName);
        });

    }

    run = async (templatePath: string, projectName: string) => {
        const filesToCreate = await fs.readdir(templatePath);

        filesToCreate.forEach(async file => {

            const origFilePath = `${templatePath}/${file}`;
            const newFilePath = `${this.currentDirr}/${projectName}/${file}`;

            try {
                const origHandle = await fs.open(origFilePath, 'r');

                const stat = await origHandle.stat();

                if (stat.isDirectory()) {
                    try {
                        fs.mkdir(newFilePath);
                    } finally {
                        this.run(origFilePath, `${projectName}/${file}`);
                        return
                    }
                }

                const contents = await origHandle.readFile( 'utf8');

                if (file === '.npmignore') file = '.gitignore';

                const newHandle = await fs.open(newFilePath, 'w');
                newHandle.writeFile(contents, 'utf8');

                if (origHandle !== undefined)
                    await origHandle.close();

                if (newHandle !== undefined)
                    await newHandle.close();

            } catch (err) {
                console.error(err);
            }
        });
    }
}
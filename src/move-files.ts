import { promises as fs } from 'fs';
import { Answers } from './interfaces/answers';

export class MoveFiles {

    private projectChoice: string;
    private projectName: string;
    private templateRoot: string;
    private projectRoot: string;

    constructor(answers: Answers) {

        this.projectChoice = answers['projectChoice'];
        this.projectName = answers['projectName'];
        this.templateRoot = `${__dirname}/templates/${this.projectChoice}`;
        this.projectRoot = `${process.cwd()}/${this.projectName}`;


        this.createRoot();

        this.loop(this.templateRoot, this.projectName);

    }

    createRoot = async () => {
        try {
            await fs.mkdir(this.projectRoot, {recursive: true});
        } catch (error) {
            console.error(error);
        }
        
    }

    loop = async (templatePath: string, workingDirr: string) => {
        const filesToCreate = await fs.readdir(templatePath);

        this.createFiles(templatePath, workingDirr, filesToCreate);

    }

    createFiles = async (templatePath: string, workingDirr: string, filesToCreate: string[]) => {

        filesToCreate.forEach(async file => {

            const origFilePath = `${templatePath}/${file}`;

            try {
                const origFileHandle = await fs.open(origFilePath, 'r');

                const stat = await origFileHandle.stat();

                if (stat.isDirectory()) {
                    this.handleDirectory(origFilePath, workingDirr, file);
                } else {
                    this.handleFile(origFileHandle, workingDirr, file);
                }
            } catch(error) {
                console.error(error);
            }
            
        });
    }

    handleDirectory = async (origFilePath: string, workingDirr: string, file: string) => {
        const newDirPath = `${this.projectRoot}/${workingDirr}/${file}`;
        try {
            fs.mkdir(newDirPath);
        } finally {
            this.loop(origFilePath, `${workingDirr}/${file}`);
            return
        }
    }

    handleFile = async (origFileHandle: fs.FileHandle, workingDirr: string, file: string) => {
        // Fix issue with npm renamin .gitignorefiles.
        if (file === '.npmignore') file = '.gitignore';

        const newFilePath = `${this.projectRoot}/${workingDirr}/${file}`;

        try {

            const contents = await origFileHandle.readFile( 'utf8');

            const newHandle = await fs.open(newFilePath, 'w');

            newHandle.writeFile(contents, 'utf8');

            if (origFileHandle !== undefined)
                await origFileHandle.close();

            if (newHandle !== undefined)
                await newHandle.close();

        } catch (error) {
            console.error(error);
        }
    }
}
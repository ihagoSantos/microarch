import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

async function createArchitecture(name, extension){
    const architecture = await readFile(name)
    await createStructure(architecture, extension)
}

async function readFile(filename) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, `../architectures/${filename}.json`)
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

async function createStructure(template, extension, pathRoot) {
    if(!template || template.length === 0){
        return;
    }
    
    for(let t of template){
        try {
            await fs.access(t.name)
        } catch (error) {
            const path = pathRoot ? pathRoot + '/' + t.name: t.name;
            if(!t.files){
                return await createFile(path, extension, t.content)
            }else {
                
                await createFolder(path);
                await createStructure(t.files, extension, path);
            }
        }    
    }

}

async function createFolder(name){
    try {
        await fs.access(name)
    } catch (error) {
        await fs.mkdir(name);    
    }
}

async function createFile(name, extension = 'js', content = ''){
    try {
        await fs.readFile(name)
    } catch (error) {
        fs.writeFile(`${name}.${extension || 'js'}`, content)
    }
}

export default createArchitecture;
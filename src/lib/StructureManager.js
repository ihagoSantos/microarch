import fs from 'fs/promises';

export default class StructureManager {
    fileManager;
    constructor(fileManager) {
        this.fileManager = fileManager;
    }
    async createStructure(structure, extension, pathRoot) {
        if(!structure || Object.keys(structure).length === 0){
            return;
        }
        if(typeof structure === 'string'){
            if(await this.fileManager.verifyIfFileExists(structure)) {
                return await this.fileManager.copyFile(structure, pathRoot);
            }

            return await this.fileManager.createFile(pathRoot, extension, '');
        }
        
        for(let key of Object.keys(structure)){
            try {
                await fs.access(key)
            } catch (error) {

                if(Array.isArray(structure[key])){
                    for(let i = 0; i < structure[key].length; i++){
                        const path = pathRoot ? pathRoot + '/' + structure[key][i]: structure[key][i];
                        await this.createStructure(structure[key][i], extension, path);
                    }
                }
                else {
                    const path = pathRoot ? pathRoot + '/' + key: key;
                    await this.fileManager.createFolder(path);
                    await this.createStructure(structure[key], extension, path);
                    
                    
                }
                
            }    
        }
    }

}
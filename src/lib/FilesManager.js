import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import fs from 'fs/promises';

export default class FilesManager {
    
    getDirName() {
        const filename = fileURLToPath(import.meta.url);
        return path.dirname(filename);
    }
    getFilePath(filePath) {
        return path.join(
                this.getDirName(), 
                filePath
            );
    } 
    async getArchitectureAsJson(filename) {
        try {
            const filePath = this.getFilePath(`../architectures/json/${filename}.json`);
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getArchitectureAsYaml(filename) {
        try {
            const filePath = await this.getFilePath(`../architectures/yaml/${filename}.yml`);
            const data = await yaml.load(await fs.readFile(filePath), 'utf-8');
            return data;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createFolder(name){
        try {
            await fs.access(name)
        } catch (error) {
            await fs.mkdir(name);    
        }
    }
    
    async createFile(name, extension = 'js', content = ''){
        try {
            await fs.readFile(name);
        } catch (error) {
            await fs.writeFile(`${name}.${extension || 'js'}`, content)
        }
    }

    async verifyIfFileExists(file) {
        try {
            await fs.access(file)
            return true;
        } catch (error) {
            return false;
        }
    }
    
    async copyFile(origin, destination) {
        try {
            const file = await path.basename(origin);
            destination = destination.replace(origin, '')
            return await fs.copyFile(origin, `${destination}/${file}`);
        } catch (error) {
            throw error;
        }
    }
}
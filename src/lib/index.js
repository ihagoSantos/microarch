import FilesManager from "./FilesManager.js";
import StructureManager from "./StructureManager.js";


async function createArchitecture(name, extension){
    const filesManager = new FilesManager();
    const structureManager = new StructureManager(filesManager);
    // const architecture = await filesManager.getArchitectureAsJson(name);
    const architecture = await filesManager.getArchitectureAsYaml(name)

    if(!extension)
        extension = architecture.extension;

    await structureManager.createStructure(architecture.structure, extension)
}

export default createArchitecture;
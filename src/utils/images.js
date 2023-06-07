const sizeOf = require("buffer-image-size");
const path = require('path');

const ORIGINAL_FOLDER = 'original'
const OUTPUT_PATH = './output'

const getResolutionFromBuffer = (imageBuffer) => {
    let resolution = {
        width: null,
        height: null
    };
    try {
        resolution = sizeOf(imageBuffer);
    } catch (err) {
        throw new Error(`Imposible to get resolution: ${err.message || err}`);
    }
    return resolution;
}

const getPath = (imageFile, md5AsNewName, widthAsFolderName = ORIGINAL_FOLDER) => {
    const fileExt = path.extname(imageFile.name)
    const fileName = path.basename(imageFile.name, fileExt)
    const newPath = path.join(OUTPUT_PATH, fileName, widthAsFolderName);
    const finalPath = path.join(newPath, `${md5AsNewName}${fileExt}`);
    return {
        finalPath,
        newPath 
    }
}

const getImageInfo = (data) => {
    
    const now = new Date().toLocaleString("en-US", {timezone: "UTC"});
    const {md5, path, file} = data
    const {width, height} = getResolutionFromBuffer(file.data)
    return {
        id: md5,
        md5,
        resolution: {
            width, height
        },
        path,
        createdAt: now,
        updatedAt: now
    }
}

module.exports = {
    getResolutionFromBuffer,
    getImageInfo,
    getPath
}
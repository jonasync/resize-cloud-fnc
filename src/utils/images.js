const crypto = require('crypto');

const sizeOf = require("buffer-image-size");
const path = require('path');

const { ORIGINAL_FOLDER, OUTPUT_PATH } = require("./CONSTANTS");

const getResolutionFromBuffer = (imageBuffer) => {
    let resolution = {};
    try {
        resolution = sizeOf(imageBuffer);
    } catch (err) {
        throw new Error(`Imposible to get resolution: ${err.message || err}`);
    }
    return {
        width: resolution.width || null,
        height: resolution.height || null
    };
}

const getPath = (imageName, md5AsNewName, widthAsFolderName = ORIGINAL_FOLDER) => {
    const fileExt = path.extname(imageName)
    const fileName = path.basename(imageName, fileExt)
    const newPath = path.join(OUTPUT_PATH, fileName, widthAsFolderName);
    const finalPath = path.join(newPath, `${md5AsNewName}${fileExt}`);
    return {
        finalPath,
        newPath 
    }
}

const getImageInfo = (data) => {
    
    const now = new Date().toLocaleString("en-US", {timezone: "UTC"});
    const {path, file} = data
    const {width, height} = getResolutionFromBuffer(file)
    const md5 = getHash(file)
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


const getHash = (bufferImage) => {
  return crypto.createHash("md5").update(bufferImage).digest("hex")
};

module.exports = {
    getResolutionFromBuffer,
    getImageInfo,
    getPath,
    getHash
}
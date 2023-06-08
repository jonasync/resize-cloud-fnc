const fs = require('fs');
const axios = require('axios');

const { RESIZE_FNC_URL, THUMB_VERSIONS, STATUS } = require('../utils/CONSTANTS');
const { getHash, getPath, getImageInfo } = require('../utils/images');
const { saveImage } = require('../database/Image');
const { newTask, saveTask, updateTaskById } = require('../database/Task');

const launchResizeImage = async (originalImageBuffer, fileName, width) => {
    try {
        const formData = new FormData();
        const blobFromBuffer = new Blob([originalImageBuffer]);
        formData.append('image', blobFromBuffer, fileName);
        formData.append('width', width)

        return await axios.post(RESIZE_FNC_URL, formData)
        .then((scaledImage) => { return scaledImage; })
        .catch((err) => {
            throw { 
                status: err.status || 500, 
                message: err.message || `Error creating ${width} version of ${fileName}`
            }
        })
        .finally(function () { console.info('Request with cloud-functions ends') });

    } catch (err) {
        throw { status: err.status || 500, message: err.message || 'Mal'}
    }
    
}

const createResizedVersions = async (parentId, image, originalname) => {
    try {
        for await (let version of THUMB_VERSIONS) {
            const { data: imageResized } = await launchResizeImage(image, originalname, version);
            
            for await (let resize of imageResized) {
                const buffer = Buffer.from(resize.image.data);
                const width = resize.width;
                const md5Name = getHash(buffer)
                const path = getPath(originalname, md5Name, String(width))
                const newImageInfo = getImageInfo({
                    file: buffer, 
                    path: path.finalPath, 
                    md5Name
                });
    
                await saveImage(newImageInfo);
                const taskToSave = newTask({ id: md5Name, path: path.finalPath, status: STATUS.DONE, parentId})
                await saveTask(taskToSave)
    
                fs.mkdirSync(path.newPath, { recursive: true }); 
                fs.writeFile(path.finalPath, buffer, "binary", (err) => {
                    if (err) {throw { status: err?.status || 500, message: err?.message || `Error saving resized image on: ${path.finalPath}`}}
                    if (!err) console.log(`${md5Name} created successfully!`);
                });
            }
        }
        await updateTaskById(parentId, { status: STATUS.DONE });
    } catch (err) {
        throw { status: err?.status || 500, message: err?.message || 'Error resizing images'}
    }
}

module.exports = {
    createResizedVersions
}
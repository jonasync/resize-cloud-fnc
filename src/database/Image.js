const {db} = require('./index');
const { getResolutionFromBuffer } = require("../utils/images");

const imagesRef = db.collection('images');


const saveImage = async (image) => {
    try {
        await imagesRef.doc(image.id).set(image);
        return image;
    } catch (error) {
        throw { status: 500, message: error.message || error }
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
    getImageInfo,
    saveImage
};
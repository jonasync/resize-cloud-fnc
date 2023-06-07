const {db} = require('./index');

const imagesRef = db.collection('images');


const saveImage = async (image) => {
    try {
        await imagesRef.doc(image.id).set(image);
        return image;
    } catch (error) {
        throw { status: 500, message: error.message || error }
    }
}


module.exports = {
    saveImage
};
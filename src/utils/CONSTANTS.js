const cloud_resize_fnc = 'https://us-central1-kds-pruebastec.cloudfunctions.net/jon-resize--inditex';


const RESIZE_FNC_URL = cloud_resize_fnc;
const ORIGINAL_FOLDER = 'original'
const OUTPUT_PATH = './output'
const STATUS = {
    PROCESSING: "PROCESSING",
    DONE: "DONE",
    PENDING: "PENDING"
}

const THUMB_VERSIONS = [1200, 800]

module.exports = {
    RESIZE_FNC_URL,
    ORIGINAL_FOLDER,
    OUTPUT_PATH,
    STATUS,
    THUMB_VERSIONS
}
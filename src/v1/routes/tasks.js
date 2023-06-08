const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const tasksController = require('../../controllers/tasksController')

router
    .get('/:taskId', tasksController.getTaskById )
    .post('/', fileUpload({
        createParentPath: true,
        limits: {
            fileSize: 10000000 //10mb
        },
        abortOnLimit: true
    }), tasksController.createTask )

module.exports = router;
const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const tasksController = require('../../controllers/tasksController')

router
    .get('/:taskId', tasksController.getTaskById )
    .post('/', fileUpload({createParentPath: true}), tasksController.createTask )

module.exports = router;
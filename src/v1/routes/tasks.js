const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/tasksController')

router
    .get('/:taskId', tasksController.getTaskById )
    .post('/', tasksController.postTask )

module.exports = router;
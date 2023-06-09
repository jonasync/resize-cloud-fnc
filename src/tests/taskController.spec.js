const request = require("supertest");

const app = require("../index");

const TaskService = require('../services/tasksService')

const apiPath = '/api/v1';
const filePath = `${__dirname}/assets`;

describe('Testing Task', () => {
    describe('get task route', () => {
        const taskId = 'something'
        test('the route exist and resolve with a json', () => {
            request(app)
                .get(`${apiPath}/task/${taskId}`)
                .expect('Content-Type', /json/)
        })
    
        test('the task does not exists', () => {
            request(app)
                .get(`${apiPath}/task/${taskId}`)
                .expect(404, {
                    status: 'FAILED',
                    data: {error: 'Task not found'}
                  });
        })
    })

    describe('post task route', () => {
        
        test('exists and resolve with a json', () => {
            request(app)
                .post(`${apiPath}/task`)
                .expect('Content-Type', /json/);
        })
        
        test('response with 400 for no file added', () => {
            request(app)
                .post(`${apiPath}/task`)
                .expect(400, {
                    status: 'FAILED',
                    data: {error: 'The File is empty'}
                });
        })
        
        test('should response with 400 for sending multiple files at the same time added', async () => {

            const route = `${apiPath}/task`;
            await request(app)
                .post(route)
                .field('field', 'testing')
                .attach('file', `${filePath}/pb.webp`)
                .attach('file', `${filePath}/zara.jpeg`)
                .expect(400, {
                    status: 'FAILED',
                    data: {error: 'You must to select one image'}
                });
                
        })
        
        test('should response with 400 for sending the wrong mimetype file', async () => {
            jest.spyOn(TaskService, 'postTask').mockReturnValueOnce({ id: 'taskId' })
            const route = `${apiPath}/task`;
            await request(app)
                .post(route)
                .field('field', 'testing')
                .attach('file', `${filePath}/zara.jpeg`)
                .expect(201, {
                    status: 201,
                    data: {task: 'taskId'}
                });
                
        })
    })
})

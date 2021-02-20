const supertest = require('supertest');
const app = require('./app');

test('data filled successfully' , async() => {
    await request(app).post('/')
    .send({
        name: 'Test' , 
        voting_choie: 'true' , 
        casted_at: '2021-09-08'
    }).expect(200)
})
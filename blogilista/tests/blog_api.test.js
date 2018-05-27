const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)


test('all blogs are returned as json by GET /api/blogs', async () => {

    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    server.close()
})
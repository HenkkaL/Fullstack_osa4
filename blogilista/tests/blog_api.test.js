const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)


test('all blogs are returned as json by GET /api/blogs', async () => {

    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})



test('new blog can be added ', async () => {
    const newBlog = {
        "title": "testitestiTesti",
        "author": "author",
        "url": "urli",
        "likes": 4
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
})

test('new blog with undefined likes can be added ', async () => {
    const newBlog = {
        "title": "testitestiTesti",
        "author": "author",
        "url": "urli"
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
})


afterAll(() => {
    server.close()
})


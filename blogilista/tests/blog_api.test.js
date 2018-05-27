const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const helper = require('./test_helper')


test('all blogs are returned as json by GET /api/blogs', async () => {

    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


describe('addition of a new blog', async () => {

    test('new blog can be added ', async () => {
        const newBlog = {
            "title": "testitestiTesti",
            "author": "author",
            "url": "urli",
            "likes": 4
        }

        const blogsBefore = await helper.blogsInDb()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length + 1)
        expect(blogsAfter).toContainEqual(newBlog)

    })

    test('new blog with undefined likes can be added ', async () => {
        const newBlog = {
            "title": "testitestiTesti",
            "author": "author",
            "url": "urli"
        }

        const blogsBefore = await helper.blogsInDb()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await helper.blogsInDb()
        newBlog.likes = 0

        expect(blogsAfter.length).toBe(blogsBefore.length + 1)
        expect(blogsAfter).toContainEqual(newBlog)
    })

    test('new blog with empty url is rejected ', async () => {
        const newBlog = {
            "title": "testitestiTesti",
            "author": "author",
            "likes": 4
        }

        const blogsBefore = await helper.blogsInDb()


        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)


        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length)

    })

    test('new blog with empty title is rejected ', async () => {
        const newBlog = {
            "author": "author",
            "url": "urli",
            "likes": 4
        }

        const blogsBefore = await helper.blogsInDb()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length)
    })
})

afterAll(() => {
    server.close()
})


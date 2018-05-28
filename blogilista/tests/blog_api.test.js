const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

describe('on initialized blog database', async () => {
    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = helper.initialBlogs.map(b => new Blog(b))
        await Promise.all(blogObjects.map(b => b.save()))
    })

    test('all blogs are returned as json by GET /api/blogs', async () => {

        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })


    describe('addition of a new blog', async () => {

        test('new blog can be added ', async () => {
            const newBlog = {
                'title': 'testitestiTesti',
                'author': 'author',
                'url': 'urli',
                'likes': 4
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
                'title': 'testitestiTesti',
                'author': 'author',
                'url': 'urli'
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
                'title': 'testitestiTesti',
                'author': 'author',
                'likes': 4
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
                'author': 'author',
                'url': 'urli',
                'likes': 4
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

    describe('deletion of a blog', async () => {
        let addedBlog

        beforeAll(async () => {
            addedBlog = new Blog({
                'title': 'deleteTestTitle',
                'author': 'deleteTestAuthor',
                'url': 'deleteTestUrli',
                'likes': 4
            })
            await addedBlog.save()
        })

        test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
            const blogsAtStart = await helper.blogsInDb()

            await api
                .delete(`/api/blogs/${addedBlog._id}`)
                .expect(204)

            const blogsAfterOperation = await helper.blogsInDb()

            const authors = blogsAfterOperation.map(r => r.author)

            expect(authors).not.toContain(addedBlog.author)
            expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
        })
    })

    afterAll(() => {
        server.close()
    })
})
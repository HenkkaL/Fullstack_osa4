
const Blog = require('../models/blog')

const initialBlogs = [
    {

        "title": "testi1",
        "author": "author1",
        "url": "urli1",
        "likes": 4

    },
    {
        "title": "testi2",
        "author": "author2",
        "url": "urli2",
        "likes": 4
    }
]

const format = (blog) => {
    return {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes
    }
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

module.exports = {
    initialBlogs, format, blogsInDb
}
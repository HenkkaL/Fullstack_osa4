
const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
    const users = await User.find({})
    return users
  }

module.exports = {
    initialBlogs, format, blogsInDb, usersInDb
}
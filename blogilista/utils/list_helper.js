const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0)
        return 0
    const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0)
        return null
    const reducer = (max, item) => {
        return item.likes > max.likes ? item : max
    }

    return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0)
        return null

    let authors = []

    const updateAuthors = (author) => {
        const index = authors.findIndex(item => item.author === author)
        if (index === -1)
            authors.push({ author: author, blogs: 1 })
        else
            authors[index].blogs += 1
    }

    blogs.forEach((blog) => {
        updateAuthors(blog.author)
    })

    const reducer = (max, item) => {
        return item.blogs > max.blogs ? item : max
    }

    return authors.reduce(reducer, authors[0])
}

const mostLikes = (blogs) => {
    if (blogs.length === 0)
        return null

    let authors = []

    const updateAuthors = (blog) => {
        const index = authors.findIndex(item => item.author === blog.author)
        if (index === -1)
            authors.push({ author: blog.author, likes: blog.likes })
        else
            authors[index].likes += blog.likes
    }

    blogs.forEach((blog) => {
        updateAuthors(blog)
    })

    const reducer = (max, item) => {
        return item.likes > max.likes ? item : max
    }

    return authors.reduce(reducer, authors[0])
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
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

  module.exports = {
    dummy, totalLikes, favoriteBlog
  }
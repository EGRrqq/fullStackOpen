const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0
    const reducer = (sum, blog) => sum + blog.likes

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce(function (previousValue, currentValue) {
        return previousValue.likes > currentValue.likes ? previousValue : currentValue
    })
    return favorite
}

const mostBlogs = (blogs) => {
    const authorWithMostBlogs = _.chain(blogs)
        .groupBy('author')
        .map((group, author) => {
            return {
                author: author,
                blogs: group.length,
            }
        })
        .maxBy('blogs')
        .value()
    return { ...authorWithMostBlogs }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
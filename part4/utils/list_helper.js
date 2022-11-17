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

module.exports = { dummy, totalLikes, favoriteBlog }
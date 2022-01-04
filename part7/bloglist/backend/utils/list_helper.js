const _ = require('lodash')
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (acc, blog) => {
    if (blog.likes > acc.likes) {
      return blog.likes
    }
    return acc
  }
  return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0])
}

const favoriteWriter = (blogs) => {
  const reducer = (acc, blog) => {
    if (blog.likes > acc.likes) {
      return { title: blog.title, author: blog.author, likes: blog.likes }
    }
    return acc
  }
  return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  const getAllAuthors = _.countBy(blogs, function(o) { return o.author })
  const authorName = _.maxBy(_.keys(getAllAuthors), function (o) { return getAllAuthors[o] })
  const authorWithNumberOfBlog = _.pick(getAllAuthors,authorName)
  var author = {}
  author['author'] = authorName
  author['blogs'] = authorWithNumberOfBlog[authorName]
  return author
}

const mostLikes = (blogs) => {
  const authorWithLikes = _(blogs)
    .groupBy('author')
    .map(function(group, author) {
      return {
        author: author,
        likes: _.sum(_.map(group, 'likes'))
      }
    }).value()
  return _.maxBy(authorWithLikes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  favoriteWriter,
  mostBlogs,
  mostLikes
}

const addBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

const modifyBlog = (id, blogData) => {
  return {
    id,
  }
}

const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: 'title',
      content: 'content',
      author: 'zzw',
      createTime: '456'
    }
  ]
}

const getDetail = (id = 0) => {
  return {
    id,
    name: 'zzw'
  }
}

const deleteBlog = id => {
  return {
    id
  }
}
module.exports = {
  getList,
  getDetail,
  addBlog,
  modifyBlog,
  deleteBlog
}

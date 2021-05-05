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
module.exports = {
    getList,
    getDetail
}

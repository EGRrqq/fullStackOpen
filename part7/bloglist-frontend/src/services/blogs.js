import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (blogObj) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, blogObj, config)
    return response.data
}

const update = async (updatedBlogObj) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(
        `${baseUrl}/${updatedBlogObj.id}`,
        updatedBlogObj,
        config
    )
    return response.data
}

const remove = async (blogId) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response.data
}

const addComment = async (content, blogId) => {
    const response = await axios.post(`${baseUrl}/${blogId}/comments`, content)
    return response.data
}

export default { setToken, getAll, create, update, remove, addComment }

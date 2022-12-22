import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        removeBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload)
        },
        likeFor(state, action) {
            return state.map((blog) =>
                blog.id === action.payload.id ? action.payload : blog
            )
        },
    },
})

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blogObj) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blogObj)
        dispatch(appendBlog(newBlog))
    }
}

export const deleteBlog = (blogId) => {
    return async (dispatch) => {
        await blogService.remove(blogId)
        dispatch(removeBlog(blogId))
    }
}

export const likeBlog = (updatedBlogObj) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.update(updatedBlogObj)
        dispatch(likeFor(updatedBlog))
    }
}

export const { setBlogs, appendBlog, removeBlog, likeFor } = blogSlice.actions
export default blogSlice.reducer

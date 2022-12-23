import React from 'react'

const Comments = ({ comments }) => {
    return (
        <>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>{comment.content}</li>
                    ))}
                </ul>
            ) : (
                <p>no comments yet...</p>
            )}
        </>
    )
}

export default Comments

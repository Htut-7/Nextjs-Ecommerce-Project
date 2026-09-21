import { IComment } from '@/database/comment.model'
import React from 'react'
import DataRenderer from './DataRenderer'
import CommentCard from './CommentCard'

function CommentList({comments, success, errorMessage, totalComments} : {
    comments: IComment[],
    success: boolean,
    errorMessage?: string,
    totalComments: number,
}) {
  return (
    <div className='mt-8'>
      <h3 className='font-bold text-xl'>Comment List | Total Comments - {totalComments}</h3>

      <DataRenderer success={success} errorMessage={errorMessage} data={comments}
        render={(comments)=>{
            return comments.map((comment)=>{
                return <CommentCard comment={comment} key={comment._id.toString()}/>
            })
        }}
      />
    </div>
  )
}

export default CommentList


import React from 'react'
import DataRenderer from './DataRenderer'
import CommentCard from './CommentCard'
import { IComment } from '@/database/CommentModel.model'
import CommonFilters from './CommonFilters'
import { CommentFilters, DefaultFilters } from '@/constant/filters'

function CommentList({comments, success, errorMessage, totalComments} : {
    comments: IComment[],
    success: boolean,
    errorMessage?: string,
    totalComments: number,
}) {
  return (
    <div className='mt-8'>
      <div className='flex justify-between items-center'>
        <h3 className='font-bold text-xl'>Comment List | Total Comments - {totalComments}</h3>
        <CommonFilters filter={CommentFilters} defaultFilter={DefaultFilters.CommentFilters}/>
      </div>

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

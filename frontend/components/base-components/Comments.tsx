import React from 'react'
import { IComment } from '../../util/types/posts/post';
import { format, register } from 'timeago.js';
import a from 'timeago.js/esm/lang/en_short';
register("en_short", a);


function Comments() {
    const comments: IComment[] = [
        { content: 'That is actually laughable mate', createdAt: 1659041056485, likes: 291, owner: 'liamk123', replyCount: 25 },
        { content: 'That is actually laughable', createdAt: 1659041056485, likes: 291, owner: 'liamk123', replyCount: 25 },
        { content: 'That is actually laughable', createdAt: 1659041056485, likes: 291, owner: 'liamk123', replyCount: 25 },
        { content: 'That is actually laughable', createdAt: 1659041056485, likes: 291, owner: 'liamk123', replyCount: 25 },
        { content: 'That is actually laughable', createdAt: 1659041056485, likes: 291, owner: 'liamk123', replyCount: 25 },
    ];

  const Comment = ({ comment }: { comment: IComment }) => {
    return (
        <div className='flex flex-col space-y-3'>
            <div className='flex flex-row w-full'>
                <span className='pr-2 break-words'><strong>{comment.owner}</strong> {comment.content}</span>
                <button className='ml-auto mb-auto'>Like</button>
            </div>
            <div className='flex flex-row space-x-10 mx-auto text-gray-200 text-sm'>
                <div>{format(comment.createdAt, "en_short").replace(/ago/gi, "")}</div>
                <div>View replies ({comment.replyCount.toLocaleString()})</div>
            </div>
        </div>
    )
  }

  return (
    <div className='flex flex-col space-y-10'>
        { comments.map((c, i) => <Comment key={i} comment={c} />) }
    </div>
  )
}

export default Comments
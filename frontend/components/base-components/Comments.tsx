import React from 'react'
import { IComment } from '../../util/types/reactions/reactions';
import { format } from 'timeago.js';


function Comments() {

    const comments: IComment[] = [
        { content: 'That is actually laughable mate', createdAt: 1401958195819, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'Fuck that aha', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'Giz a kiss', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'That is actually laughable aha', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'Weirdo', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'Lol mate', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'Jessu', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'Alright then wtf', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'That is a good pic!!', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'Weird', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'That is actually laughable', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'That is actually laughable', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'That is actually laughable', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'That is actually laughable', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
        { content: 'That is actually laughable', createdAt: 1659041056485, likes: 291, owner: 'liamk123', reactions: { likes: 20, replies: 2 } },
    ];

  const Comment = ({ comment }: { comment: IComment }) => {
    return (
        <div className='flex flex-col space-y-3'>
            <div className='flex flex-row w-full'>
                <span className='pr-2 break-words'><strong>{comment.owner}</strong> {comment.content}</span>
                <button className='ml-auto mb-auto'>Like</button>
            </div>
            <div className='flex flex-row space-x-10 mx-auto text-gray-400 text-xs'>
                <div>{format(comment.createdAt)}</div>
                <div>View replies ({(typeof (comment.reactions.replies) === 'number' && comment.reactions.replies).toLocaleString()})</div>
            </div>
        </div>
    )
  }

  return (
        <ul className='flex-grow space-y-10 overflow-y-scroll'>
            { comments.map((c, i) => <li key={i}><Comment comment={c} /></li>) }
        </ul>
  )
}

export default Comments
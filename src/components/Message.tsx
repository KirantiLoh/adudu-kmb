import React from 'react'

interface MessageProps {
    content: string;
    createdAt: Date;
    sender?: string;
}

const Message = ({
    content,
    createdAt,
    sender
}: MessageProps) => {
  return (
    <div className='p-3 min-w-[300px] flex flex-col gap-2 rounded-lg shadow-xl'>
      <p className='max-w-[30ch]'>{content}</p>
      <div className="flex items-center justify-between">
        <p>{createdAt.toLocaleDateString()}</p>
        <p>From: {sender ? sender : "Anon"}</p>
      </div>
    </div>
  )
}

export default Message

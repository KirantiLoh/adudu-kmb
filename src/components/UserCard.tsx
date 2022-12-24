import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface UserCardProps {
    id: string;
    image: string;
    name: string;
}

const UserCard = ({
    image,
    name,
    id
}: UserCardProps) => {
  return (
    <div className='p-3 shadow-xl gap-3 w-full flex flex-col items-center justify-between gap-2'>
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image src={image} alt="" fill />
        </div>
        <h3>{name}</h3>
        <Link href={`/send/${id}`} className='px-3 py-2 w-full text-center rounded-lg text-xs bg-zinc-800 text-white'>
            Kirim Pesan
        </Link>
    </div>
  )
}

export default UserCard

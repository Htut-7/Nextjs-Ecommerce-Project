import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function UserCard({ name, image, id }: { name: string; image: string; id: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div>
      <Link href={`/user/${id}`} className='flex flex-col items-center justify-center rounded-xl p-2'>
        {image ? (
          <Image
            width={100}
            height={100}
            alt='logo'
            src={image}
            className='rounded-full object-cover'
          />
        ) : (
          <div className='flex h-[100px] w-[100px] items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white shadow-md'>
            {initials}
          </div>
        )}
        <p>{name}</p>
      </Link>
    </div>
  );
}

export default UserCard;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function TagInfoCard({name, image, id}: {name: string, image: string, id:string}) {
  return (
    <div>
      <Link href={`/tags/${id}`} className='flex flex-col items-center justify-center rounded-xl p-2'>
        {!image ?<Image 
        width={100}
        height={100}
        alt='logo'
        src={image}>
        </Image> : <div>hello</div>}
        <p>{name}</p>
    </Link>
    </div>
  )
}

export default TagInfoCard

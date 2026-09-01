import React from 'react';
import Image from 'next/image';

function TagInfoCard({name, count}: {name: string, count: number}) {
  return (
    <div className='flex flex-col items-center justify-center rounded-xl p-2'>
        <Image 
        width={100}
        height={100}
        alt='logo'
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name.toLowerCase()}/${name.toLowerCase()}-original.svg`}>
        </Image>
        <p>{name} - ({count})</p>
    </div>
  )
}

export default TagInfoCard

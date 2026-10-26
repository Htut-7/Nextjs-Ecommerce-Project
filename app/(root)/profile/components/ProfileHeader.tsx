import React from 'react';
import Image from 'next/image';
import { Iuser } from '@/database/user.model';

function ProfileHeader({
  user,
  totalMessages,
  totalComments,
}: {
  user: Iuser;
  totalMessages?: number;
  totalComments?: number;
}) {
  const initials = user.username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
      <div className='h-32 bg-gradient-to-br from-indigo-500 to-purple-600' />

      <div className='flex flex-col items-center gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:gap-6'>
        <div className='-mt-16'>
          {user.image ? (
            <Image
              width={120}
              height={120}
              alt={user.username}
              src={user.image}
              className='h-[120px] w-[120px] rounded-full border-4 border-white object-cover shadow-md'
            />
          ) : (
            <div className='flex h-[120px] w-[120px] items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-indigo-500 to-purple-600 text-4xl font-bold text-white shadow-md'>
              {initials}
            </div>
          )}
        </div>

        <div className='flex flex-1 flex-col items-center gap-1 sm:items-start'>
          <div className='flex items-center gap-2'>
            <h1 className='text-2xl font-bold text-slate-900'>{user.username}</h1>
            {user.role && (
              <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
                {user.role}
              </span>
            )}
          </div>
          {user.email && (
            <p className='text-sm text-slate-500'>{user.email}</p>
          )}
        </div>

        <div className='flex items-center gap-6 sm:gap-8'>
          {totalMessages !== undefined && (
            <div className='text-center'>
              <p className='text-xl font-bold text-slate-900'>{totalMessages}</p>
              <p className='text-xs text-slate-500'>Messages</p>
            </div>
          )}
          {totalComments !== undefined && (
            <div className='text-center'>
              <p className='text-xl font-bold text-slate-900'>{totalComments}</p>
              <p className='text-xs text-slate-500'>Comments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;

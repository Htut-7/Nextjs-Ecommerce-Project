import React from 'react'
import ProfileHeader from '../components/ProfileHeader'
import { GetUserId } from '@/Components/lib/action/GetUserId';

async function page({params}: {params: Promise<{id: string}>}) {

    const {id}=await params;

    const result=await GetUserId({
        userId: id,
    });

    if(!result.success || !result.data){
        throw new Error(result.message || "Unable to access user");
    }

    const {user,totalMessages, totalComments}=result.data;

  return (
    <div>
      <ProfileHeader user={user} totalMessages={totalMessages} totalComments={totalComments} />
    </div>
  )
}

export default page

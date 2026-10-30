import React from 'react'
import ProfileHeader from '../components/ProfileHeader'
import { GetUserId } from '@/Components/lib/action/GetUserId';
import { GetUserMessage } from '@/Components/lib/action/GetUserMessage.action';
import DataRenderer from '@/Components/DataRenderer';
import Link from 'next/link';
import QuestionCard from '@/Components/QuestionCard';
import { GetUserComment } from '@/Components/lib/action/GetUserComment.action';
import CommentCard from '@/Components/CommentCard';


async function page({params,searchParams}: {params: Promise<{id: string}>, searchParams: {tab: string}}) {

    const {id}=await params;

    const result=await GetUserId({
        userId: id,
    });

    const activeTab=searchParams.tab;

    if(!result.success || !result.data){
        throw new Error(result.message || "Unable to access user");
    }

    const {user,totalMessages, totalComments}=result.data;

    let isSuccess;
    let dataForLoop;
    let errorMessage;

    if(activeTab==="messages"){
      const {success,data: messageData,message: dataMessage}=await GetUserMessage({
        userId: id,
      });
  
      const {message=[]}= messageData || {};
      isSuccess=success;
      dataForLoop=message;
      errorMessage=dataMessage;
    }else{
      const {success, data, message: commentMessage}=await GetUserComment({
        userId: id,
      });
  
      const {comment=[]}=data || {};
      isSuccess=success;
      dataForLoop=comment;
      errorMessage=commentMessage;
    }
return (
  <div className="min-h-screen bg-white">
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Profile Header */}
      <div className="mb-8">
        <ProfileHeader
          user={user}
          totalMessages={totalMessages}
          totalComments={totalComments}
        />
      </div>

      {/* Profile Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex gap-8">

          <Link
            href={`/profile/${id}?tab=messages`}
            className={`relative flex items-center gap-2 pb-4 text-sm font-semibold transition-colors ${
              activeTab === "messages"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Messages

            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                activeTab === "messages"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {totalMessages}
            </span>

            {activeTab === "messages" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
            )}
          </Link>

          <Link
            href={`/profile/${id}?tab=comments`}
            className={`relative flex items-center gap-2 pb-4 text-sm font-semibold transition-colors ${
              activeTab === "comments"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Comments

            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                activeTab === "comments"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {totalComments}
            </span>

            {activeTab === "comments" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
            )}
          </Link>

        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4">

        {activeTab === "messages" ? (
          <DataRenderer
            success={isSuccess}
            errorMessage={errorMessage}
            data={dataForLoop}
            render={(message) =>
              message.map((messages) => (
                <Link
                  key={messages._id.toString()}
                  href={`/contact/${messages._id}`}
                  className="block rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <QuestionCard message={messages} />
                </Link>
              ))
            }
          />
        ) : (
          <DataRenderer
            success={isSuccess}
            errorMessage={errorMessage}
            data={dataForLoop}
            render={(comment) =>
              comment.map((comments) => (
                <Link
                  key={comments._id.toString()}
                  href={`/contact/${comments._id}`}
                  className="block rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <CommentCard comment={comments} />
                </Link>
              ))
            }
          />
        )}

      </div>
    </div>
  </div>
);

}

export default page



              

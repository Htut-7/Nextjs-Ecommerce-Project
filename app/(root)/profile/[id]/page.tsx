import React from 'react'
import ProfileHeader from '../components/ProfileHeader'
import { GetUserId } from '@/Components/lib/action/GetUserId';
import { GetUserMessage } from '@/Components/lib/action/GetUserMessage.action';
import DataRenderer from '@/Components/DataRenderer';
import Link from 'next/link';
import QuestionCard from '@/Components/QuestionCard';
import { GetUserComment } from '@/Components/lib/action/GetUserComment.action';
import CommentCard from '@/Components/CommentCard';

async function page({params}: {params: Promise<{id: string}>}) {

    const {id}=await params;

    const result=await GetUserId({
        userId: id,
    });

    if(!result.success || !result.data){
        throw new Error(result.message || "Unable to access user");
    }

    const {user,totalMessages, totalComments}=result.data;

    const {success: messageSuccess,data: messageData,message: dataMessage}=await GetUserMessage({
      userId: id,
    });

    const {message=[]}= messageData || {};

    const {success, data, message: commentMessage}=await GetUserComment({
      userId: id,
    });

    const {comment=[]}=data || {};
    

    return (
      <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* Profile Header */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            <ProfileHeader
              user={user}
              totalMessages={totalMessages}
              totalComments={totalComments}
            />
          </section>
    
          {/* Questions Section */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                </svg>
              </div>
    
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                  Questions
                </h2>
                <p className="text-sm text-gray-500">
                  Questions shared by this member
                </p>
              </div>
            </div>
    
            <div className="space-y-4">
              <DataRenderer
                success={messageSuccess}
                errorMessage={dataMessage}
                data={message}
                render={(message) =>
                  message.map((messages) => (
                    <Link
                      key={messages._id.toString()}
                      href={`/contact/${messages._id}`}
                      className="block rounded-2xl transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <QuestionCard message={messages} />
                    </Link>
                  ))
                }
              />
            </div>
          </section>
    
          {/* Comments Section */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
                </svg>
              </div>
    
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                  Comments
                </h2>
                <p className="text-sm text-gray-500">
                  Conversations and replies from this member
                </p>
              </div>
            </div>
    
            <div className="space-y-4">
              <DataRenderer
                success={success}
                errorMessage={commentMessage}
                data={comment}
                render={(comment) =>
                  comment.map((comments) => (
                    <Link
                      key={comments._id.toString()}
                      href={`/contact/${comments._id}`}
                      className="block rounded-2xl transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <CommentCard comment={comments} />
                    </Link>
                  ))
                }
              />
            </div>
          </section>
        </div>
      </main>
    );
    

}

export default page

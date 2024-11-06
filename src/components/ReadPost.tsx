import React from "react";
import Link from "next/link";
import { TPost } from "@/types/types";

interface IReadPost {
  post: TPost;
}

const ReadPost: React.FC<IReadPost> = ({ post }) => {
  return (
    <div className='mx-auto max-w-2xl px-2 py-4 lg:px-6 lg:py-8'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
        <h1 className='text-4xl font-bold pb-4'>{post.title}</h1>
        {post.imageUrl && (
          <img
            className='w-full mb-4'
            src={`${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`}
            alt={post.title}
          />
        )}
        <div className='prose' dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 mt-6'>
          <Link
            href='/'
            passHref
            className='bg-orange-1 hover:bg-orange-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors text-center'
          >
            Back to Home
          </Link>
          <Link
            href={`/edit-post/${post._id}`}
            passHref
            className='bg-orange-1 hover:bg-orange-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors text-center'
          >
            Edit Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReadPost;

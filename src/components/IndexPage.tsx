import React, { useState, useEffect, useRef, useMemo } from "react";
import PostCard from "./common/PostCard";
import { Pagination } from "./common/Pagination";
import { TPost } from "@/types/types";
import { CARD_WIDTH, CARD_PADDING } from "./common/constants";
import Link from "next/link";

interface IIndexPage {
  posts: TPost[];
}

const IndexPage: React.FC<IIndexPage> = ({ posts }) => {
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculatePostsPerPage = (): number => {
    if (!containerRef.current) return 1;

    const containerWidth = containerRef.current.offsetWidth;
    const columns = Math.floor((containerWidth + CARD_PADDING) / (CARD_WIDTH + CARD_PADDING));
    return Math.max(columns, 1);
  };

  const updatePostsPerPage = () => {
    const newPostsPerPage = calculatePostsPerPage();
    setPostsPerPage(newPostsPerPage);
    setPage((prevPage) => Math.min(prevPage, Math.ceil(posts.length / newPostsPerPage) || 1));
  };

  useEffect(() => {
    updatePostsPerPage(); // Initial calculation
    window.addEventListener("resize", updatePostsPerPage);
    return () => window.removeEventListener("resize", updatePostsPerPage);
  }, [posts.length]);

  const currentPosts = useMemo(() => {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  }, [posts, page, postsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(posts.length / postsPerPage);
  }, [posts.length, postsPerPage]);

  return (
    <div className='container mx-auto max-w-7xl px-4 py-8 flex flex-col justify-center h-screen'>
      <h1 className='text-3xl font-bold text-center text-gray-800'>Blog Posts</h1>
      <div
        ref={containerRef}
        className={`grid grid-cols-${postsPerPage} gap-4 my-8`}
        style={{ gridTemplateColumns: `repeat(${postsPerPage}, 1fr)` }}
      >
        {currentPosts.map((post) => {
          return (
            <div key={post._id} className='w-full flex flex-col items-center'>
              <PostCard
                id={post._id}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
              />
            </div>
          );
        })}
      </div>
      <div className='flex flex-col items-center'>
        <Link href='create-post'>
          <button className='bg-orange-1 hover:bg-orange-2 text-white font-bold m-2 p-3 rounded'>
            Write new post
          </button>
        </Link>
        <div className='pt-4'>
          <Pagination pages={totalPages} page={page} changePage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

import Link from "next/link";

interface IPostCard {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const PostCard: React.FC<IPostCard> = ({ id, title, description, imageUrl }) => {
  return (
    <div className='w-72 rounded-xl overflow-hidden shadow hover:shadow-2xl bg-orange-6'>
      <Link href={`/posts/${id}`}>
        <img
          className='w-full h-44 object-cover'
          src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
          alt={title}
        />
        <div className='h-48 px-3 py-2 mb-2'>
          <div className='font-bold text-xl mb-1 line-clamp-3'>{title}</div>
          <p
            className='text-gray-700 text-base overflow-hidden text-ellipsis line-clamp-4'
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </Link>
    </div>
  );
};

export default PostCard;

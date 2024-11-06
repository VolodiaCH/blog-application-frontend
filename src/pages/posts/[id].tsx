import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getPostById } from "@/services/services";
import ReadPost from "@/components/ReadPost";
import { TPost } from "@/types/types";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";

interface IReadPostPage {
  post?: TPost;
  error?: string;
}

const ReadPostPage: React.FC<IReadPostPage> = ({ post, error }) => {
  const router = useRouter();

  if (router.isFallback) return <Loading />;
  if (error) return <Error message={error} />;

  return post ? <ReadPost post={post} /> : <Error message='Post not found' />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  if (typeof id !== "string") {
    return { notFound: true };
  }

  try {
    const post = await getPostById(id);

    if (!post) {
      return { notFound: true };
    }

    return { props: { post } };
  } catch (error) {
    return {
      props: { error: "Error fetching post." },
    };
  }
};

export default ReadPostPage;

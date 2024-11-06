import { GetServerSideProps } from "next";
import IndexPage from "@/components/IndexPage";
import { getAllPosts } from "@/services/services";
import { TPost } from "@/types/types";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";

interface IHomePage {
  posts?: TPost[];
  error?: string;
}

const HomePage: React.FC<IHomePage> = ({ posts, error }) => {
  if (error) return <Error message={error} />;
  if (!posts) return <Loading />;

  return <IndexPage posts={posts} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const posts = await getAllPosts();

    if (!posts || posts.length === 0) {
      return {
        props: { error: "No posts available." },
      };
    }

    return {
      props: { posts },
    };
  } catch (error) {
    return {
      props: { error: "Error fetching posts." },
    };
  }
};

export default HomePage;

import { useRouter } from "next/router";
import EditPost from "../../components/EditPost";
import Loading from "@/components/common/Loading";

const EditPostPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <Loading />;

  return <EditPost id={id as string} />;
};

export default EditPostPage;

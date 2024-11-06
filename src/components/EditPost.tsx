import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getPostById, updatePost, deletePostById } from "../services/services";
import Link from "next/link";
import TextAreaInput from "./common/TextAreaInput";
import TextInput from "./common/TextInput";
import Error from "./common/Error";
import Loading from "./common/Loading";
import DeleteConfirmationModal from "./common/DeleteConfirmationModal";
import ImageInputWithPreview from "./common/ImageInputWithPreview";

interface IEditPost {
  id: string;
}

const EditPost: React.FC<IEditPost> = ({ id }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const post = await getPostById(id);
        setTitle(post.title);
        setDescription(post.description);
        setContent(post.content);
        setImageUrl(post.imageUrl);
      } catch (error) {
        setError("Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (image) formData.append("image", image);
    else formData.append("imageUrl", imageUrl);

    setLoading(true);
    try {
      const success = await updatePost(id, formData);
      if (success) {
        router.push("/");
      } else {
        setError("Failed to update post.");
      }
    } catch (error) {
      setError("An error occurred while updating the post.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      const success = await deletePostById(id);
      if (success) {
        router.push("/");
      } else {
        setError("Failed to delete post.");
      }
    } catch (error) {
      setError("An error occurred while deleting the post.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (error) return <Error message={error} />;
  if (loading) return <Loading />;

  return (
    <div className='mx-auto max-w-2xl px-2 py-4 lg:px-6 lg:py-8'>
      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
          loading={loading}
        />
      )}

      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
        <TextInput
          id='title'
          label='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <ImageInputWithPreview initialImageUrl={imageUrl} onImageChange={handleImageChange} />

        <TextAreaInput
          id='description'
          label='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />

        <TextAreaInput
          id='content'
          label='Content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={9}
          required
        />

        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 mt-6'>
          <Link
            href='/'
            className='bg-orange-1 hover:bg-orange-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors text-center'
          >
            Back to Home
          </Link>
          <button
            type='submit'
            disabled={loading}
            className='bg-orange-1 hover:bg-orange-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors text-center'
          >
            Update Post
          </button>
          <Link
            href={`/posts/${id}`}
            className='bg-orange-1 hover:bg-orange-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors text-center'
          >
            Back to Post
          </Link>
          <button
            type='button'
            onClick={() => setShowDeleteModal(true)}
            disabled={loading}
            className='bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors text-center'
          >
            Delete Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;

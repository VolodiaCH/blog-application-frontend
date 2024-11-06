import { useState } from "react";
import { useRouter } from "next/router";
import { createPost } from "@/services/services";
import Link from "next/link";
import TextAreaInput from "./common/TextAreaInput";
import TextInput from "./common/TextInput";
import Error from "./common/Error";
import ImageInputWithPreview from "./common/ImageInputWithPreview";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const success = await createPost(formData);
      if (success) {
        router.push("/");
      }
    } catch (error) {
      setError("Failed to create post. Please try again.");
    }
  };

  if (error) return <Error message={error} />;

  return (
    <div className='mx-auto max-w-2xl px-2 py-4 lg:px-6 lg:py-8'>
      <h1 className='text-4xl font-bold text-center mb-6'>Create New Post</h1>

      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
        <TextInput
          id='title'
          label='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <ImageInputWithPreview initialImageUrl='' onImageChange={handleImageChange} required />

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
            className='bg-orange-1 hover:bg-orange-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors text-center'
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

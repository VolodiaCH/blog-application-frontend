export const deletePostById = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        method: "DELETE",
      });

      return res.ok;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
};

export const getPostById = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);

      if (!res.ok) throw new Error(`Failed to fetch post with id ${id}`);

      const post = await res.json();

      return post;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
};

export const updatePost = async (id: string, formData: FormData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        method: "PUT",
        body: formData,
      });
  
      if (!res.ok) throw new Error("Failed to update post");
  
      return true;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
};

export const createPost = async (formData: FormData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) throw new Error("Failed to create post");
  
      return true;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
};

export const getAllPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);

    if (!res.ok) throw new Error("Failed to fetch posts");

    const posts = await res.json();

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

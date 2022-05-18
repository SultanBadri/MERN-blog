import axios from "axios";
import { useState, useEffect } from "react";

interface IPost {
  title: string;
  content: string;
  author: string;
  date: Date;
  published: boolean;
  imageUrl: string;
}

interface IProps {
  posts: IPost[];
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

function PostForm({ posts, setPosts }: IProps) {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    document.title = "Create | MERN Blog";
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Write your own blog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" />
      </form>
    </>
  );
}

export default PostForm;

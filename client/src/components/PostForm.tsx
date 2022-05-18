import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IPost {
  title: string;
  content: string;
  author: string;
  date: string;
  published: boolean;
  imageUrl: string;
}

interface IProps {
  user: null | undefined;
  posts: IPost[];
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

function PostForm({ user, posts, setPosts }: IProps) {
  // user!["username"]
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [date, setDate] = useState<string>();
  const [published, setPublished] = useState<boolean>(false);
  // const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    document.title = "Create | MERN Blog";
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setDate(new Date().toLocaleDateString());
    axios
      .post(
        "api/posts/create",
        { title, body, author, date, published },
        {
          headers: {
            Authorization: `bearer ${
              JSON.parse(localStorage.getItem("user")!).token
            }`,
          },
        }
      )
      .then((res) => {
        setPosts([...posts, res.data]);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Write your own blog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          required
        />
        <br />
        <label htmlFor="body">Content</label>
        <br />
        <textarea
          placeholder="Content"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setBody(e.target.value)
          }
          required
        ></textarea>
        <br />
        <button>Post</button>
      </form>
    </>
  );
}

export default PostForm;
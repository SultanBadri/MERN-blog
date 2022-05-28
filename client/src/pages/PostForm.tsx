import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IPost {
  _id: string;
  title: string;
  body: string;
  author: {
    [key: string]: any;
  };
  date: Date;
  published: boolean;
  imageUrl: string;
}

interface IProps {
  posts: IPost[];
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

interface IAuthor {
  _id: string;
  username: string;
}

function PostForm({ posts, setPosts }: IProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [author, setAuthor] = useState<IAuthor>(
    JSON.parse(localStorage.getItem("user")!).user
  );
  const [date, setDate] = useState<string>();
  const [published, setPublished] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let data = JSON.stringify({
      title,
      body,
      author,
      date,
      published,
      imageUrl,
    });
    axios
      .post("/api/posts/create", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem("user")!).token
          }`,
        },
      })
      .then((res) => {
        setPosts([...posts, res.data]);
        axios.get("/api/posts").then((res) => {
          setPosts(res.data);
        });
        navigate("/");
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    document.title = "Create | MERN Blog";
  }, []);

  return (
    <>
      <div className="bg-black-500 w-1/2 mt-24 absolute left-1/2 -translate-x-1/2">
        <div className="border-2 p-10 shadow-xl rounded-md">
          <h1 className="text-purple-600 text-3xl font-bold pb-4">
            Write your own blog
          </h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              {/* Post title */}
              <label htmlFor="title">Title</label>
              <br />
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                className="w-full mb-4 text-gray-900 text-base leading-5 h-8 rounded bg-gray-100 py-1 px-2 duration-100 border-2 shadow-sm outline-0 focus:border-purple-400"
                required
              />
              <br />
              {/* Post body */}
              <label htmlFor="body">Content</label>
              <br />
              <textarea
                name="body"
                placeholder="Content"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setBody(e.target.value)
                }
                className="w-full mb-4 text-gray-900 text-base leading-5 h-40
                rounded bg-gray-100 py-1 px-2 duration-100 border-2 shadow-sm
                outline-0 focus:border-purple-400 resize-none"
                required
              ></textarea>
              <br />
              {/* Post image  */}
              <label htmlFor="image">Image</label>
              <br />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImageUrl(e.target.value)
                }
                className="w-full mb-4 text-gray-900 text-base leading-5 h-8 rounded bg-gray-100 py-1 px-2 duration-100 border-2 shadow-sm outline-0 focus:border-purple-400"
                required
              />
              <br />
              <div>
                <button className="px-8 py-1 mt-4 rounded border-2 border-purple-600 text-purple-600 duration-300 hover:text-white hover:bg-purple-600">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostForm;

import { totalmem } from "os";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
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

interface IAuthor {
  _id: string;
  username: string;
}

function UpdateForm({
  _id,
  title,
  body,
  author,
  date,
  published,
  imageUrl,
}: IProps) {
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState<string>(title);
  const [postBody, setPostBody] = useState<string>(body);
  const [postAuthor, setPostAuthor] = useState<IAuthor>(
    JSON.parse(localStorage.getItem("user")!).user
  );
  const [postDate, setPostDate] = useState<string>();
  const [postPublished, setPostPublished] = useState<boolean>(published);
  const [postImageUrl, setPostImageUrl] = useState<string>(imageUrl);

  useEffect(() => {
    document.title = "Update | MERN Blog";
  }, []);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>): void => {};

  return (
    <>
      <div className="bg-black-500 w-1/2 mt-24 absolute left-1/2 -translate-x-1/2">
        <div className="border-2 p-10 shadow-xl rounded-md">
          <h1 className="text-purple-600 text-3xl font-bold pb-4">
            Update your blog
          </h1>
          <form onSubmit={(e) => handleUpdate(e)}>
            {/* Post title */}
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPostTitle(e.target.value)
              }
              required
            />
            <br />
            {/* Post body */}
            <label htmlFor="body">Content</label>
            <br />
            <input
              type="text"
              name="body"
              placeholder="Content"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPostBody(e.target.value)
              }
              required
            />
            <br />
            {/* Post image  */}
            <label htmlFor="image">Image</label>
            <br />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPostImageUrl(e.target.value)
              }
              required
            />
            <br />
            <div className="flex items-center justify-center">
              <button className="px-8 py-1 mt-4 rounded-full border border-purple-600 text-purple-600 duration-300 hover:text-white hover:bg-purple-600">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateForm;

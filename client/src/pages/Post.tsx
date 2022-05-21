import { useEffect } from "react";

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
  user: any;
}

function Post({
  _id,
  title,
  body,
  author,
  date,
  published,
  imageUrl,
  user,
}: IProps) {
  useEffect(() => {
    document.title = "Post | MERN Blog";
  }, []);

  return (
    <div className="flex items-center justify-center bg-zinc-100">
      <div className="text-center w-3/4 h-screen x-10 bg-white">
        <div className="my-8">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <div className="text-sm">
            <p className="my-2">
              By <em className="text-slate-500">{author.username}</em>
            </p>
            <p>Published on {new Date(date).toLocaleString()}</p>
          </div>
        </div>
        <img className="w-4/5 m-auto" src={imageUrl} alt="background" />
        <p className="text-left mt-8 w-4/5 m-auto">{body}</p>
      </div>
    </div>
  );
}

export default Post;

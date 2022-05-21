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
    <div className="flex items-center justify-center">
      <div className="text-center">
        <img src={imageUrl} alt="background" />
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="text-sm">
          <p>
            By <em className="text-slate-500">{author.username}</em>
          </p>
          <p>Published on {new Date(date).toLocaleDateString()}</p>
        </div>
        <p className="w-4/5 m-auto">{body}</p>
      </div>
    </div>
  );
}

export default Post;

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

  return <p>{title}</p>;
}

export default Post;

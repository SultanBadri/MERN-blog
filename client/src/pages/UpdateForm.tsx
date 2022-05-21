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
  useEffect(() => {
    document.title = "Update | MERN Blog";
  }, []);

  return <p>hi</p>;
}

export default UpdateForm;

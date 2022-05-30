import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface IComment {
  username: string;
  text: string;
  postId: string;
  date: Date;
}

interface IProps {
  postId: string;
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

function CommentsForm({ postId, comments, setComments }: IProps) {
  const formRef = React.useRef() as React.MutableRefObject<HTMLFormElement>;
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [text, setText] = useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios
      .post(`/api/posts/${postId}/comments`, { username, text, postId })
      .then((res) => {
        setComments([res.data, ...comments]);
        axios.get(`/api/posts/${postId}/comments`).then((res) => {
          setComments(res.data);
        });
      })
      .catch((err) => console.log(err.response.data));
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="username">Username</label>
      <br />
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        className="w-full mb-2 text-gray-900 text-base leading-5 h-8 rounded bg-gray-100 py-1 px-2 duration-100 border-2 shadow-sm outline-0 focus:border-purple-400"
        required
      />
      <br />
      <label htmlFor="text">Text</label>
      <br />
      <input
        type="text"
        name="text"
        placeholder="Text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        className="w-full mb-2 text-gray-900 text-base leading-5 h-8 rounded bg-gray-100 py-1 px-2 duration-100 border-2 shadow-sm outline-0 focus:border-purple-400"
        required
      />
      <br />
      <div>
        <button className="px-8 py-1 my-2 rounded border-2 border-purple-600 text-purple-600 duration-300 hover:text-white hover:bg-purple-600">
          Comment
        </button>
      </div>
    </form>
  );
}

export default CommentsForm;

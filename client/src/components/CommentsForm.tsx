import axios from "axios";
import { useState, useEffect } from "react";

function CommentsForm() {
  const [username, setUsername] = useState<string>();
  const [text, setText] = useState<string>();

  return (
    <form>
      <label htmlFor="username">Username</label>
      <br />
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        className="w-full mb-4 text-gray-900 text-base leading-5 h-8 rounded bg-gray-100 py-1 px-2 duration-100 border-2 shadow-sm outline-0 focus:border-purple-400"
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
        className="w-full mb-4 text-gray-900 text-base leading-5 h-8 rounded bg-gray-100 py-1 px-2 duration-100 border-2 shadow-sm outline-0 focus:border-purple-400"
        required
      />
      <br />
      <div>
        <button className="px-8 py-1 mt-4 rounded border-2 border-purple-600 text-purple-600 duration-300 hover:text-white hover:bg-purple-600">
          Comment
        </button>
      </div>
    </form>
  );
}

export default CommentsForm;

import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

interface IComment {
  _id: string;
  username: string;
  text: string;
  postId: string;
  date: Date;
}

interface IProps {
  user: any;
  postId: string;
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

function Comments({ user, postId, comments, setComments }: IProps) {
  const handleUpdate = (updateComment: IComment): void => {};

  const handleDelete = (deleteComment: IComment): void => {
    axios
      .delete(`/api/posts/${postId}/comments/${deleteComment._id}/delete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem("user")!).token
          }`,
        },
      })
      .then(() => {
        setComments((prevState) => {
          return prevState.filter(
            (comment) => comment._id !== deleteComment._id
          );
        });
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <>
      <div>
        {comments
          .slice(0)
          .reverse()
          .map((comment: IComment, i: number) => {
            return (
              <div
                key={i}
                className="p-2 my-4 border rounded shadow-sm hover:shadow-lg"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">{comment.username}</h3>
                  <p>{new Date(comment.date).toLocaleString()}</p>
                </div>
                <p>{comment.text}</p>
                <div
                  className="m-auto"
                  hidden={
                    user &&
                    JSON.parse(localStorage.getItem("user")!).user.username ===
                      comment.username
                      ? false
                      : true
                  }
                >
                  <button
                    onClick={() => handleUpdate(comment)}
                    className="px-2 py-1 mt-2 rounded border border-purple-600 text-purple-600 duration-300 hover:text-white hover:bg-purple-600"
                  >
                    <BiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(comment)}
                    className="px-2 py-1 mt-2 rounded border border-red-600 text-red-600 duration-300 hover:text-white hover:bg-red-600"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Comments;

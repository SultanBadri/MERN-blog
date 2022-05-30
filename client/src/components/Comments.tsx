import { useEffect } from "react";

interface IComment {
  username: string;
  text: string;
  postId: string;
  date: Date;
}

interface IProps {
  comments: IComment[];
}

function Comments({ comments }: IProps) {
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
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Comments;

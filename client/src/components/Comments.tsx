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
        {comments.map((comment: IComment, i: number) => {
          return (
            <div key={i}>
              <h3>{comment.username}</h3>
              <p>{comment.text}</p>
              <p>Published on {new Date(comment.date).toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Comments;

interface IPost {
  title: string;
  body: string;
  author: string;
  date: string;
  published: boolean;
  // imageUrl: string;
}

interface IProps {
  posts: IPost[];
}

function Posts({ posts }: IProps) {
  console.log(posts);

  return (
    <>
      <h1 className="text-3xl font-bold text-center">My posts</h1>
    </>
  );
}

export default Posts;

interface IPost {
  title: string;
  body: string;
  author: {
    [key: string]: any[];
  };
  date: Date;
  published: boolean;
  // imageUrl: string;
}

interface IProps {
  posts: IPost[];
}

function Posts({ posts }: IProps) {
  // const handlePublish = () => {

  // }

  const userPosts = [];
  for (const post of posts) {
    let userId = JSON.parse(localStorage.getItem("user")!).user._id;
    if (userId === post.author._id) {
      userPosts.push(post);
    }
  }

  console.log(posts);

  return (
    <>
      <h1 className="text-3xl font-bold text-center m-8">My posts</h1>
      {userPosts.map((post, i) => {
        return (
          <div className="bg-slate-200 m-6 p-4 rounded" key={i}>
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p>{post.body}</p>
            <p>{`By ${post.author["username"]}`}</p>
            <p>{`Created on ${new Date(post.date).toLocaleDateString()}`}</p>
            <p>{`Status: ${post.published ? "Published" : "Not published"}`}</p>
          </div>
        );
      })}
    </>
  );
}

export default Posts;

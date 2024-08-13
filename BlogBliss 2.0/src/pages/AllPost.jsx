import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
function AllPost() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    service.getallPost([]).then((posts) => {
      if (posts) {
        setPost(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {post.map((posts) => {
            return (
              <div className="p-2 w-1/4">
                <PostCard
                  key={posts.$id}
                  post={posts}
                  title={posts.title}
                  featuredImage={posts.featuredImage}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;

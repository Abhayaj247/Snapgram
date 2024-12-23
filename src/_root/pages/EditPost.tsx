import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/shared/Loader";
import PostForm from "../../components/forms/PostForm";
import { useGetPostById } from "../../lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const EditPost: React.FC = () => {
  // Add type for useParams
  const { id } = useParams<{ id: string }>();
  const { data: post, isPending } = useGetPostById(id || "");

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            // Fix image source path
            src="/assets/icons/add-post.svg"
            alt="add"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        <PostForm 
          action="Update" 
          // Add type assertion
          post={post as Models.Document} 
        />
      </div>
    </div>
  );
};

export default EditPost;
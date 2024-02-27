"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    // Step 1: Confirm deletion with the user
    const hasConfirmed = confirm("Are you sure you want to delete this prompt");
  
    // Step 2: If user confirmed, proceed with deletion
    if (hasConfirmed) {
      try {
        // Step 3: Send DELETE request to the server
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
  
        // Step 4: Update local state to reflect the deletion
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
  
        // Logging for debugging
        console.log("Deletion successful!");
      } catch (error) {
        // Step 5: Handle errors during deletion
        console.error("Error during deletion:", error);
      }
    }
  };
  
  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to your personlized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;

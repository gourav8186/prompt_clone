"use client";

import { useEffect, useState , Suspense  } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "../loading";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Suspense fallback={<div><Loading/></div>}>
      <Profile
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={posts}
      />
    </Suspense>
  );
};

export default UserProfile;

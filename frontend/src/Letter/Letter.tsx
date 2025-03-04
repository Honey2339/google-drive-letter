import { useEffect, useState } from "react";
import Editor from "./Editor";

const Letter = () => {
  const [user, setUser] = useState<{ displayName: string } | null>(null);
  const [letter, setLetter] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/me`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="h-screen bg-zinc-900 flex justify-center items-center">
      <div>
        <h1 className="text-white text-center font-semibold text-2xl">
          {user
            ? `Welcome, ${user.displayName}!`
            : "Welcome, Please Write Your Letter"}
        </h1>
        <Editor letter={letter} setLetter={setLetter} />
      </div>
    </div>
  );
};

export default Letter;

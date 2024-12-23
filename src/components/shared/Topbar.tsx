import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

const Topbar: React.FC = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess, navigate]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => signOut()}>
            <img 
              src="/assets/icons/logout.svg" 
              alt="logout" 
              className="w-6 h-6" 
            />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img 
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} 
              alt="profile" 
              className="h-8 w-8 rounded-full" 
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
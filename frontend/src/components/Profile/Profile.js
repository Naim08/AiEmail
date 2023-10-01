import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  return (
    <div>
      <h1>{currentUser.username}</h1>
      <h2>{currentUser.email}</h2>
    </div>
  );
}

export default Profile;

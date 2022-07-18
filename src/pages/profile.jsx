import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import { checkAuthUser } from "../../services/actions/auth";

// import ProfileSidebar from "../../components/profile-sidebar";
// import ProfileForm from "../../components/profile-form";
import Preloader from "../components/preloader/preloader";

import styles from "./profile.module.css";

const Profile = () => {
  // const dispatch = useDispatch();

  // const { sendRequest } = useSelector((store) => store.user);

  // useEffect(() => {
  //   if (!sendRequest) {
  //     dispatch(checkAuthUser());
  //   }
  // }, []);

  return (
    <>
      {/* {sendRequest && <Preloader />} */}

      <div className={"mt-30 " + styles.container}>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi non, ea accusamus ipsa consequatur, reiciendis doloribus harum cumque sit impedit a laborum porro omnis nulla? Vel veniam corrupti quas voluptatibus.</p>
        {/* <ProfileSidebar description="В этом разделе вы можете изменить свои персональные данные" />
        <ProfileForm /> */}
      </div>
    </>
  );
};

export default Profile;

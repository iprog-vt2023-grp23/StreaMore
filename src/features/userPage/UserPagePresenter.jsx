import { useDispatch, useSelector } from "react-redux";

import { 
  getUsername, 
  getStreamingServices, 
  getAvailableServices, 
  getEditmode, 
  toggleEdit, 
  addStreamingService, 
  removeStreamingService, 
  getUserEmail } from "./userPageSlice";
  import UserPageView from "./UserPageView";
  import BacknHomeButton from "../uiComponents/BacknHomeButton";

const UserPagePresenter = () => {
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  const useremail = useSelector(getUserEmail);
  const ownedServices = useSelector(getStreamingServices);
  const services      = useSelector(getAvailableServices);
  const editmode = useSelector(getEditmode);
  /*
   *Unselects or selects streaming services by dispatching them to the Slice
   */
  const removeService = (e) => dispatch(removeStreamingService(e.currentTarget.value));
  const addService = (e) => dispatch(addStreamingService(e.currentTarget.value));
  const onEditmode = (e) => dispatch(toggleEdit());

  //Done Editing Username when enter key is pressed
  function keyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault(); //Dont reload the page
      dispatch(toggleEdit());
    }
  }

  return (
    <>
    <BacknHomeButton />
    <UserPageView
      streamingServices={ownedServices}
      services={services}
      username={username}
      useremail={useremail}
      isEdit={editmode}
      onRemoveServiceButton={removeService}
      onAddServiceButton={addService}
      onEdit={onEditmode}
      onKeyDown={keyDown}
    />
    </>
  );
};

export default UserPagePresenter;

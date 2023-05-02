import { useDispatch, useSelector } from "react-redux";
import { 
  updateStreamingServiceList, 
  getUsername, 
  getStreamingServices, 
  getAvailableServices, 
  getEditmode, 
  toggleEdit, 
  addStreamingService, 
  removeStreamingService } from "./userPageSlice";
  import UserPageView from "./UserPageView";


const UserPagePresenter = () => {
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  const ownedServices = useSelector(getStreamingServices);
  const services      = useSelector(getAvailableServices);
  const editmode = useSelector(getEditmode);

console.log("ownedServices: ", ownedServices);

  /*
   *Unselects or selects streaming services by dispatching them to the Slice
   */
  const removeService = (e) => {
    dispatch(removeStreamingService(e.currentTarget.value));
  };
  const addService = (e) => {
    dispatch(addStreamingService(e.currentTarget.value));
  };
  const doEdit = (e) => {
    dispatch(toggleEdit(e.currentTarget.value));
  }

  //updateStreamingServiceList();

  return (
    <UserPageView
      streamingServices={ownedServices}
      services={services}
      username={username}
      isEdit={editmode}
      onRemoveServiceButton={removeService}
      onAddServiceButton={addService}
      onEdit={doEdit}
    />
  );
};

export default UserPagePresenter;

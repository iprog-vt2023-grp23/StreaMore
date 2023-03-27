import { useDispatch, useSelector } from "react-redux";
import {
  getStreamingServices,
  getUserName,
  getUserEmailAdress,
  addStreamingService,
  removeStreamingService,
  getAvailableServices,
} from "./userPageSlice";
import UserPageView from "./UserPageView";

const UserPage = () => {
  const dispatch = useDispatch();
  const userName = useSelector(getUserName);
  const userEmail = useSelector(getUserEmailAdress);
  const streamingServices = useSelector(getStreamingServices);

  const services = useSelector(getAvailableServices);

  /*
   *Unselects or selects streaming services by dispatching them to the Slice
   */
  const removeService = (e) => {
    dispatch(removeStreamingService(e.currentTarget.value));
  };
  const addService = (e) => {
    dispatch(addStreamingService(e.currentTarget.value));
  };

  return (
    <UserPageView
      streamingServices={streamingServices}
      services={services}
      userName={userName}
      userEmail={userEmail}
      onRemoveServiceButton={removeService}
      onAddServiceButton={addService}
    />
  );
};

export default UserPage;

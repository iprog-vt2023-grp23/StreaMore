import { useDispatch, useSelector } from "react-redux";
import {
  getStreamingServices,
  getUsername,
  getUserId,
  addStreamingService,
  removeStreamingService,
  getAvailableServices,
} from "./userPageSlice";
import UserPageView from "./UserPageView";
import { FirebaseContext } from '/src/firebase/Firebase';
import { useContext } from "react";

const UserPage = () => {
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  const userId = useSelector(getUserId);
  const streamingServices = useSelector(getStreamingServices);

  const services = useSelector(getAvailableServices);
  const { api } = useContext(FirebaseContext);

  /*
   *Unselects or selects streaming services by dispatching them to the Slice
   */
  const removeService = (e) => {
    dispatch(removeStreamingService(e.currentTarget.value));
    api.removeService(e.currentTarget.value, userId);
  };
  const addService = (e) => {
    dispatch(addStreamingService(e.currentTarget.value));
    api.addService(e.currentTarget.value, userId);
  };

  return (
    <UserPageView
      streamingServices={streamingServices}
      services={services}
      username={username}
      onRemoveServiceButton={removeService}
      onAddServiceButton={addService}
    />
  );
};

export default UserPage;

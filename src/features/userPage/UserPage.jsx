import { useDispatch, useSelector } from "react-redux";
import { getStreamingServices, getAvailableServices, getCounter, setCounter } from "./userPageSlice";
import UserPageView from "./UserPageView";
import {
  getUsername,
  addServiceFirebase,
  removeServiceFirebase,
} from "../../firebase/firebaseSlice";

const UserPage = () => {
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  const ownedServices = useSelector(getStreamingServices);
  const counter = useSelector(getCounter);

  const services = useSelector(getAvailableServices);

  /*
   *Unselects or selects streaming services by dispatching them to the Slice
   */
  const removeService = (e) => {
    dispatch(removeServiceFirebase(e.currentTarget.value));
  };
  const addService = (e) => {
    dispatch(addServiceFirebase(e.currentTarget.value));
  };
  const updateCounter = (e) => {
    dispatch(setCounter());
    console.log("test1", counter);
  };

  return (
    <UserPageView
      streamingServices={ownedServices}
      services={services}
      username={username}
      onEdit={updateCounter}
      count={counter}
      onRemoveServiceButton={removeService}
      onAddServiceButton={addService}
    />
  );
};

export default UserPage;

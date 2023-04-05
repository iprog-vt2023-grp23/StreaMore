import { useDispatch, useSelector } from "react-redux";
import { getStreamingServices, getAvailableServices, toggleEdit } from "./userPageSlice";
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
  var boolean1 = false;

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
  const doToggleEdit = (e) => {
    console.log("doTogglEdit", boolean1);
    boolean1 = !boolean1;
  }

  return (
    <UserPageView
      streamingServices={ownedServices}
      services={services}
      username={username}
      isEdit={boolean1}
      onRemoveServiceButton={removeService}
      onAddServiceButton={addService}
      onToggleEdit={doToggleEdit}
    />
  );
};

export default UserPage;

import { useDispatch, useSelector } from "react-redux";
import { getStreamingServices, getAvailableServices, getEditmode, toggleEdit } from "./userPageSlice";
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
  const editmode = useSelector(getEditmode);

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
  const doEdit = (e) => {
    dispatch(toggleEdit(e.currentTarget.value));
  }

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

export default UserPage;

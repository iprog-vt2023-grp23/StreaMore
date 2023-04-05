import iconMapping from "../uiComponents/StreamingButtons";
import { FaUserCircle } from "react-icons/fa";
import { Button } from 'primereact/button';
import "./UserPage.css";

const UserPageView = (props) => {
  console.log("props ", props);
  /*
   *Renders all services that are retrieved from the api
   */
  const renderStreamingServices = props.services.map((service) => {
    //If service is in streamingServices (the users owned services) it will be rendered with the css class OwnedService, giving it a red circle
    //The icons are fetched from StreamingButtons
    //console.log("service: ", service);
    const hasService = props.streamingServices.find((ownedService) => ownedService === service);
    var editing = false; //TODO: Make some switching mechanism for editing.

    let displayService = () => {
      if(hasService) {
        return "OwnedService";
      }
      else
      {
        return "NotOwnedService";
      }
    }

    return (
      <button
        onClick={hasService? props.onRemoveServiceButton : props.onAddServiceButton}
        className={displayService()}
        key={service}
        value={service}
      >
        {iconMapping(service)}
      </button>
    );
  });

  //console.log("user: ", props.userEmail);

  return (
      <section className="userprofile">
        <Button className="edituser" label="Edit" onClick />
        <h2>User Profile</h2>
        <FaUserCircle size="80" />
        <h3>{props.username}</h3>
        <p class="email" >{props.username}@test.com</p>
        <p> </p>
        <h3>My services:</h3>
        {renderStreamingServices}
        <p></p>
      </section>
    )
};

export default UserPageView;

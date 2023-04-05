import iconMapping from "../uiComponents/StreamingButtons";
import { FaUserCircle } from "react-icons/fa";
import { SplitButton } from 'primereact/splitbutton';
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
    var hasService = props.streamingServices.find((ownedService) => ownedService === service);

    return (
      <button
        onClick={hasService? props.onRemoveServiceButton : props.onAddServiceButton}
        className={hasService? "OwnedService" : "NotOwnedService"}
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
        <button class="edituser" onClick={() => dispatch(toggleAboutFilmField())}>
          Edit
        </button>
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

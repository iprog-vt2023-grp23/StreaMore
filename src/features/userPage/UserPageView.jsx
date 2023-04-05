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

    let displayService = () => {
      if(props.isEdit) {
        return "ownedService";
      }
      else
      {
        return "unOwnedService";
      }
    }

    return (
      <button
        onClick={hasService? props.onRemoveServiceButton : props.onAddServiceButton}
        className={displayService()}
        key={service}
        value={service}
        disabled={props.isEdit}
      >
        {iconMapping(service)}
      </button>
    );
  });

  //console.log("user: ", props.userEmail);

  return (
      <section className="userprofile">
        <Button className="edituser" label="Edit" onClick={props.onEdit} />
        <h2>User Profile</h2>
        <FaUserCircle size="80" />
        <h3>{props.username}</h3>
        <p className="email" >{props.username}@test.com</p>
        <h3>My services: {props.isEdit} </h3>
        {renderStreamingServices}
        <p></p>
      </section>
    )
};

export default UserPageView;

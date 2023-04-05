import iconMapping from "../uiComponents/StreamingButtons";
import "./UserPage.css";

const UserPageView = (props) => {
  /*
   *Renders all services that are retrieved from the api
   */
  const renderStreamingServices = props.services.map((service) => {
    //If service is in streamingServices (the users owned services) it will be rendered with the css class OwnedService, giving it a red circle
    //The icons are fetched from StreamingButtons

    console.log("service: ", service);
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

  console.log("user: ", props.userEmail);

  return ( <div>
    <div>
        <p>I am a user :)</p>
        <p>profile picture goes here</p>
        <p>my name is: {props.username}</p>
        <p>my email is: {props.userEmail}</p>
        <p>I have these services:</p>
        {renderStreamingServices}
      </div>
    </div>)
};

export default UserPageView;

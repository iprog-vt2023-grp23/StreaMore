import iconMapping from "../uiComponents/StreamingButtons";
import "./UserPage.css"

const UserPageView = (props) => {
  /*
   *Renders all services that are retrieved from the api
   */
  const renderStreamingServices = props.services.map((service) => {
    //If service is in streamingServices (the users owned services) it will be rendered with the css class OwnedService, giving it a red circle
    //The icons are fetched from StreamingButtons
    if (
      props.streamingServices.find((ownedService) => ownedService === service) && iconMapping(service)
    ) {
      return (
        <button
          onClick={props.onRemoveServiceButton}
          className="ownedService"
          key={service}
          value={service}
        >
          {iconMapping(service)}
        </button>
      );
    } else
      return (
        <button
          onClick={props.onAddServiceButton}
          className="unOwnedService"
          key={service}
          value={service}
        >
          {iconMapping(service)}
        </button>
      );
  });

  return (
    <div className="userPage">
      <h3>Welcome {props.username} select the services that you own</h3>
      <div>
        {renderStreamingServices}
      </div>
    </div>
  );
};

export default UserPageView;

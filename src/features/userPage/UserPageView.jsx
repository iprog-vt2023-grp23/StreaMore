import iconMapping from "../uiComponents/StreamingButtons";

const UserPageView = (props) => {
  /*
   *Renders all services that are retrieved from the api
   */
  const renderStreamingServices = props.services.map((service) => {
    //If service is in streamingServices (the users owned services) it will be rendered with the css class OwnedService, giving it a red circle
    //The icons are fetched from StreamingButtons
    if (
      props.streamingServices.find((ownedService) => ownedService === service)
    ) {
      return (
        <button
          onClick={props.onRemoveServiceButton}
          className="OwnedService"
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
          key={service}
          value={service}
        >
          {iconMapping(service)}
        </button>
      );
  });

  return (
    <div>
      I am a user :) and my name is {props.username}
      <div>
        I have these services:
        {renderStreamingServices}
      </div>
    </div>
  );
};

export default UserPageView;

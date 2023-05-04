import iconMapping from "../uiComponents/StreamingButtons";
import { FaUserCircle } from "react-icons/fa";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import "./UserPage.css";

const UserPageView = (props) => {
  const keyDown = e => props.onKeyDown(e);
  const onToggleEditmode = e => props.onEdit();
  const usernameChanged = e => props.onUsernameChanged(e);

  let renderButtonIfNoServices = () => {
    if ((!props.isEdit) && (props.streamingServices === undefined || props.streamingServices == 0)) {
      console.log("No services")
      return (<Button 
        label={"Add services"} 
        onClick={onToggleEditmode} 
        size="small" 
        outlined
      />)
    }
    return renderStreamingServices;
  }

  //Renders all services that are retrieved from the api
  const renderStreamingServices = props.services.map((service) => {
    //If service is in streamingServices (the users owned services):
    //  it will be rendered with the css class OwnedService, giving it a red circle.
    const hasService = props.streamingServices.find((ownedService) => ownedService === service);

    //changes display of services
    let displayService = () => {
      if(props.isEdit) {
        return hasService? "ownedService" : "unOwnedService";
      }
      return hasService? "unOwnedService" : "hiddenService";
    }

    //makes it possible to add/remove services
    let editService = () => {
      if(props.isEdit)
        return hasService? props.onRemoveServiceButton : props.onAddServiceButton;
    }

    return (
      <button
        onClick={editService()}
        className={displayService()}
        key={service}
        value={service}
      >
        {iconMapping(service)} 
      </button>
    );
    //Icons are fetched from StreamingButtons: iconMapping() function
  });

  //for editing username
  const editUsername = () => {
    if(props.isEdit) {
      return (
        <div>
          <h3>Edit Username:</h3>
          <InputText 
            id="username" 
            value={props.username} 
            onChange={usernameChanged} 
            onKeyDown={keyDown}
          />
        </div>
      );
    }
    return (
      <div>
        <h3>{props.username}</h3>
        <p className="email" >{props.useremail}</p>
      </div>
    );
  }

  return (
      <section className="userprofile">
        <Button 
          className="edituser" 
          label={props.isEdit? "Done" : "Edit"} 
          onClick={onToggleEditmode} 
          size="small" 
          outlined
        />
        <h2>User Profile</h2>
        <FaUserCircle size="80" />
        {editUsername()}
        <h3>My services: {props.isEdit} </h3>
        {renderButtonIfNoServices()}
        <p></p>
      </section>
    )
};

export default UserPageView;

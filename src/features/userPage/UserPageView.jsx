import iconMapping from "../uiComponents/StreamingButtons";
import { FaUserCircle } from "react-icons/fa";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import "./UserPage.css";

const UserPageView = (props) => {
  const keyDown = e => props.onKeyDown(e);
  const onToggleEditmode = e => props.onEdit();
  const usernameChanged = e => props.onUsernameChanged(e);

  //console.log("props ", props);
  /*
   *Renders all services that are retrieved from the api
   */
  const renderStreamingServices = props.services.map((service) => {
    //If service is in streamingServices (the users owned services) it will be rendered with the css class OwnedService, giving it a red circle
    //The icons are fetched from StreamingButtons

    const hasService = props.streamingServices.find((ownedService) => ownedService === service);

    //for changing how and which services can be seen in edit mode
    let displayService = () => {
      if(props.isEdit) {
        return hasService? "ownedService" : "unOwnedService";
      }
      return hasService? "unOwnedService" : "hiddenService";
    }

    //for changing which services can be edited in edit mode
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
  });

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
      </div>);
  }

  //console.log("user: ", props.userEmail);

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
        {renderStreamingServices}
        <p></p>
      </section>
    )
};

export default UserPageView;

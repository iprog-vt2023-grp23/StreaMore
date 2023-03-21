import { useDispatch, useSelector } from "react-redux";
import { getStreamingServices, getUserName, addStreamingService, removeStreamingService, getAvailableServices } from "./userPageSlice";
import iconMapping from "./StreamingButtons";

const UserPage = () => {
    const dispatch = useDispatch();
    const userName = useSelector(getUserName);
    const streamingServices = useSelector(getStreamingServices);

    const services = useSelector(getAvailableServices);

    /*
    *Unselects or selects streaming services by dispatching them to the Slice
    */
    const removeServiceButton = (e) => {
        dispatch(removeStreamingService(e.currentTarget.value));
    }
    const addServiceButton = (e) => {
        dispatch(addStreamingService(e.currentTarget.value));
    }

    /*
    *Renders all services that are retrieved from the api
    */
    const renderStreamingServices = services.map(service => {
        //If service is in streamingServices (the users owned services) it will be rendered with the css class OwnedService, giving it a red circle
        //The icons are fetched from StreamingButtons
        if(streamingServices.find((ownedService) => ownedService === service)){
            return(
                <button onClick={removeServiceButton} className="OwnedService" key={service} value={service}>
                    {iconMapping(service)}
                </button>
            )
        }
        else return(
            <button onClick={addServiceButton} key={service} value={service}>
                {iconMapping(service)}
            </button>
        )
        
    })

    return (
        <div>
            I am a user :) and my name is {userName}
            <div>
                I have these services: 
                {renderStreamingServices}
                
            </div>
        </div>
    )
}

export default UserPage;
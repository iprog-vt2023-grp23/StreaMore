import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getStreamingServices, getUserName, addStreamingService, removeStreamingService, getAvailableServices } from "./userPageSlice";
import iconMapping from "./StreamingButtons";

const UserPage = () => {
    const dispatch = useDispatch();
    const userName = useSelector(getUserName);
    const [streamingServices, setStreamingServices] = useState(useSelector(getStreamingServices));

    const services = useSelector(getAvailableServices);

    const removeServiceButton = (e) => {
        setStreamingServices(streamingServices.filter((service) => service != e.currentTarget.value));
        dispatch(removeStreamingService(e.currentTarget.value));
    }
    const addServiceButton = (e) => {
        setStreamingServices([...streamingServices, e.currentTarget.value])
        dispatch(addStreamingService(e.currentTarget.value));
    }

    const renderStreamingServices = services.map(service => {
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
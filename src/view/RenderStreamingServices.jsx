import { useSelector } from 'react-redux';
import { getCountry } from '../model/searchSlice';
import iconMapping from './StreamingButtons';

/*
*A reusable function that renders all streaming services from the input result
*Linking to the streaming service when pressed
*/
const renderStreamingServices = (result) => {
    const country = useSelector(getCountry);
    let serviceKeys = [];

    try{
        serviceKeys = Object.keys(result.streamingInfo[country]);
    } catch(err){
        //console.log("Movie not availablel", err)
    }

    const streamingInfo = serviceKeys.map(service => {
        return (
            <a key={service} href={result.streamingInfo[country][service][0].link}>
                {iconMapping(service)}
            </a>
        )
    });
    
    return streamingInfo;
}

export default renderStreamingServices;
import React from 'react'
import { useSelector } from 'react-redux';
import { getStateCountry } from './searchSlice';

const SearchListFormat = ({result}) => {
    const country = useSelector(getStateCountry);

    const serviceKeys = Object.keys(result.streamingInfo);

    const streamingInfo = serviceKeys.map(service => {
        try{
            return (
                <a key={service} href={result.streamingInfo[service][country].link}>
                    {service}
                </a>
            )
        } catch(err){
            console.log("Movie not available in country",err)
        }
    });
    console.log(result)
  return (
    <div>
        <h3>{result.title}</h3>
        <div>{result.body}</div>
        <img src={result.posterURLs[154]}></img>
        <div>
            {streamingInfo}
        </div>
    </div>
  )
}

export default SearchListFormat
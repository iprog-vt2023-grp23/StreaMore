import {RiNetflixFill} from 'react-icons/ri'
import {SiPrime, SiAppletv, SiHbo, SiBbciplayer, SiNow, SiShowtime, SiStarz} from 'react-icons/si'
import {GiMarsCuriosity} from 'react-icons/gi'
import {TbBrandDisney} from 'react-icons/tb'

const iconMapping = (serviceName) => {
    const iconMap = {
        "netflix" : <RiNetflixFill />,
        "prime" : <SiPrime />,
        "apple" : <SiAppletv />,
        "curiosity" : <GiMarsCuriosity />,
        "disney" : <TbBrandDisney />,
        "hbo" : <SiHbo />,
        "iplayer" : <SiBbciplayer />,
        "now" : <SiNow />,
        "showtime" : <SiShowtime />,
        "starz" : <SiStarz />,
    }
    try{return iconMap[serviceName];}
    catch(err) {return serviceName}
    
}

export default iconMapping;
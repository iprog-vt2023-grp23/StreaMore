import { RiNetflixFill } from "react-icons/ri";
import {
  SiPrime,
  SiAppletv,
  SiHbo,
  SiBbciplayer,
  SiNow,
  SiShowtime,
  SiStarz,
} from "react-icons/si";
import { GiMarsCuriosity } from "react-icons/gi";
import { TbBrandDisney } from "react-icons/tb";

//returns an icon by matching a streaming service name (iconMapping("netflix") gives the netflix button)
const iconMapping = (serviceName) => {
  const size = "40";
  const iconMap = {
    netflix: <RiNetflixFill size={size} />,
    prime: <SiPrime size={size} />,
    apple: <SiAppletv size={size} />,
    curiosity: <GiMarsCuriosity size={size} />,
    disney: <TbBrandDisney size={size} />,
    hbo: <SiHbo size={size} />,
    iplayer: <SiBbciplayer size={size} />,
    now: <SiNow size={size} />,
    showtime: <SiShowtime size={size} />,
    starz: <SiStarz size={size} />,
  };
  try {
    return iconMap[serviceName];
  } catch (err) {
    return serviceName;
  }
};

export default iconMapping;

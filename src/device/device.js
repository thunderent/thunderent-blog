const sizeMin = { 
    mobile: '474px', 
    tablet: '767px',
    laptop: '1439px',
}

  const size = { 
    mobile: '475px', 
    tablet: '768px', 
    laptop: '1440px',
  }

export const device = {
    mobile: `screen and (max-width: ${sizeMin.mobile})`,   
    tablet: `screen and (min-width: ${size.mobile}) and (max-width: ${sizeMin.tablet})`,
    laptop: `screen and (min-width: ${size.tablet}) and (max-width: ${sizeMin.laptop})`,  
    desktop: `screen and (min-width: ${size.laptop})` 
  };
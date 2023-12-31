import React from 'react'

type DownloadSvgProps = {
    href: string,
    fileLabel: string
}

const DownloadSvg = ({ fileLabel, href} : DownloadSvgProps) => {

  
  function Test(){
    console.log("lieeeen",fileLabel);
  }
  return (
    <a  href={'http://localhost:3350/uploads/'+fileLabel } download={fileLabel} rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><title>11.download</title><g id="_11.download" data-name="11.download"><path d="M12,24A12,12,0,1,1,24,12,12.013,12.013,0,0,1,12,24ZM12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Z"/><polygon points="12 14.414 7.293 9.707 8.707 8.293 12 11.586 15.293 8.293 16.707 9.707 12 14.414"/><rect x="11" y="5" width="2" height="8"/><polygon points="17 19 7 19 7 16 9 16 9 17 15 17 15 16 17 16 17 19"/></g></svg></a>
  )
}

export default DownloadSvg
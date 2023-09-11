type SortByFileTypeProps = {
    fileType: string,
    setFocusLink : any,
    files: any,
    setFilesFiltered: any
}

function SortByFileType({fileType, setFocusLink, files, setFilesFiltered} : SortByFileTypeProps){

    if(fileType == "image/png"){
      setFocusLink("focusPng");
    }
    if(fileType == "image/jpeg"){
      setFocusLink("focusJpg");
    }
    if(fileType == "application/pdf"){
      setFocusLink("focusPdf");
    }
    const sortedArray = [...files].filter((element) => element.fileType ==fileType);

    setFilesFiltered(sortedArray)
  }

  export default SortByFileType
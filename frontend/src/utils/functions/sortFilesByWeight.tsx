type SortFilesByWeightProps = {
    setFocusLink: any,
    isFilesFilteredByAscendingWeight: boolean,
    setFilesFiltered : any,
    setIsFilesFilteredByAscendingWeight: any,
    files: any
}

function SortFilesByWeight({setFocusLink, isFilesFilteredByAscendingWeight, setFilesFiltered, setIsFilesFilteredByAscendingWeight, files} : SortFilesByWeightProps){
    setFocusLink("focusWeight");

    if(isFilesFilteredByAscendingWeight){
      
      const sortedArray = [...files].sort((a, b) => a.fileSizeMb - b.fileSizeMb);
      setFilesFiltered(sortedArray);
      setIsFilesFilteredByAscendingWeight(!isFilesFilteredByAscendingWeight);
    }else {
      
      const sortedArray = [...files].sort((a, b) => b.fileSizeMb - a.fileSizeMb);
      setFilesFiltered(sortedArray);
      setIsFilesFilteredByAscendingWeight(!isFilesFilteredByAscendingWeight);
    }
  }

  export default SortFilesByWeight
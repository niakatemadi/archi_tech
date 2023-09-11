type SortByDateProps = {
    setFocusLink: any,
    isFilesFilteredByAscendingDate: boolean,
    setFilesFiltered : any,
    setIsFilesFilteredByAscendingDate: any,
    files: any
}

function SortFilesByDate({setFocusLink,isFilesFilteredByAscendingDate, setFilesFiltered, setIsFilesFilteredByAscendingDate, files} : SortByDateProps){
    setFocusLink("focusDate");

    if(isFilesFilteredByAscendingDate){

      const sortedArray = [...files].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setFilesFiltered(sortedArray);
      setIsFilesFilteredByAscendingDate(!isFilesFilteredByAscendingDate);
    }else {
      
      const sortedArray = [...files].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setFilesFiltered(sortedArray);
      setIsFilesFilteredByAscendingDate(!isFilesFilteredByAscendingDate);
    }
  }

  export default SortFilesByDate
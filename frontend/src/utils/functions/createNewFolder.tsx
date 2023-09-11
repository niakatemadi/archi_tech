import React from 'react'
import useFetch from '../hooks/useFetch';

type CreateNewFolderProps = {
  userId: string,
  setUser: any,
  setMessageNewFolderAdded : any,
  setFolders: any,
  folderFormData: any
}

const CreateNewFolder = async({userId, setUser, setMessageNewFolderAdded, setFolders, folderFormData} : CreateNewFolderProps) => {
  const url = "http://localhost:3350/api/v1/folders";
  const body = {"userId": userId, "folderLabel": folderFormData.folderLabel};

  const {userUpdated, newFolderList} = await useFetch("POST",url,JSON.stringify(body));

  if(userUpdated){
    setUser(userUpdated);
    setMessageNewFolderAdded("Nouveau dossier ajouté !")

  }

  setFolders(newFolderList)

  localStorage.setItem("currentUser",JSON.stringify(userUpdated));
}
export default CreateNewFolder
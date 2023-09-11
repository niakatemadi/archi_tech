import React from 'react'
import useFetch from '../hooks/useFetch';

type AddFileToDbProps = {
    fileFormData: any,
    setFiles : any,
    setUser: any,
    setMessageNewFileAdded : any,
    files : any,
    userId: string,
    folderId: string
}

const AddFileToDb = async({fileFormData,setFiles,setUser,setMessageNewFileAdded, files, folderId, userId} : AddFileToDbProps) => {

        const formData = new FormData();

        formData.set("file",fileFormData.file);
        formData.set("fileLabel",fileFormData.fileLabel);
        formData.set("userId",userId);
        formData.set("folderId",folderId);

        const url = "http://localhost:3350/api/v1/files";

        const datas = await useFetch("POST",url, formData, false);
        
        if(datas){
          const userUpdated = datas.userUpdated;
          localStorage.setItem("currentUser", JSON.stringify(userUpdated));
          setFiles([...files, datas.file]);
          setUser(userUpdated);
          setMessageNewFileAdded("Nouveau fichier ajouté !");
        }
}

export default AddFileToDb
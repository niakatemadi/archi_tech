import React from 'react'
import useFetch from '../hooks/useFetch';

type deleteFileProps = {
    fileId: string,
    userId: string,
    fileSizeMb: number,
    folderId: string,
    setUser: any, 
    setFiles: any
}

const DeleteFile = async({fileId, userId, fileSizeMb, folderId, setUser, setFiles} : deleteFileProps) => {

    const body = JSON.stringify({userId, fileId, fileSizeMb, folderId});

    const url = "http://localhost:3350/api/v1/files"

    const {userUpdated, newFilesList} = await useFetch("DELETE",url,body);

    setUser(userUpdated);
    setFiles(newFilesList);
    localStorage.setItem("currentUser",JSON.stringify(userUpdated));
}

export default DeleteFile
import useFetch from "../hooks/useFetch";

type DeleteFolderProps = {
    folderId: string,
    userId: string,
    setUser: any,
    setFolders: any
}

const DeleteFolder = async({folderId, userId, setUser, setFolders} : DeleteFolderProps) => {

    const url = `http://localhost:3350/api/v1/folders/${folderId}`;
    const body = { userId };

    const {userUpdated, newFolderList} = await useFetch("DELETE", url, JSON.stringify(body));

    setUser(userUpdated);
    setFolders(newFolderList);
    localStorage.setItem("currentUser", JSON.stringify(userUpdated));

  }
export default DeleteFolder;
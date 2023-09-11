import React, { useContext, useState } from 'react'
import "./CustomerFoldersPage.scss";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../utils/contexts/userContext';
import AlertComponent from '../../../components/AlertComponent/AlertComponent';
import TextField from '../../../components/TextField/TextField';
import ItemComponent from '../../../components/ItemComponent/ItemComponent';
import useFetchFolders from '../../../utils/hooks/useFetchFolders';
import useFetch from '../../../utils/hooks/useFetch';
import CreateNewFolder from '../../../utils/functions/createNewFolder';
import DeleteFolder from '../../../utils/functions/deleteFolder';



const CustomerFoldersPage =  () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);

    const {user, setUser} = useContext(UserContext);
    const [folders, setFolders] = useFetchFolders(currentUser._id);
    const [folderFormData, setFolderFormData] = useState<any>({});
    const [messageNewFolderAdded, setMessageNewFolderAdded] = useState<string>();


    function RedirectToFilesPage(element:any){
      navigate("/customerDashboard/files", {state: {folderInfo : element}});
    };

    function HandleInputData(e:any){
      setFolderFormData({[e.target.name] : e.target.value})
    }

  return (
    <div className='MyFoldersSection'>
      <div className='MyFoldersSection__header'>
          <p className='MyFoldersSection__header--title'> Mes dossiers</p> 
          <AlertComponent title={'Ajouter un dossier'} buttonText={'Ajouter un dossier'} agreeOnClick={() => CreateNewFolder({userId: user._id, setUser, setMessageNewFolderAdded, setFolders,folderFormData})} >
            <TextField name="folderLabel" onChange={HandleInputData} placeholder=" Nom du dossier" />     
          </AlertComponent>
      </div >
      <span className='MyFoldersSection__messageNewFolderAdded'>{messageNewFolderAdded}</span>
      <div className='MyFoldersSection__folderList'>
        {
          folders.map( (element, index) => <ItemComponent key={index} isFolderItem buttonText={element.folderLabel} agreeOnClick={() => DeleteFolder({folderId: element._id, userId: element.userId, setUser, setFolders})} clickOnItem={() => RedirectToFilesPage(element)} children={undefined} />)    
        }         
      </div>
      
    </div>
  )
}

export default CustomerFoldersPage
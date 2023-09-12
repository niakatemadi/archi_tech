import React, { useContext, useState } from 'react'
import "./AdminCustomerFoldersPage.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../utils/contexts/userContext';
import AlertComponent from '../../../components/AlertComponent/AlertComponent';
import TextField from '../../../components/TextField/TextField';
import ItemComponent from '../../../components/ItemComponent/ItemComponent';
import useFetchFolders from '../../../utils/hooks/useFetchFolders';
import useFetch from '../../../utils/hooks/useFetch';
import pageRedirection from '../../../utils/functions/pageRedirection';
import BackComponent from '../../../components/BackComponent/BackComponent';
import DeleteFolder from '../../../utils/functions/deleteFolder';
import CreateNewFolder from '../../../utils/functions/createNewFolder';

const AdminCustomerFoldersPage =  () => {
    const navigate = useNavigate();
    const location = useLocation();
    const customer = location.state.customerInfo;

    const {user, setUser} = useContext(UserContext);
    const [folders, setFolders] = useFetchFolders(customer._id);
    const [folderFormData, setFolderFormData] = useState<any>({});
    const [messageNewFolderAdded, setMessageNewFolderAdded] = useState<string>();

    function HandleInputData(e:any){
      setFolderFormData({[e.target.name] : e.target.value})
    }


  return (
    <div className='MyFoldersSection'>
      <BackComponent onClick={() => pageRedirection("/adminDashboard/customers",{},navigate)} />
      <div className='MyFoldersSection__header'>
          <p className='MyFoldersSection__header--title'> Dossiers du client : {customer.name} {customer.firstName}</p> 
          <AlertComponent title={'Ajouter un dossier'} buttonText={'Ajouter un dossier'} agreeOnClick={() => CreateNewFolder({userId: user._id,folderFormData,setUser, setFolders, setMessageNewFolderAdded})} >
            <TextField name="folderLabel" onChange={HandleInputData} placeholder=" Nom du dossier" />     
          </AlertComponent>
      </div >
      <span className='MyFoldersSection__messageNewFolderAdded'>{messageNewFolderAdded}</span>
          <div className='MyFoldersSection__folderList'>
            {
              folders.map( (element, index) => <ItemComponent key={index} isFolderItem buttonText={element.folderLabel} agreeOnClick={() => DeleteFolder({folderId:element._id, userId: element.userId, setUser, setFolders})} clickOnItem={() => pageRedirection("/adminDashboard/customerFiles",element,navigate)} children={undefined} />)    
            }         
          </div>
      
    </div>
  )
}

export default AdminCustomerFoldersPage
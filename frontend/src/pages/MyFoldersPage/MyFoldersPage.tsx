import React, { useContext, useEffect, useState } from 'react'
import "./MyFoldersPage.scss";
import { Link, useNavigate } from 'react-router-dom';
import FolderComponent from '../../components/FolderComponent/FolderComponent';

const MyFoldersPage = () => {
    const [folders, setFolders] = useState([{folderLabel:"", userId:"", _id:""}]);
    const currentUser = JSON.parse(localStorage.getItem("currentUser")!);

    useEffect(() => {

        const token = localStorage.getItem("token");
        console.log("mytoken",token);

        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            }
        }

      const url = `http://localhost:3350/api/v1/folders/${currentUser._id}`;

        fetch(url, options)
        .then(response => response.json())
        .then( data => {console.log("my folders datas:",data); setFolders(data)})
        .catch(err => console.log(err));
        
    },[]);

    function DeleteFolder(folderid: string, userId: string){

        console.log("inside delete fucntion", folderid)
        const token = localStorage.getItem("token");

        const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({userId})
        }

        const url = `http://localhost:3350/api/v1/folders/${folderid}`
  // J'ai ajouter le localstorage en derniere minute
        fetch(url, options)
        .then(response => response.json())
        .then( data => {console.log("my folders datas:",data); localStorage.setItem("currentUser",data); })
        .catch(err => console.log(err));

    }

    const navigate = useNavigate();

    function RedirectToFilesPage(element:any){


      navigate("/userDashboard/files", {state: {folderInfo : element}})
    };


  return (
    <div className='MyFoldersSection'>
      <div className='MyFoldersSection__header'>
          <p> Mes dossiers</p>
      </div>
        {
            folders.map( (element, index) => <FolderComponent OnClick={() => RedirectToFilesPage(element)} key={index} title={'Supprimer'} description={'Voulez vous vraiment supprimer ce dossier ?'} buttonText={element.folderLabel} agreeOnClick={() => DeleteFolder(element._id, element.userId)} disagreeOnClick={() => {}} />) 
        
        }
      
    </div>
  )
}

export default MyFoldersPage
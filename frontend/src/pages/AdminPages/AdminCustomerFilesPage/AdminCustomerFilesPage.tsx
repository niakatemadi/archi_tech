import React, { useContext, useEffect, useState } from 'react'
import "./AdminCustomerFilesPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from '../../../utils/contexts/userContext';
import AlertComponent from '../../../components/AlertComponent/AlertComponent';
import TextField from '../../../components/TextField/TextField';
import ItemComponent from '../../../components/ItemComponent/ItemComponent';
import DownloadSvg from '../../../assets/svg/DownloadSvg';
import useFetchFiles from '../../../utils/hooks/useFetchFiles';
import BackComponent from '../../../components/BackComponent/BackComponent';
import pageRedirection from '../../../utils/functions/pageRedirection';
import upArrow from "../../../assets/up-arrow.svg";
import downArrow from "../../../assets/down-arrow.svg";
import AddFileToDb from '../../../utils/functions/addFileToDb';
import DeleteFile from '../../../utils/functions/deleteFile';
import sortFilesByDate from '../../../utils/functions/sortFilesByDate';
import SortFilesByWeight from '../../../utils/functions/sortFilesByWeight';
import sortByFileType from '../../../utils/functions/sortByFileType';

const CustomerFilesPage = () => {

    const location = useLocation();
    const folderId = location.state.folderInfo._id;
    const navigate = useNavigate();

    const [files, setFiles] = useFetchFiles(folderId);
    const {user, setUser} = useContext(UserContext);
    const [filesFiltered, setFilesFiltered] = useState<Array<any>>([]);
    const [isFilesFilteredByAscendingDate, setIsFilesFilteredByAscendingDate] = useState(true);
    const [isFilesFilteredByAscendingWeight, setIsFilesFilteredByAscendingWeight] = useState(true);
    const [messageNewFileAdded, setMessageNewFileAdded] = useState<string>();
    const [focusLink, setFocusLink] = useState("");
    const [fileFormData, setFileFormData] = useState<any>({});

      function handleFile(event:any){
        setFileFormData({...fileFormData, "file" : event.target.files[0]});
      }

      function handleInput(e:any){
        setFileFormData({...fileFormData, [e.target.name] : e.target.value});
      } 

      function SearchFiles(e:any){

        const filesFound = [...files].filter(({fileLabel}) => fileLabel.includes(e.target.value.toLowerCase()));
        setFilesFiltered(filesFound);
      }

      const displayFiles = filesFiltered.length > 0 ? filesFiltered : files;
 
      return (
          <div className='MyFilesSection'>
            <BackComponent onClick={() => pageRedirection("/adminDashboard/customers",{},navigate)} />
            <div className='MyFilesSection__header'>
              <p className='MyFilesSection__header--title'> Mes fichiers</p> 
              <input type="text" placeholder=' Rechercher un fichier' onChange={SearchFiles} />
              <AlertComponent title='Ajouter un fichier' buttonText='Ajouter un fichier' agreeOnClick={() => AddFileToDb({fileFormData,setFiles,setUser,setMessageNewFileAdded, files, folderId, userId : user._id})}>
                <TextField type='text' placeholder=' Nom du fichier' name='fileLabel' onChange={handleInput}/>
                <TextField type='file' name='file' onChange={handleFile}/>
              </AlertComponent>
            </div>
            <div className='MyFilesSection__filters'>
              <div className={`${focusLink == "focusDate" && "focusColor"}`}  onClick={() => sortFilesByDate({setFocusLink,isFilesFilteredByAscendingDate, setFilesFiltered, setIsFilesFilteredByAscendingDate, files})}>Ordonner par dates  {isFilesFilteredByAscendingDate ?<img src={upArrow} alt="up arrow" /> : <img src={downArrow} alt='down arrow' />}</div>
              <div className={`${focusLink == "focusWeight" && "focusColor"}`}  onClick={() => SortFilesByWeight({setFocusLink,isFilesFilteredByAscendingWeight, setFilesFiltered, setIsFilesFilteredByAscendingWeight, files})}>Ordonner par poids {isFilesFilteredByAscendingWeight ? <img src={upArrow} alt="up arrow" /> : <img src={downArrow} alt='down arrow' />}</div>
              <div className={`${focusLink == "focusPng" && "focusColor"}`}  onClick={() => sortByFileType({fileType : "image/png", files, setFilesFiltered, setFocusLink})}>png</div>
              <div className={`${focusLink == "focusJpg" && "focusColor"}`}  onClick={() => sortByFileType({fileType : "image/jpeg", files, setFilesFiltered, setFocusLink})}>jpg</div>
              <div className={`${focusLink == "focusPdf" && "focusColor"}`}  onClick={() => sortByFileType({fileType : "application/pdf", files, setFilesFiltered, setFocusLink})}>pdf</div>
              <div></div>
            </div>
            <span className='MyFilesSection__messageNewFolderAdded'>{messageNewFileAdded}</span>
            <div className='MyFilesSection__fileList'>
            {
              displayFiles.map(({fileLabel, _id, filePath, userId, fileSizeMb, folderId, fileName}, index) =>
                <ItemComponent key={index} isFolderItem={false} buttonText={fileLabel} agreeOnClick={() => DeleteFile({fileId:_id,userId,fileSizeMb,folderId, setFiles, setUser})} clickOnItem={() => {}} ><DownloadSvg fileLabel={fileName} href={filePath}/> </ItemComponent>
                )
            }
            </div>
          </div>
  )
}

export default CustomerFilesPage
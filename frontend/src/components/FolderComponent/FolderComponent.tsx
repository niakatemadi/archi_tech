import { useState } from "react";
import "./FolderComponent.scss";
import { Link } from "react-router-dom";

type AlertDialogProps = {
    title: string,
    description: string,
    buttonText:string,
    agreeOnClick: any,
    disagreeOnClick: any,
    OnClick:any
}

const AlertDialog = ({buttonText,title, description, agreeOnClick, disagreeOnClick, OnClick}: AlertDialogProps) => {

    const [isDisplayed, setIsDisplayed] = useState<boolean>(false)

    function ShowAlert(){
        setIsDisplayed(!isDisplayed);
    }
    
    function HandlePropagation(e:any){
        e.stopPropagation();

    }

    function DisagreeTrigger(){
        disagreeOnClick();
        ShowAlert();
    }

    function AgreeTrigger(){
        agreeOnClick()
        ShowAlert();
    }

  return (
      
      <div className='AlertDialog'>
            <div className="AlertDialog_item"  >
                <svg onClick={OnClick} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4 4 C 2.9057453 4 2 4.9057453 2 6 L 2 18 C 2 19.094255 2.9057453 20 4 20 L 20 20 C 21.094255 20 22 19.094255 22 18 L 22 8 C 22 6.9057453 21.094255 6 20 6 L 12 6 L 10 4 L 4 4 z M 4 6 L 9.171875 6 L 11.171875 8 L 20 8 L 20 18 L 4 18 L 4 6 z"/></svg>
                <p onClick={OnClick}>{buttonText}</p>
                <div onClick={ShowAlert}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px"> <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg></div>
            </div>
        <div className={`AlertDialog_background ${isDisplayed && "AlertDialog_background--displayed"}`} onClick={ShowAlert}  >
            <div className="AlertDialog_container" onClick={HandlePropagation} >
                <h3 className="AlertDialog_title" >{title}</h3>
                <p className="AlertDialog_description">{description}</p>
                <div className="AlertDialog_buttons"><div className="AlertDialog_button" onClick={DisagreeTrigger} >DISAGREE</div><div className="AlertDialog_button" onClick={AgreeTrigger}>AGREE</div></div>
            </div>
        </div>
    </div>
  )
}

export default AlertDialog
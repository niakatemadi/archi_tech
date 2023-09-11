import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from "react";

export type User = {
    name: string,
    email: string,
    firstName: string,
    _id: string,
    totalStorageUsed: number,
    numberOfFolders: number,
    numberOfFiles: number,
    totalStoragePurchased: number
}

export interface UserContextInterface {
    user : User,
    setUser: Dispatch<SetStateAction<User>>
}

const defaultState = {
    user: {
        name: "",
        email: "",
        firstName:"",
        _id:"",
        totalStorageUsed: 0,
        numberOfFolders: 0,
        numberOfFiles: 0,
        totalStoragePurchased: 0
    },
    setUser: (user: User) => {}
} as UserContextInterface;

export const UserContext = createContext(defaultState);

type userProviderProps = {
    children : ReactNode
}


export default function UserProvider( {children} : userProviderProps){
    
    const [user, setUser] = useState<User>({
        name: "",
        email:"",
        firstName:"",
        _id:"",
        totalStorageUsed: 0,
        numberOfFolders: 0,
        numberOfFiles: 0,
        totalStoragePurchased: 0
    });

    useEffect(() => {
     
        const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? "{}");

        if(currentUser != "{}"){
            setUser({name: currentUser.name, firstName: currentUser.firstName, email: currentUser.email, _id: currentUser._id, totalStorageUsed: currentUser.totalStorageUsed, numberOfFiles: currentUser.numberOfFiles, numberOfFolders:currentUser.numberOfFolders, totalStoragePurchased: currentUser.totalStoragePurchased});
        }
    },[])

    return (
        <UserContext.Provider value={{user, setUser}} >
            {children}
        </UserContext.Provider>
    )
}
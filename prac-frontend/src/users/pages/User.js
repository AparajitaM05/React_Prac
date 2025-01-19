import react, { useEffect, useState } from "react";
import UserList from "../components/UserList";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
const User = ()=>
{
    const{isLoading, error, sendRequest, clearError}= useHttpClient();
        const [loadedUsers, setLoadedUsers] = useState()

        useEffect(()=>{
            const fetchUsers = async () =>{
               
                try{
                   
                    const responseData = await sendRequest(
                        'http://localhost:3001/api/users/'
                        );
                    
                    setLoadedUsers(responseData.users)
                }
                catch(err){}
                
            };
            fetchUsers();
        }, [sendRequest])

       

    return (
    <react.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && (
            <div className="center">
                <LoadingSpinner/>

            </div>
        )}
    {!isLoading && loadedUsers && <UserList items={loadedUsers}/>}
    </react.Fragment>
    )

}
export default User;
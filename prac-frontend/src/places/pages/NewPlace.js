import react, { useCallback, useReducer, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import "./NewPlace.css"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/components/util/validator";
import Button from "../../shared/components/FormElements/Button"
import { useForm } from "../../shared/hooks/form-hook";
import {useHttpClient} from "../../shared/hooks/http-hook"
import {AuthContext} from "../../shared/context/auth-context"
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";

const NewPlace = ()=>{
    const auth = useContext(AuthContext)
    const {isLoading, error,sendRequest, clearError} = useHttpClient()

    const [formState,inputHandler] = useForm(
        {
            title:{
                value: '',
                isValid: false
            },
            description:{
                value: '',
                isValid: false
            },
            address:{
                value: '',
                isValid: false
            }

        },
        false
    )

   


  

     const inputSubmitHandeler= async event=>{
        event.preventDefault();
        try{
            await sendRequest('http://localhost:3001/api/places',
                'POST',
                JSON.stringify({
                   title: formState.inputs.title.value,
                   description: formState.inputs.description.value,
                   address: formState.inputs.address.value,
                   creator: auth.userId
                }),
                {
                    'Content-Type' : 'application/json'
                }
            )

        }catch(err){

        }
       
     }
  

    return(
        <react.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
        <form className="place-form" onSubmit={inputSubmitHandeler}>
            {isLoading && <LoadingSpinner asOverlay/>}
            <Input 
            id ="title"
            element="input"
             type="text" 
             label="Title"
             validators={[VALIDATOR_REQUIRE()]}
             errorText="Please enter valid title"
             onInput={inputHandler}/>

            <Input 
            id="description"
            element="textarea"
             label="Description"
             validators={[VALIDATOR_MINLENGTH(5)]}
             errorText="Please enter valid description atleast 5 char"
             onInput={inputHandler}/>

            <Input 
            id="address"
            element="input"
             label="Address"
             validators={[VALIDATOR_REQUIRE()]}
             errorText="Please enter valid description atleast 5 char"
             onInput={inputHandler}/>

             <Button type="submit" disabled={!formState.isValid}>Add Place</Button>
        </form>
        </react.Fragment>
        
    )
}

export default NewPlace;
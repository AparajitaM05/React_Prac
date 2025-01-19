import React, { useState,useContext } from "react";
import "./Auth.css"
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElement/Card";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/components/util/validator";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Auth = ()=>{

      const auth =  useContext(AuthContext)
        const [isLogin, setIsLogin] = useState(true);
        const {isLoading, error, sendRequest, clearError} = useHttpClient()

        const[formState, inputHandler, setFormData] = useForm({
            email:{
                value:'',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        }, false
    );


        const switchModeHandeler=()=>{
            if(!isLogin){
                setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                   

                },
            formState.inputs.email.isValid && formState.inputs.password.isValid)
            }
            else{
                setFormData({
                    ...formState.inputs,
                    name:{
                        value: "",
                        isValid: false
                    }
                }, false)
            }
            setIsLogin(prev=>!prev)
        }

        const authSubmitHandeler= async (event)=>{
                    event.preventDefault();
                    if(isLogin){
                            try{

                               const responseData =  await sendRequest(
                                    'http://localhost:3001/api/users/login', 
                                    'POST',
                                    JSON.stringify({
                                        email:formState.inputs.email.value,
                                        password:formState.inputs.password.value
                                    }),
                                    {
                                        'Content-Type':'application/json'
    
                                    }
                           
                                );
                                console.log(responseData.user.id)
                                auth.login(responseData.user.id)

                            }catch(err) {}
                      }
                    else{
                        try{
                            const responseData =  await sendRequest(
                                'http://localhost:3001/api/users/signup', 
                                'POST',
                                 JSON.stringify({
                                    name: formState.inputs.name.value,
                                    email:formState.inputs.email.value,
                                    password:formState.inputs.password.value
                                }),
                                {
                                    'Content-Type':'application/json'

                                }
                 
                            )
                            console.log(responseData.user.id)
                            auth.login(responseData.user.id)
                        }
                        catch(err){
                            

                        }
                    }
                    
        }
       


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
        <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
            <h2>Login Required</h2>
            <hr/>
        <form onSubmit={authSubmitHandeler}>
            {!isLogin?(
                <Input 
                id="name"
                element="input"
                type="name"
                label="Name"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Name can't be empty"
                onInput={inputHandler}/>
            ):(null)}
        <Input
        id="email"
        element="input"
        type="email"
        label="E-mail"
        validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email"
        onInput={inputHandler}/>

          <Input
        id="password"
        element="input"
        type="password"
        label="Password"
        validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a text of min length 5"
        onInput={inputHandler}/>

        <Button type="submit">
            {isLogin? "Login" : "Signup"}
            </Button>

        </form>
        <Button inverse onClick={switchModeHandeler}>SWITCH TO {isLogin? "Signup" : "Login"}</Button>
        </Card>
        </React.Fragment>
    )

}
export default Auth
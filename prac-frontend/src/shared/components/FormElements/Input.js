import react,{useEffect, useReducer} from "react";
import "./Input.css"
import {validate} from "../util/validator"

const inputReducer= (state,action)=>{
    switch(action.type){
        case "change":
            return{
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validator)

            };
            case "touch":{
                return{
                    ...state,
                    isTouch: true,
                }
            }

            default:
                return state;
    }

}

const Input =(props)=>{
    const[inputState , dispatch] = useReducer(inputReducer, {
        value: props.value || "",
        isValid: props.valid || false,
        isTouch: false,
        
    });

    const {id, onInput} = props
    const {value, isValid} = inputState

     useEffect(()=>{
        props.onInput(id,value,isValid)
     },[id,value,onInput,isValid])
    
    const changeHandler = (event)=>{
        dispatch({
            type:"change", 
            val: event.target.value,
            validator: props.validators
        })

    }

    const touchHandler = ()=>{
        dispatch({
            type: "touch",
        })

    }


    const element = props.element === 'input'?
    ( <input 
        id={props.id} 
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}/>)
    :
    (
        <textarea 
        id={props.id} 
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}/>

   )
   
   

    return(
        <div className={`form-control ${
            !inputState.isValid && inputState.isTouch ?"form-control--invalid" : ""}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouch && <p>{props.errorText}</p>}
        </div>
    )
}
export default Input;
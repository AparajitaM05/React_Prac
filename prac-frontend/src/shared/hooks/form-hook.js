import { useCallback,useReducer } from "react";

const formReducer = (state , action)=>{
    switch(action.type){
        case 'Input_Change':
            let formIsValid = true;
            for(const inputId in state.inputs){
                if(!state.inputs[inputId]) continue
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                }
                else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                inputs:{
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            }
        
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid

            }



        default:
            return state;
    }
     

}


export const useForm = (initialInputs, inputFormValidity) =>{

    const[formState, dispatch] = useReducer(formReducer,{

        inputs: initialInputs,
        isValid: inputFormValidity,
    })

    const inputHandler = useCallback((id,value,isValid)=>{
        dispatch({
            type:'Input_Change',
            value:value,
            inputId:id,
            isValid: isValid})
        
    
       },[])

       const setFormData = useCallback((inputData, formValidity)=>{
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        })
       },[])

       return [formState,inputHandler, setFormData]

}
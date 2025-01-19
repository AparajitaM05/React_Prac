import React, { useEffect, useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import { validate, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/components/util/validator";
import Button from "../../shared/components/FormElements/Button";
import PlaceList from "../components/PlaceList"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./NewPlace.css"
import { useForm } from "../../shared/hooks/form-hook";
import { preventDefault } from "ol/events/Event";
import Card from "../../shared/components/UIElement/Card";



const DummyPlace = [
    {
        id:'p1',
        title: 'Empire State Building',
        description:'One of the most famous',
        imageUrl: "https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png",
        address: '20 W 34th St, New York, NY 2001',
        location: {
            lat: 40.6892,
            long: -74.0445
        },
        creatorId: 'u1'

    },
    {
        id:'p2',
        title: 'Empire State Building',
        description:'One of the most famous',
        imageUrl: "https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png",
        address: '20 W 34th St, New York, NY 2001',
        location: {
            lat: 27.8532371,
            long: 79.8184203
        },
        creatorId: 'u2'

    },

]

const UpdatePlace = ()=>{
    const [isLoading, setIsLoading] = useState(true)
    const pid = useParams().pid
    const identifiedPlaces = DummyPlace.find(p=> p.id === pid)

    const [formState, inputHandler, setFormData] = useForm({
        title:{
            value: identifiedPlaces.title,
            isValid: true
        },
        description: {
            value: identifiedPlaces.description,
            isValid: true
        }
    },
        true
    );

    useEffect(()=>{
        if(identifiedPlaces)
        {
            setFormData({
                title: {
                    value: identifiedPlaces.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlaces.description,
                    isValid: true
                }
            }, true)

        }
      
      
        setIsLoading(false)

    },[setFormData,identifiedPlaces])

    if(!identifiedPlaces)
    {
        return(
            <div className="center">
                <Card>
                <h2>Could not find a place!</h2>
                </Card>
            </div>
        )

    }

   
   
    const onSubmitHandeler = (event)=>{
        preventDefault()
        console.log(formState.inputs)
    }

    if(isLoading){
        return(
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }


   return ( 
   <form className="place-form" onSubmit={onSubmitHandeler}>
            <Input 
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid text"
            onInput={inputHandler}
            value={formState.inputs.title.value}
            valid={formState.inputs.title.isValid}/>

            <Input 
            id="description"
            element="textarea"
            
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description"
            onInput={inputHandler}
            value={formState.inputs.description.value}
            valid={formState.inputs.description.isValid}/>
            <Button type="submit" disabled={!formState.isValid}>Update Place</Button>
   </form>
   )


}
export default UpdatePlace;
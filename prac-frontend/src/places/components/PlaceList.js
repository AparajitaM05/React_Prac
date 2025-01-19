import react from "react";
import Card from "../../shared/components/UIElement/Card";
import "./PlaceList.css";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";

const PlaceList = (props)=>
    {
        if(props.item.length===0)
        {
            return( 
                <div className="place-list center">
                <Card>
                <h3>Sorry you don't have places?</h3>
                <Button to="/places/new">Share Place</Button>
                </Card>
                </div>
            )

        }

        return( <ul className="place-list">
            {props.item.map(place => <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description={place.description}
            address = {place.address}
            creatorId = {place.creatorId}
            coordinates = {place.location}
            
            />)}

        </ul>

        )
            




}
export default PlaceList;
import react from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

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
const UserPlace = ()=>{
    const userId = useParams().uid;
    const loadedPlaces  = DummyPlace.filter(places=> places.creatorId === userId)
    return(
        <PlaceList item={loadedPlaces}/>
        
    )
}

export default UserPlace;
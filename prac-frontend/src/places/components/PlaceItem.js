import react from "react";
import "./PlaceItem.css";
import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElement/Modal";
import { useState, useContext } from "react";
import Map from "../../shared/components/UIElement/Map";
import { AuthContext } from "../../shared/context/auth-context";


const PlaceItem = (props)=>{

    const auth = useContext(AuthContext);

    const [showMap, setShowMap]= useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const openMapHandler=() =>{
        setShowMap(true)
    }

    const closeMapHandler=() =>{
        setShowMap(false)
    }

    const showDeleteWarningHandeler = ()=>{
        setShowConfirmModal(true);

    }

    const cancelDeleteHandeler = ()=>{
        setShowConfirmModal(false);

    }

    const confirmDeleteHandeler =  ()=>{
        console.log("DELETING...")

    }

    return<react.Fragment>
        <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass = "place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        >
            <div className="map-container">
                <Map  center={{ lat: 27.1751, lng: 78.0421 }} zoom={16}/>
            </div>
        </Modal>
        <Modal 
        show = {showConfirmModal}
        onCancel = {cancelDeleteHandeler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
            <react.Fragment>
                <Button inverse onClick={cancelDeleteHandeler}>CANCEL</Button>
                <Button danger onClick={confirmDeleteHandeler}>DELETE</Button>
            </react.Fragment>
        }>
            <p>Are you shure you wanna delete it?</p>
        </Modal>
    <li className="place-item">
        <Card>
        <div className="place-item__image">
            <img src={props.image} alt={props.title}/>
        </div>
        <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>

        </div>
        <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>View on map</Button>
            {auth.isLoggedIn && (<Button to={`/places/${props.id}`}>Edit</Button>)}
            {auth.isLoggedIn && (<Button danger onClick={showDeleteWarningHandeler}>Delete</Button>)}

        </div>
        </Card>
    </li>
    </react.Fragment>

}
export default PlaceItem;
import react from "react";
import "./UserItem.css";
import Avatar from "../../shared/components/UIElement/Avatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Card from "../../shared/components/UIElement/Card";
const UserItem = (props)=>
{
    return(
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${props.id}/places`}>
                <div className="user-item__image">
                    <Avatar src ={props.image} alt={props.name}/>
                </div>
                <div className="user-item__info">
                    <h2>{props.name}</h2>
                    <h3>
                        {props.placeCount} {props.placeCount === 1? "Place" : "Places"}
                    </h3>
                </div>
                </Link>
            </Card>
        </li>
    )

}
export default UserItem;
import React from "react";
import MainHeader from "./MainHeader";
import "./MainNavigation.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import { useState } from "react";
import Backdrop from "../UIElement/Backdrop";
const MainNavigation = (props)=>{
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () =>{
        setIsDrawerOpen(true)

    }
    const closeDrawer = ()=>{
        setIsDrawerOpen(false)
    }

    return (
        <React.Fragment>
            {isDrawerOpen?<Backdrop onClick={closeDrawer}/>:null}
            {isDrawerOpen?(
            <SideDrawer show={isDrawerOpen} onClick={closeDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks/>
                </nav>

            </SideDrawer>
    ) : null}
       <MainHeader className="main-navigation__menu-btn">
        <button className="main-navigation__menu-btn"  onClick={openDrawer}>
           
            <span/>
            <span/>
            <span/>
        </button>
        <h1 className="main-navigation__title">
            <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation___header-nav">
        <NavLinks/>
        </nav>

       </MainHeader>
       </React.Fragment>
    )

}

export default MainNavigation;
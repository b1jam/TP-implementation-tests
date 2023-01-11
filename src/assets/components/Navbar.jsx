import React, { useState, useEffect } from "react";

import NavbarLeftSideItem from "./Navbar/NavbarLeftSideItem";
import NavbarRightSideItem from "./Navbar/NavbarRightSideItem";
import Hamburger from "./Navbar/Hamburger";

import ModelsTab from "./Navbar/ModelsTab";

import navbarJSON from "./Navbar/navbar.json" 





export default function Navbar({screenSize}) {

    const [scrollState, setScrollState] = React.useState({
        position: null,
        direction: ""
    })
    // track users scrolling
    React.useEffect(() => {
        const handleScroll = () => setScrollState(prevState => ({
            position: window.scrollY,
            direction: prevState.position === null ? "down" : 
                prevState.position < window.scrollY ? "down" : "up"
        }))
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [])

    const [navbarState, setNavbarState] = React.useState({
        className: "navbar",
        openedTabName: null,
        isHome: true,
        isMinmized: false,
        isLight: false
    })
    // set "HOME" position DESKTOP SCRENNS ONLY
    useEffect(() => {
        if (screenSize === "desktop") {
            if (scrollState.position === null || window.scrollY === 0) {
                setNavbarState(prevState => ({
                    ...prevState,
                    isHome: true,
                    isMinmized: false,
                    isLight: false
                }))
            }
        }

    }, [scrollState.position])
    useEffect(() => {
        if (screenSize === "desktop") {
            if (scrollState.direction === "down") {
                setNavbarState(prevState => ({
                    ...prevState,
                    isHome: false,
                    isMinmized: true,
                    isLight: true
                }))
            }
            else if (scrollState.direction === "up") {
                setNavbarState(prevState => ({
                    ...prevState,
                    isHome: false,
                    isMinmized: false,
                    isLight: true
                }))
            }
        }
    }, [scrollState.direction])

    function navbarClassName() {
        let name = "navbar"
        if (screenSize === "desktop") {
            name += " desktop"
        }
        if (navbarState.isMinmized) {
            name += " minimized"
        }
        if (navbarState.isLight) [
            name += " light"
        ]
        if (hamburgerState.isExpanded) {
            name += " hamburg_opened"
        }
        return name
    }
    function openNavbarTab(event) {
        const tabID = event.target.id
        setNavbarState(prevState => ({
            ...prevState,
            openedTabName: prevState.openedTabName === tabID ? null : tabID
        }))
    }
    // expand navbar onClick DESKTOP SCRENNS ONLY
    function handleMaximize() {
        setNavbarState(prevState => ({
            ...prevState,
            isMinmized: false
        }))
    }
    // collapsee on off hover DESKTOP SCRENNS ONLY
    function handleMinimize() {
        navbarState.isHome !== false ?
            null :
            navbarState.openedTabName &&
                setNavbarState(prevState => ({
                    ...prevState,
                    isMinmized: true
                }))
    }

    const [hamburgerState, setHamburgerState] = useState({
        isExpanded: false
    })
    function expandHamburger() {
        setNavbarState(prevState => ({
            ...prevState,
            openedTabName: hamburgerState.isExpanded ? null : prevState.openedTabName
        }))
        setHamburgerState(prevState => ({
            ...prevState,
            isExpanded: !prevState.isExpanded
        }))
    }


    function goBack() {
        setNavbarState(prevState => ({
            ...prevState,
            openedTabName: null
        }))
    }


    return (
        <div className="header">
            <nav 
                className={navbarClassName()}  
                onClick={handleMaximize}
                onMouseLeave={handleMinimize}
                >
               <div className="navbar__left__side">
                   <div className="navbar__logo"/>
                   {
                        screenSize === "desktop" &&
                            navbarJSON.data.left.map(item => {
                                return <NavbarLeftSideItem 
                                            key={item.id}
                                            item={item}
                                            screenSize={screenSize}
                                            navbarState={navbarState}
                                            openNavbarTab={openNavbarTab}
                                />
                            })
                   }
               </div>
               <div className="navbar__right__side">
                    {
                        screenSize === "desktop" ?
                            navbarJSON.data.right.map(item => <NavbarRightSideItem key={item.id} item={item} openNavbarTab={openNavbarTab}/>) :
                            hamburgerState.isExpanded ?
                                <NavbarRightSideItem item={navbarJSON.data.right[1]} openNavbarTab={openNavbarTab}/> :
                                <NavbarRightSideItem item={navbarJSON.data.right[0]} openNavbarTab={openNavbarTab}/>
                    }
                    {
                        screenSize !== "desktop" && 
                        <div className="hamburger" onClick={expandHamburger}>
                            <i className={
                                hamburgerState.isExpanded ? 
                                    "humbuger__icon fa-sharp fa-solid fa-xmark" : 
                                    "humbuger__icon fa-sharp fa-solid fa-bars"
                            }/>
                        </div>
                    }
                </div>
            </nav>
            {
                navbarState.openedTabName === null ?
                    hamburgerState.isExpanded  &&
                    <Hamburger 
                        screenSize={screenSize}
                        navbarState={navbarState}
                        setNavbarState={setNavbarState}
                        openNavbarTab={openNavbarTab}
                        
                        navbarJSON={navbarJSON}
                    />
                    : null
            }
            {
                navbarState.openedTabName === "models" && <ModelsTab goBack={goBack} hamburgerState={hamburgerState}/>
            }
        </div>
    )
}




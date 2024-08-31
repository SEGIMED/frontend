'use client'

import { current } from "@reduxjs/toolkit";

class Observer{
    constructor(){
        this.remoteUser = null;
        this.userObj = null;
        this.remoteStateRef = null;
        this.stateRef = null;
        if(!Observer.instance){
            Observer.instance = this;
        }
        return Observer.instance
    }

    addViewMediaUser(videoRef){
        this.remoteUser = videoRef.current
    }
    addViewRemoteState(stateRef){
        this.remoteStateRef = stateRef.current;
    }

    addViewState(state){
        this.stateRef = state.current 
    }
    
    setState(str){
        if(this.stateRef){
            this.stateRef.innerText = str;
        }
    }
    setStreamVideo(data){
        this.remoteUser.srcObject = data; 
    }
}

const observer = new Observer();

export default observer
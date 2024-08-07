class Observer{
    constructor(){
        this.remoteUser = null;
        this.stateRef = null;
        if(!Observer.instance){
            Observer.instance = this;
        }
        return Observer.instance
    }
    addViewMediaUser(videoRef){
        this.remoteUser = videoRef;
    }
    addViewState(stateRef){
        this.stateRef = stateRef;
    }

    setState(str){
        if(this.stateRef){
            this.stateRef.innerText = str;
        }
    }
    setStreamVideo(data){
        this.remoteUser.current.srcObject = data; 
    }
}

const observer = new Observer();

export default observer
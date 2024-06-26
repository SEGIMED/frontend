class Observer{
    constructor(){
        this.usersViewMedia = {}
        this.stateRef = null;
        if(!Observer.instance){
            Observer.instance = this;
        }
        return Observer.instance
    }
    addViewMediaUser(userId,videoRef){
        this.usersViewMedia[userId] = videoRef;
    }
    addViewState(stateRef){
        this.stateRef = stateRef;
    }

    setState(str){
        if(this.stateRef){
            this.stateRef.innerText = str;
        }
    }
    setStreamVideo(userId,data){
        this.usersViewMedia[userId].srcObject = data;
    }
}

const observer = new Observer();

export default observer
'use client'
class GetMediaUser{

    constructor(){
        this.stream = null;
        this.preferent = {audio:null,video:null};
        if(!GetMediaUser.instance){
            GetMediaUser.instance = this;
        }
        return GetMediaUser.instance
    }


    //método para obtener los permisos.

    async getPermissions(){
       try {
           const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
           if(stream) {
                this.stream = stream
           }
           return this.stream
       } catch (error) {
          return error
       }

    }

    async getListDevices(){
        try {
            const listDevices = await navigator.mediaDevices.enumerateDevices();
            return listDevices
        } catch (error) {
            return error
        } 

    }

    async getUpdateStream(){
        try {
            let constrains = {
                audio: this.preferent.audio ? { deviceId: this.preferent.audio} : true,
                video: this.preferent.video ? { deviceId: this.preferent.video} : true
            }


               const stream = await navigator.mediaDevices.getUserMedia(constrains);
               return stream
            
        } catch (error) {
            return error
        }
    }
}


export default new GetMediaUser();
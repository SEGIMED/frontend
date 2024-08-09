'use client'
import rtcPer from "@/utils/RTCPeer";
import { socket } from "@/utils/socketio";
import { useEffect, useMemo, useState } from "react";
import Avatars from "../avatar/avatarChat";
import Cookies from "js-cookie";
const UserComponent = ({ dataUser }) => {
  return (
    <div className="h-[150px] w-[100px]">
      <h3 className="mb-3">{dataUser.state}</h3>
      <p>
        <Avatars avatar1={dataUser.avatar} />{" "}
        {`${dataUser.name} ${dataUser.lastname}`}
      </p>
    </div>
  );
};

export default function Room({ onClick,consultId }) {
  const [userObj, setUserObj] = useState(null);
  const [targetObj, setTargetObj] = useState(null);
  const [dataChannel,setDataChannel] = useState(null);
  useEffect(() => {
    if(!dataChannel){
        socket._socket.emit("joinRoom",consultId,async (data) =>{
            if(data){    
                setDataChannel(data)
            }
        });
    }

        socket._socket.on('updateRoom',(data) => {
            console.log('entro al update',data)
            setDataChannel(data)
        });
     

    if(dataChannel){
      const myId = Cookies.get("c"); 
      const { physician, patient } = dataChannel;
      physician.id === Number(myId)
        ? setUserObj(physician)
        : setTargetObj(physician);

      patient.id === Number(myId) ? setUserObj(patient) : setTargetObj(patient);
    } 
  }, [dataChannel]);

  const Button = ({ user }) => {
    if (user.role === 2)
      return userObj.state === "Ready" && targetObj.state === "Ready" ? (
        <button className="p-4 border-2 border-black" onClick={() => onClick("InCalling")}>Inciar Llamada</button>
      ) : (
        <button className="p-4 border-2 border-black" onClick={() => onClick("InCalling")}>
          Inciar Llamada
        </button>
      );
  };

  
  return (
    <div className="w-full h-full flex items-center justify-center gap-16">
      {(userObj && <UserComponent dataUser={userObj} />) || "no se encontro"}

      {(targetObj && <UserComponent dataUser={targetObj} />) ||
        "no se encontro"}
      { userObj && <Button user={userObj} />}
    </div>
  );
}

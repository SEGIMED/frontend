"use client";
import { useState,useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import getAllUsers from "./fetching/getAllUsers";
import { addAllUsers } from "@/redux/slices/user/allUsers";
import getPatientDetail from "./fetching/getPatientDetail";
import { adduser } from "@/redux/slices/user/user";
import getAlarmByPatientId from "./fetching/getAlarmByPatientID";
import { addActiveAlarms } from "@/redux/slices/alarms/alarms2";

export default function UseDataFetchingAdmin() {
    const dispatch = useAppDispatch();
    const [flag, setFlag] = useState(false);
    const hasFetchData=useRef(false)
    const hasFetchDataP=useRef(false)

    const setAllUsers = async (headers) => {
        const response = await getAllUsers(headers);
        if (response.data) dispatch(addAllUsers(response.data));
    };

    const setPatientDetail = async (id, headers) => {
        // if(!hasFetchDataP.current){
            
        // }
        // hasFetchDataP.current=true
        const response = await getPatientDetail(id, headers);
        dispatch(adduser(response));
    };

    const setAlarmByPatientId = async (id) => {
        if(!hasFetchData.current){
            const response = await getAlarmByPatientId(id);
            const activeAlarms = response.filter((alarma) => !alarma.solved);
            if(!flag){
                dispatch(addActiveAlarms({ alarms: activeAlarms, flag })); 
                setFlag(true); 
                hasFetchData.current=true
            }

        }
    };

    return {
        setAllUsers,
        setPatientDetail,
        setAlarmByPatientId
    };
}

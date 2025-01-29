import { createContext, useContext, useEffect, useState } from "react";

const AlarmContext = createContext();


const useAlarm = () => {
    return useContext(AlarmContext);
}


const AlarmProvider = ({children}) => {

    const [ alarms, setAlarms ] = useState(() => {
        const storedAlarms = localStorage.getItem('alarms');
        return storedAlarms ? JSON.parse(storedAlarms) : []
    });

    const [ newAlarm, setNewAlarm ] = useState({})

    
    useEffect(() => {
        localStorage.setItem('alarms', JSON.stringify(alarms));
    },[alarms])


    const addAlarm = (newAlarm) => {
        setAlarms((prevAlarms) => [...prevAlarms, newAlarm])
    }


    const deleteAlarm = ( id ) => {
        setAlarms(alarms.filter(alarm => alarm.id !== id  ))
    }
    
    return (
        <AlarmContext.Provider value={{addAlarm, setAlarms, alarms, setNewAlarm, newAlarm }}>
            {children}
        </AlarmContext.Provider>
    )
}

export { AlarmContext, AlarmProvider, useAlarm }
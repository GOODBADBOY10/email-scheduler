import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/authContext';
import { getAuth } from 'firebase/auth';
import { app } from '../utils/firebase';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Try = () => {
    const auth = getAuth(app)
    const navigate = useNavigate()
    const { user } = useAuth();
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false);
    const [subject, setSubject] = useState('')
    const [alarmTime, setAlarmTime] = useState('')
    const [text, setText] = useState('')
    const [alarms, setAlarms] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);



    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);



    // checking tasks every 6000miliseconds
    useEffect(() => {
        const interval = setInterval(() => {
            checkAlarms();
        }, 6000)
        return () => clearInterval(interval)
    }, [alarms])

    // displayin all saved alarms.
    useEffect(() => {
        const storedAlarms = localStorage.getItem('alarms');
        if (storedAlarms) {
            setAlarms(JSON.parse(storedAlarms))
        }
    }, []);


    // checking alarms
    const checkAlarms = () => {
        const currentTime = new Date();
        alarms.forEach(alarm => {
            const alarmTime = new Date(alarm.date);
            if (alarmTime <= currentTime && !alarm.notified) {
                triggerNotification(alarm)
                alarm.notified = true;
                alert(`Your alarm ${alarm.subject} with the description of ${alarm.text} is due at ${alarm.time}`)
                saveAlarms(alarms); // Save the updated task state
            }
        });
    };

    // trigger notofications
    const triggerNotification = (alarm) => {
        if (Notification.permission === 'granted') {
            new Notification('Alarm Reminder', {
                body: `Your alarm ${alarm.title} is due at ${alarm.time}`,
            })
        }
    }

    const saveAlarms = (updatedAlarms) => {
        localStorage.setItem('alarms', JSON.stringify(updatedAlarms))
    }


    // deleting alarm
    const handleAlarmDelete = (time) => {
        const updatedAlarms = alarms.filter((alarm) => alarm.time !== time)
        setAlarms(updatedAlarms)
        localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
    }

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!subject || !alarmTime || !text || !selectedDate || !email) {
            alert('Please fill in all fields')
            return;
        }
        fetch('https://email-rhpy1iql3-adebisi-s-projects.vercel.app/api/send-email', {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, subject, text })
        })
        .then((response) => response.json())
        .then((data) => {
            setAlarms(data)
            console.log(alarms);
            console.log(data);
            setSent(true);
        })

        const newAlarm = {
            subject,
            time: alarmTime,
            text,
            date: selectedDate,
            notified: false,
        }
        // console.log(newAlarm);
        const updatedAlarms = [...alarms, newAlarm];
        setAlarms(updatedAlarms)
        saveAlarms(updatedAlarms);
        setSubject('')
        setAlarmTime('')
        setText('')
        setSelectedDate('')
        setEmail('')
    }
    return (
        <div>
            <div className="flex h-screen bg-[#FFFFFF]">
                {/* <!-- sidebar --> */}
                <div className="md:flex flex-col w-64 bg-red-700">
                    <div className='flex gap-3 items-center p-2 bg-red-700'>
                        <img src={user ? user.photoURL : profile} alt="profile" className='w-8 h-8 rounded-full' />
                        <div className='flex flex-col bg-red-700'>
                            <p className='text-sm font-bold bg-red-700'>{user ? user.displayName : 'John Doe'}</p>
                            <p className='text-sm bg-red-700'>{user ? user.email : 'user@gmail.com'}</p>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 overflow-y-auto">

                        <nav className="flex-1 px-2 py-4 bg-red-700 text-[#1C1C1C] shadow-2xl drop-shadow-2xl">

                            <button
                                type='button'
                                onClick={handleLogout}
                                className="flex items-center px-4 py-2 hover:bg-gray-700 bg-red-700">
                                <FaSignOutAlt className='h-6 w-6 mr-2 bg-red-700' />
                                Logout
                            </button>

                        </nav>

                    </div>
                </div>

                {/* <!-- Main content --> */}
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <div className='px-10 py-10 sm:px-6 sm:py-6 sm:border-none border'>
                        <h2 className='text-xl font-medium mb-4'>List of Alarms Created by {user ? user.displayName : ''}</h2>
                        <ul>
                            {alarms.map((alarm, index) => (
                                <li
                                    key={index}
                                    className='text-slate-800 font-medium inline-flex w-full mb-3 items-center gap-10 py-2 px-3'>
                                    {alarm.time}
                                    <p>{alarm.subject}</p>
                                    <p>{alarm.text}</p>
                                    <button
                                        onClick={() => handleAlarmDelete(alarm.time)}
                                        className='bg-gray-400 text-slate-800 w-20 border rounded-md border-gray-800 text-base font-medium'>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="px-10 py-10 sm:px-6 sm:py-6 sm:border-none border">
                        <h1 className="text-xl font-bold mb-3">Create Alarm Schedule</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-8'>
                                <label
                                    htmlFor='alarm-text'
                                    className='text-base font-medium'>Alarm Title:
                                    <input
                                        type='text'
                                        name='alarmText'
                                        id='alarm-text'
                                        value={subject}
                                        className='border border-gray-500 ml-2 rounded-md w-80 outline-none px-2 py-0.5'
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </label>
                            </div>

                            <div
                                className='mb-8'>
                                <label
                                    htmlFor='alarm-time'
                                    className='text-base font-medium'>Alarm Time:
                                    <input
                                        type='time'
                                        name='alarmTime' id='alarm-time'
                                        value={alarmTime}
                                        onChange={(e) => setAlarmTime(e.target.value)}
                                        className='border border-gray-500 ml-2 rounded-md w-80 outline-none px-2 py-0.5' />
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        minDate={new Date()}
                                        placeholderText="Select a date"
                                    />
                                </label>
                            </div>

                            <div className='flex items-center mb-5'>
                                <label
                                    htmlFor='alarm-description'
                                    className='text-base font-medium'>Alarm description:</label>
                                <textarea
                                    id='alarm-description'
                                    rows={4}
                                    cols={70}
                                    name='alarmDescription'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className='border border-gray-500 ml-2 rounded-md outline-none px-2 py-2'
                                    placeholder='Enter your alarm description'></textarea>
                            </div>

                            <div
                                className='mb-8'>
                                <label>Enter your email</label>
                                <input
                                    type='email'
                                    value={email}
                                    className='border border-gray-500 ml-2 rounded-md w-80 outline-none px-2 py-0.5'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <button
                                type='submit'
                                onClick={handleSubmit}
                                className='cursor-pointer rounded-lg border py-2 px-1 w-36 mx-auto ml-48 bg-gray-700 text-white hover:bg-slate-950'>Add Alarm</button>
                        </form>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Try

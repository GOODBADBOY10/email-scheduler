import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import profile from '../assets/profile.png'
import { useAlarm } from '../context/alarmContext';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/authContext';
import { htmlToText } from 'html-to-text';

const Schedule = () => {
    const [alarmTime, setAlarmTime] = useState('')
    const [formatTime, setFormatTime] = useState('')
    const [formatDate, setFormatDate] = useState('')
    const [subject, setSubject] = useState('')
    const [selectedDate, setSelectedDate] = useState(null);
    const [email, setEmail] = useState([]);
    const [newEmail, setNewEmail] = useState('')
    const [text, setText] = useState('')
    const [category, setCategory] = useState('');
    const { user } = useAuth();

    const { addAlarm, alarms, setAlarms } = useAlarm();


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

    const handleTimeChange = (e) => {
        setAlarmTime(e.target.value)
        const timePorts = e.target.value.split(':')
        const hours = parseInt(timePorts[0])
        const minutes = timePorts[1];
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const formatHours = hours % 12 === 0 ? 12 : hours % 12;
        const formatTime = `${formatHours}:${minutes} ${ampm}`
        setFormatTime(formatTime);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date)
        const dateObject = new Date(date)
        const day = dateObject.getDate();
        const suffix = day === 1 || day === 11 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';
        const formatDate = `${dateObject.toLocaleString('en-us', {
            month: 'short'
        })} ${day} ${suffix} ${dateObject.getFullYear()}`;
        setFormatDate(formatDate)
    }

    const emailArray = Object.values(email)


    const handleEmail = (e) => {
        e.preventDefault();
        setEmail([...email, newEmail])
        setNewEmail('')
    };

    const handleRemoveEmail = (ema) => {
        setEmail(email.filter((em) => em !== ema))
    }

    const plaintext = htmlToText(text);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!subject || !alarmTime || !text || !selectedDate || !email || !category) {
            alert('Please fill in all fields')
            return;
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            email,
            text: plaintext,
            subject,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://email-seven-orcin.vercel.app/api/send-email-2", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        const newAlarm = {
            subject,
            time: formatTime,
            text: plaintext,
            date: formatDate,
            notified: false,
            category,
            email
        }
        console.log(newAlarm);
        addAlarm(newAlarm)

        const updatedAlarms = [...alarms, newAlarm];

        const saveAlarms = (updatedAlarms) => {
            localStorage.setItem('alarms', JSON.stringify(updatedAlarms))
        }


        addAlarm(newAlarm)
        addAlarm(saveAlarms);

        setAlarms(updatedAlarms)
        setSubject('')
        setAlarmTime('')
        setText('')
        setSelectedDate('')
        setEmail('')
        setNewEmail('')
        setCategory('')
    }

    return (
        <div className='w-full'>
            <div className="pl-4 pr-10">
                <div className='flex items-center my-7 justify-between'>
                    <div className="relative w-96">
                        <input
                            className="appearance-none border pl-10 border-gray-300 hover:border-gray-100 transition-colors rounded-md w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 outline-none"
                            id="username"
                            type="text"
                            placeholder="Search"
                        />
                        <div className="absolute left-0 inset-y-0 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className='profile'>
                        <img src={user ? user.photoURL : profile} alt="profile" className='w-8 h-8 rounded-full' />
                    </div>
                </div>

                {/* Create Alarm dasboard text */}
                <div className='px-3 flex py-2 flex-col gap-1.5 w-full h-20 bg-zinc-100 rounded-xl mb-5'>
                    <h3 className='text-2xl font-normal text-[#3C50D1]'>Create Your Schedule</h3>
                    <p className='text-[#7F7F7F] text-base'>Plan for days ahead without stress!!</p>
                </div>

                <div className='border px-3 rounded-xl py-3'>
                    <form onSubmit={handleSubmit}>
                        {/* Purpose of schedule */}
                        <div className='w-full px-2 border py-3 bg-[#F3F5F7] rounded-xl'>
                            <h4 className='text-lg font-semibold leading-5 text-black mb-3'>Purpose Of Schedule</h4>
                            <input
                                type='text'
                                value={subject}
                                name='alarmText'
                                id='alarm-text'
                                placeholder='Family Hangout'
                                onChange={(e) => setSubject(e.target.value)}
                                className='border-none w-full text-black outline-none rounded-md px-2.5 py-2 border-[#7F7F7F]'
                            />
                        </div>
                        {/* Time and date and category */}
                        <div className='flex items-center gap-5 mt-5'>
                            {/* time and date */}
                            <div className='w-full px-2 border py-3 bg-[#F3F5F7] rounded-xl flex items-center gap-5'>
                                <div className='w-full relative'>
                                    <h4 className='text-lg font-semibold leading-5 text-black mb-3'>Time</h4>
                                    <label>
                                        <input
                                            type='time'
                                            name='alarmTime'
                                            id='alarm-ime'
                                            value={alarmTime}
                                            onChange={handleTimeChange}
                                            placeholder='10:00am'
                                            className='border-none w-full text-black outline-none rounded-md px-2.5 py-2 border-[#7F7F7F]'
                                        />
                                        <span className='placeholder'>9:00 AM</span>
                                    </label>
                                </div>
                                <div className='w-full'>
                                    <h4 className='text-lg font-semibold leading-5 text-black mb-3'>Date</h4>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        minDate={new Date()}
                                        placeholderText="Select a date"
                                        className='border-none rounded-lg'
                                    />
                                </div>
                            </div>
                            {/* Category */}
                            <div className='w-full px-2 border py-3 bg-[#F3F5F7] rounded-xl flex-[40%]'>
                                <div>
                                    <h4 className='text-lg font-semibold leading-5 text-black mb-3'>Category</h4>
                                    <select
                                        onChange={(e) => setCategory(e.target.value)}
                                        className='w-full border-none rounded-lg py-1 px-1 text-black outline-none'>
                                        <option>Select Category</option>
                                        <option value='Celebration'>Celebration</option>
                                        <option value='Business'>Business</option>
                                        <option value='Fun'>Fun</option>
                                        <option value='Casual'>Casual</option>
                                        <option value='Team-hangout'>Team Hangout</option>
                                        <option value='Meeting'>Meeting</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        {/* Tag users */}
                        <div className='w-full px-2 border py-3 bg-[#F3F5F7] rounded-xl mt-5 relative'>
                            <h4 className='text-lg font-semibold leading-5 text-black mb-3'>Tag Users</h4>
                            <input
                                type='email'
                                value={newEmail}
                                name='email'
                                id='email'
                                placeholder='Enter the receipent email'
                                onChange={(e) => setNewEmail(e.target.value)}
                                className='border-none w-full text-black outline-none rounded-md px-2.5 py-2 border-[#7F7F7F]'
                            />
                            <FaPlus onClick={handleEmail} className='cursor-pointer absolute top-14 right-6' />
                        </div>
                        <div className='w-full px-3 border border-none py-3 bg-[#F3F5F7] rounded-lg flex mt-1 items-center gap-5'>
                            <ul className='grid grid-cols-3 gap-5'>
                                {
                                    emailArray.map((em, index) => (
                                        <li key={index} className='flex items-center gap-2'>{em} <FaTimes className='cursor-pointer' onClick={() => handleRemoveEmail(em)} /></li>
                                    ))
                                }
                            </ul>
                        </div>
                        {/* Description */}
                        <div className='w-full px-2 border py-3 bg-[#F3F5F7] rounded-xl mt-5'>
                            <h4 className='text-lg font-semibold leading-5 text-black mb-3'>Description</h4>
                            <ReactQuill
                                theme='snow'
                                placeholder='Write your post here...'
                                className='h-60 mb-12 border-none text-black text-base outline-none rounded-md border border-[#7F7F7F]'
                                value={text}
                                required
                                onChange={(text) => setText(text)}
                            />
                        </div>
                        <div className='flex items-center gap-10 mt-5'>
                            <button className='px-3 py-2 border none rounded-md text-black'>Cancel</button>
                            <button className='px-3 py-2 bg-[#3C50D1] border-none rounded-md text-white'>Create Schedule</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Schedule

import React, { useState, useEffect } from "react"
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { TiClipboard } from "react-icons/ti";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateRange } from 'react-date-range';
import Select from "react-timezone-select";
import { IoClose } from "react-icons/io5";
import { format } from "date-fns";
import { MdOutlineDateRange } from "react-icons/md";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Box } from '@mui/material';
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';
import DateTime from './DateTime';

import {
    FormControl,
    InputLabel,
    MenuItem,
    //   Select,
} from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const quickRanges = [
  "Last 5 minutes",
  "Last 15 minutes",
  "Last 30 minutes",
  "Last 1 hour",
  "Last 3 hours",
  "Last 6 hours",
  "Last 12 hours",
  "Last 24 hours",
  "Last 2 days",
  "Last 6 days",
  "Last 1 month",
  "Last 6 months",
  "Last 1 year",
  "Last 1.5 years",
  "Last 2 years",
  "Yesterday",
  "Day before yesterday"
]

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];



const tasks = [
    {
        taskName: "Complete project report",
        timeStamp: "2025-06-04T15:45:00"
    },
    {
        taskName: "Team meeting with client",
        timeStamp: "2025-06-12T10:30:00"
    },
    {
        taskName: "Doctor appointment",
        timeStamp: "2025-06-28T11:15:00"
    },
    {
        taskName: "Submit tax documents",
        timeStamp: "2025-06-09T16:00:00"
    },
    {
        taskName: "Buy groceries",
        timeStamp: "2025-06-21T13:30:00"
    },
    {
        taskName: "Workout session",
        timeStamp: "2025-06-01T10:00:00"
    },
    {
        taskName: "Online course lesson",
        timeStamp: "2025-06-19T18:00:00"
    },
    {
        taskName: "Weekly team sync",
        timeStamp: "2025-06-25T14:00:00"
    },
    {
        taskName: "Birthday party",
        timeStamp: "2025-06-16T17:30:00"
    },
    {
        taskName: "Code review",
        timeStamp: "2025-06-07T11:45:00"
    },
    {
        taskName: "Morning Standup Meeting",
        timeStamp: "2025-06-05T10:00:00"
    },
    {
        taskName: "Design Review Session",
        timeStamp: "2025-06-05T12:30:00"
    },
    {
        taskName: "Lunch with Project Manager",
        timeStamp: "2025-06-05T13:15:00"
    },
    {
        taskName: "Finalize Budget Report",
        timeStamp: "2025-06-05T15:45:00"
    },
    {
        taskName: "Evening Yoga Class",
        timeStamp: "2025-06-05T17:30:00"
    },
];

const recentTasks = [
    {
        taskName: "Task 1 - 1 min ago",
        timeStamp: new Date(Date.now() - 1 * 60 * 1000).toISOString()
    },
    {
        taskName: "Task 2 - 3 min ago",
        timeStamp: new Date(Date.now() - 3 * 60 * 1000).toISOString()
    },
    {
        taskName: "Task 3 - 6 min ago",
        timeStamp: new Date(Date.now() - 6 * 60 * 1000).toISOString()
    },
    {
        taskName: "Task 4 - 10 min ago",
        timeStamp: new Date(Date.now() - 10 * 60 * 1000).toISOString()
    },
    {
        taskName: "Task 5 - 30 min ago",
        timeStamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    {
        taskName: "Task 5 - 30 min ago",
        timeStamp: new Date(Date.now() - 60 * 60 * 1000).toISOString()
    },
    {
        taskName: "Task 5 - 30 min ago",
        timeStamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
        taskName: "Task 5 - 30 min ago",
        timeStamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },

];


const DURATION = [
  5 * 60 * 1000,                
  15 * 60 * 1000,                
  30 * 60 * 1000,                
  60 * 60 * 1000,                
  3 * 60 * 60 * 1000,            
  6 * 60 * 60 * 1000,            
  12 * 60 * 60 * 1000,           
  24 * 60 * 60 * 1000,           
  2 * 24 * 60 * 60 * 1000,       
  6 * 24 * 60 * 60 * 1000,       
  30 * 24 * 60 * 60 * 1000,      
  180 * 24 * 60 * 60 * 1000,     
  365 * 24 * 60 * 60 * 1000,     
  547.5 * 24 * 60 * 60 * 1000,   
  730 * 24 * 60 * 60 * 1000,     
  1 * 24 * 60 * 60 * 1000,       
  2 * 24 * 60 * 60 * 1000        

];


const TimeModal = () => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const [copiedDate, setCopiedDate] = useState({
        from: "",
        to: ""
    })

    const [timeZoneData, setTimeZoneData] = useState({
        timZoneToggle: true,
        timeZone: "",
        fiscalYear: ""
    })

    const [calenderOpen, setCalenderOpen] = useState(true)

    const [isMouseHover, setIsMouseHover] = useState(false);

    const [recentSearch, setRecentSearch] = useState([])

    const [quickRangesData, setquickRangesData] = useState([]);

    const [searchKey, setSearchKey] = useState("")

    const [openTimeSetting, setOpenTimeSetting] = useState(false)

    const [selectedTimezone, setSelectedTimezone] = useState(
        null
    );

    const [month, setMonth] = useState("");


    const handleFilter = (e) => {
        e.preventDefault()
        setRecentSearch((prev) => ([...prev, { from: startDate, to: endDate }]))
        let arr = tasks.filter((item) => (item.timeStamp >= startDate && item.timeStamp <= endDate
        ))
        console.log("The filterd data is here ", arr)
        setCalenderOpen(false)
    }

    const copyNow = async () => {

        try {
            if (startDate && endDate) {
                await navigator.clipboard.writeText(`${startDate} to ${endDate}`)
                setCopiedDate((prev) => ({ ...prev, from: startDate, to: endDate }))
                console.log("the copy data is here ", copiedDate)
                toast.success("Copied Successfully")

            } else {
                console.log("Plz select dates before copy")
                toast.error("Plz select dates before copy")
            }
        } catch (e) {
            console.log("Not Copy ", e)
            toast.error("Something went wrong!!!!!!!!!")
        }
    }

    const pastNow = async () => {
        if (copiedDate.from != "" && copiedDate.to != "") {
            setStartDate(copiedDate.from);
            setEndDate(copiedDate.to);
            console.log("the copy data is here ", copiedDate)
        } else {
            toast.error("copy Date first")
        }
    }

    const searchSpecifics = (duration) => {
        const now = Date.now(); // current time in ms
        const pastTime = now - DURATION[duration]; // past time in ms

        const fil = recentTasks.filter(task => {
            const taskTime = new Date(task.timeStamp).getTime(); // ensure it's number (ms)
            return taskTime >= pastTime;
        });

        console.log("Filtered recent tasks:", fil);
    };

    const [state, setState] = useState([
        {
            startDate: startDate || new Date(),
            endDate: endDate || new Date(),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        const result = quickRanges.filter((key) => key.toLowerCase().includes(searchKey.toLowerCase()))
        setquickRangesData(result)

        setTimeout(() => {
            setIsMouseHover(false);
        }, 2000);
    }, [state, searchKey])

    return (
        <div className='p-4 bg-black w-[100%] h-[100vh]' >
            <div className="wrapper float-right">
                <h1 onMouseEnter={() => { setIsMouseHover(true) }} onMouseLeave={() => { setIsMouseHover(false) }} className='text-2xl float-right p-2 py-3 w-fit font-semibold text-white '>

                    {(startDate && endDate) ? <> <span>{startDate} to </span> <span>{endDate}</span> </> : <span>Select Date</span>}


                </h1>


                {/* Modal Start  */}
                {
                    isMouseHover &&
                    <div onMouseEnter={() => { setIsMouseHover(true) }} onMouseLeave={() => { setIsMouseHover(false) }} className="transition-all -translate-y-2 duration-100 ease-linear modalWrapperflex m-4 flex-col justify-between w-[700px]  h-[550px] ">

                        <div className="modal p-2 relative px-4 h-[100%] w-[100%] bg-white rounded-t-md flex justify-between items-start">
                           
                            <div className="left w-[60%] h-[90%] space-y`-2 overflow-y-auto">

                                <h1 className='font-semibold text-md' > Absolute time range</h1>
                                <br />

                                <form onSubmit={handleFilter} className="relative z-20">

                                     {/* date range picker  */}
                                    <DateTime setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} />
                                        {/* Date Range picker ends  */}
                                    <div className="btns mt-4 flex justify-baseline gap-2 items-center">
                                        <button onClick={copyNow} className="copy  p-2 rounded-sm bg-gray-200"><FaRegCopy />
                                        </button>
                                        <button onClick={pastNow} className="past p-2 rounded-sm bg-gray-200"  > <TiClipboard />

                                        </button>
                                        <button className="submit p-2 px-4 bg-blue-500 text-white font-semibold rounded-sm">Apply time range</button>
                                    </div>
                                </form>

                                <br />

                                <div className="recentSearch mt-4 ">
                                    <h1 className='font-semibold text-md mb-2'>Recently used absolute ranges</h1>

                                    <div className="recent-history text-gray-500">
                                        {recentSearch.length > 0 ?
                                            recentSearch.map((item, index) => {
                                                return <p key={index} className='text-lg text-gray-600 font-semibold p-2 cursor-pointer'>{item.from} <span className='text-blue-500 font-semibold drop-shadow-md'>to</span> {item.to}</p>
                                            }) : <>not available</>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="right pl-1 border-l border-gray-200 w-[40%] h-[100%]">
                                <div className="searchBar w-[100%] relative">
                                    <input type="text" onChange={(e) => { setSearchKey(e.target.value) }} placeholder='search quick range' className='py-3 pl-7 bg absolute top-0 left-0 w-[100%] placeholder:text-[16px] font-semibold' />
                                    <span className='absolute top-[50%] translate-y-[50%] px-0.5 left-0'> <IoIosSearch fontSize={"1.5rem"} />
                                    </span>
                                </div>

                                <div className="quickRanges h-[90%] overflow-y-auto mt-12">
                                    {
                                        quickRangesData.map((item, index) => {
                                            return <p onClick={() => { searchSpecifics(index) }} key={index} className='text-md text-gray-600 font-semibold p-2 cursor-pointer'>{item}</p>
                                        })
                                    }
                                </div>
                            </div>




                        </div>
                        {/* Model Ends  */}

                        <div className="bottomNavbar flex flex-col">

                            <div className={`top  ${openTimeSetting ? "" : "rounded-b-md"}  min-h-8 w-[100%] p-2 bg-white border-t pt-1 border-gray-200 flex justify-between items-center`} >
                                <div className="left w-[60%] font-semibold" >Browser Time <span className='text-gray-400 mx-2'> {selectedTimezone ? selectedTimezone.abbrev : "IST"} </span> </div>
                                <div className="right w-[40%]">
                                    <button className="copy1 rounded-sm mr-2 bg-gray-200 shadow-sm font-medium text-sm px-1"  > {selectedTimezone ? selectedTimezone.label : "UTC+05:30"}
                                    </button>
                                    <button onClick={() => { setOpenTimeSetting(!openTimeSetting) }} className="submit px-1 text-sm bg-gray-200 border border-gray-300 font-medium rounded-sm">Change time settings</button>
                                </div>
                            </div>



                            {/* Time setting Change start  */}
                            {openTimeSetting && <div className={`bottom timeSetting min-h-12 bg-white p-2 ${!openTimeSetting ? "" : "rounded-b-md"}  `}>

                                {/* Options Buttons start  */}
                                <div className="options flex items-center gap-2 p-0.5 px-1 bg-white border border-gray-300 w-fit">
                                    <div onClick={() => { setTimeZoneData((prev) => ({ ...prev, timZoneToggle: true })) }} className={`timZone cursor-pointer font-semibold p-1.5 ${timeZoneData.timZoneToggle ? "bg-gray-200" : "bg-white"}`}>Time Zone</div>
                                    <div onClick={() => { setTimeZoneData((prev) => ({ ...prev, timZoneToggle: false })) }} className={`fiscalYear cursor-pointer font-semibold  p-1.5 ${!timeZoneData.timZoneToggle ? "bg-gray-200" : "bg-white"}`}>Fiscal Year</div>
                                </div>
                                {/* OPtions button ends  */}

                                {/* timzone dropDown start  */}
                                {timeZoneData.timZoneToggle && <div className="timezone mt-2">
                                    <Select
                                        value={selectedTimezone}
                                        onChange={setSelectedTimezone}
                                        labelStyle="abbrev" // shows e.g. UTC+05:30 (IST)
                                    />
                                </div>}
                                {/* timezone dropdown ends  */}

                                {/* Fiscal Year dropdown start  */}
                                {!timeZoneData.timZoneToggle && <div className="fiscalYear mt-2">
                                    <select name="fiscalYear" className="border p-2 border-gray-300 px-4" id="">
                                        {
                                            months.map((month) => (
                                                <option value={month}>{month}</option>
                                            ))
                                        }
                                    </select>
                                </div>}
                                {/* Fiscal year dropdown ends  */}
                            </div>}
                            {/* Time setting hcange ends  */}
                        </div>
                    </div>}

            </div>
        </div>
    )
}

export default TimeModal
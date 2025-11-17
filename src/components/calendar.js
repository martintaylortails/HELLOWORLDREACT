import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";







export default function Create() {


    const [form, setForm] = useState({
        name: "",
        position: "",
        level: ""
    })
    const navigate = useNavigate()
    const [date, setDate] = useState(new Date());
    const [records, setRecords] = useState([])
    const [events, setEvents] = useState([
        {
          title: 'Team Meeting',
          start: new Date(2025, 6, 29, 10, 0), // July 29, 2025 10:00 AM
          end: new Date(2025, 6, 30, 11, 0),
          apartment: 'test',
        },
      ]);

      useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_TEST}/record/`)

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`
                window.alert(message)
                return
            }

            const records = await response.json();

            let ev = [];
            let g;
            for(g = 0 ; g < records.length ; g++){
                let start = records[g].start;
                start = start.split('T')[0];
                let startYear = start.split('-')[0];
                let startMonth = (start.split('-')[1])-1;
                let startDay = start.split('-')[2];
                let end = records[g].end;
                end = end.split('T')[0];
                let endYear = end.split('-')[0];
                let endMonth = (end.split('-')[1])-1;
                let endDay = end.split('-')[2];
                ev.push({
                    title: records[g].name,
                    apartment:records[g].apartment,
                    start: new Date(startYear, startMonth, startDay, 0, 0), // July 29, 2025 10:00 AM
                    end: new Date(endYear, endMonth, endDay, 23, 0),
                  })
            }

            setRecords(records);
            setEvents(ev);
            console.log(records);


        }

        getRecords();

        return;
    }, []);


    const handleSelectSlot = ({ start, end }) => {
        const title = prompt('Enter event title:');
        const apartment = prompt('Enter apartmnet title:');
        if (title) {
          setEvents([...events, { start, end, title, apartment }]);
        }
      };
      const CustomEvent = ({ event }) => (
        <span>
          <strong>{event.title}</strong><br />
          <small>{event.apartment}</small>
        </span>
        
      );


const locales = {
    "en-US": require('date-fns/locale/en-US')
  }
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = event.apartment === "Loughrigg View" ? "darkolivegreen" : "blue";
    if (isSelected) {
      backgroundColor = "#ff5722"; // Highlight selected event
    }
  
    const style = {
      backgroundColor,
      borderRadius: '10px',
      color: '#f1f1f1',
      border: 'none',
      display: 'block',
      fontSize:'20px',
      height:'60px',
      lineHeight:'25px',
    };
  
    return {
      style,
    };
  };

    


        
       // navigate("/")

    return (
        <div>
            <h3>Calendar</h3>
            <div>Text tetxt</div>
            <div>The calendar</div>
            <div>blahh</div>
            <div className="App">
                <Calendar 
                    localizer={localizer} 
                    events={events} 
                    startAccessor="start" 
                    endAccessor="end" 
                    onSelectSlot={handleSelectSlot}
                    components={{
                        event: CustomEvent
                      }}
                    eventPropGetter={eventStyleGetter}
                    style={{height: 1000, margin: "50px"}} 
                />
            </div>
        </div>
    )
}
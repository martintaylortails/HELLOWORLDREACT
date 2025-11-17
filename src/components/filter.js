import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Record = (props) => {
    var star = props.record.start;
    if(star !== "" && star !== null && star !== undefined){
        star = star.split('T')[0];
        star = star.split('-');
        star = star[2] + "-" + star[1] + "-" + star[0];
    }else{
        star = 'chuck'
    }
    var endd = props.record.end;
    if(endd !== "" && endd !== null && endd !== undefined){
         endd = endd.split('T')[0];
         endd = endd.split('-');
         endd = endd[2] + "-" + endd[1] + "-" + endd[0];
    }else{
        endd = 'chuck';
    }
    return (
        <tr>
            <td>{props.record.apartment}</td>
            <td>{props.record.name}</td>
            <td>{star}</td>
            <td>{endd}</td>
            <td>{props.record.nights}</td>
            <td>{props.record.gross}</td>
            <td>{props.record.commission}</td>
            <td>{props.record.vat}</td>
            <td>{props.record.net}</td>
            <td>
                <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
                <button
                    className="btn btn-link"
                    onClick={() => {
                        props.deleteRecord(props.record._id)
                    }}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default function Filter() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: ""
    })
    const navigate = useNavigate()
    const [date, setDate] = useState(new Date());
    const [records, setRecords] = useState([]);
    const [foo, setFoo] = useState([]);
    const [total, setTotal] = useState({});

    useEffect(() => {
        async function getRecords() {
            const filterObj = {
                            apartment:"Kelsick Heights",
            }
            console.log(filterObj)
            const response = await fetch(`${process.env.REACT_APP_TEST}/filter/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filterObj)
        });

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`
                window.alert(message)
                return
            }

            const records = await response.json()




            console.log('test',records)

            let tos = records.reduce(function(a,b){return +a + +b.gross;},0);
            let nights = records.reduce(function(a,b){return +a + +b.nights;},0);
            let coms = records.reduce(function(a,b){return +a + +b.commission;},0);
            let vat = records.reduce(function(a,b){return +a + +b.vat;},0);
            let net = records.reduce(function(a,b){return +a + +b.net;},0);

            let obj = {
                            Total:tos
                        ,   Nights:nights
                        ,   Commission:coms
                        ,   VAT:vat
                        ,   Net:net
            }



            setTotal(obj);
            setRecords(records)
            setFoo('blah');
        }

        getRecords()

        return
    }, [records.length])

    


        
        //navigate("/")

        async function deleteRecord(id) {
            const result = window.confirm("Will this employee be removed from the list?")
            if (!result) {
                return
            }
    
            await fetch(`${process.env.REACT_APP_YOUR_HOSTNAME}/${id}`, {
                method: "DELETE"
            })
    
            const newRecords = records.filter((record) => record._id !== id)
            setRecords(newRecords)
        }

        function recordList() {
            return records.map((record) => {
                return (
                    <Record
                        key={record._id}
                        record={record}
                        deleteRecord={() => deleteRecord(record._id)}
                    />
                )
            })
        }

        return (
            <div>
                <h3 className="ps-2">Bookings</h3>
                <ul>
                    <li>{total.Nights}</li>
                    <li>{total.Total}</li>
                    <li>{total.Commission}</li>
                    <li>{total.VAT}</li>
                    <li>{total.Net}</li>
                </ul>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Apartment</th>
                            <th>Name</th>
                            <th>Date Start</th>
                            <th>Date End</th>
                            <th>Nights</th>
                            <th>Gross</th>
                            <th>Commission</th>
                            <th>VAT</th>
                            <th>Net</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>{recordList()}</tbody>
                </table>
            </div>
        )
    }
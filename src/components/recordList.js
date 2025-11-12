import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

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
                <Link className="btn btn-link" to={`/record/${props.record._id}`}>Edit</Link> |
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

const Clean = (props) => {
    return (
            <div>{props.clean.Towels.Amount}</div>
    )

}

export default function RecordList() {
    const [records, setRecords] = useState([])
    const [cleaning, setCleaning] = useState([])

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`${process.env.REACT_APP_TEST}/api/record`)

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`
                window.alert(message)
                return
            }

            const records = await response.json();
            console.log('records',records)
            setRecords(records)
        }

        async function getCleaning() {
            const response = await fetch(`${process.env.REACT_APP_TEST}/api/cleaning`)

            if (!response.ok) {
                const message = `An error occurredddd: ${response.statusText}`
                window.alert(message)
                return
            }

            const cleaning = await response.json()
            setCleaning(cleaning)
        }

        getRecords()
        getCleaning()

        return
    }, [records.length,cleaning.length])

    async function deleteRecord(id) {
        const result = window.confirm("Will this employee be removed from the list?")
        if (!result) {
            return
        }

        await fetch(`${process.env.REACT_APP_YOUR_HOSTNAME}/api/record/${id}`, {
            method: "DELETE"
        })

        const newRecords = records.filter((record) => record._id !== id)
        setRecords(newRecords)
    }

    async function deleteClean(id) {
        const result = window.confirm("Will this employee be removed from the list?")
        if (!result) {
            return
        }

        await fetch(`${process.env.REACT_APP_YOUR_HOSTNAME}/api/record/${id}`, {
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

    function cleaningList(){
        return cleaning.map((cleaning) => {
            return (
                <Clean
                    key={cleaning._id}
                    clean={cleaning}
                    deleteClean={() => deleteClean(cleaning._id)}
                />
            )
        })
    }

    return (
        <div>
            <div>{cleaningList()}</div>
            <h3 className="ps-2">Bookings</h3>
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
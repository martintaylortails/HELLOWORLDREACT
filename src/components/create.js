import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: ""
    })
    const navigate = useNavigate()
    const [date, setDate] = useState(new Date());

    console.log(date)

    function updateForm(value) {
        console.log('setform');
        setForm((prev) => {
            return { ...prev, ...value }
        })
    }

    async function onSubmit(e) {
        console.log('onsubmit');
        e.preventDefault()

        const newPerson = { ...form }
        
        const response = await fetch(`${process.env.REACT_APP_TEST}/record/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPerson)
        })

        console.log('response',response)

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`
            window.alert(message)
            return
        }
            

        setDate(

        )

        setForm({ 
                    name: ""
                ,   start: ""
                ,   end: "" 
                ,   nights: ""
                ,   gross:""
                ,   commission:""
            })
        navigate("/")
    }

    return (
        <div>
            <h3>Create New Record</h3>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                    <label htmlFor="name">Apartment</label>
                    <select
                        type="text"
                        className="form-control"
                        id="apartment"
                        value={form.apartment}
                        onChange={(e) => updateForm({ apartment: e.target.value})}
                    >
                    <option value="choose">Choose Apartment</option>
                    <option value="Loughrigg View">Loughrigg View</option>
                    <option value="Kelsick Heights">Kelsick heights</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                        type="text"
                        className="form-control"
                        id="type"
                        value={form.type}
                        onChange={(e) => updateForm({ type: e.target.value})}
                    >
                    <option value="choose">Booking type</option>
                    <option value="Booking">Booking</option>
                    <option value="Personal">Personal</option>
                    <option value="Friends and Family">Friends and Family</option>
                    <option value="Maintenance">Maintenanc</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Booking Reference</label>
                    <input
                        type="text"
                        className="form-control"
                        id="reference"
                        value={form.reference}
                        onChange={(e) => updateForm({ reference: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="start">Start date</label>
                    <DatePicker 
                        id="start"
                        selected={form.start} 
                        onChange={(date) => setDate(date)} 
                        //onChange={(date) => updateForm({ start: date })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="end">End date</label>
                    <input
                        type="text"
                        className="form-control"
                        id="end"
                        value={form.end}
                        onChange={(e) => updateForm({ end: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nights">Nights</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nights"
                        value={form.nights}
                        onChange={(e) => updateForm({ nights: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gross">Gross</label>
                    <input
                        type="text"
                        className="form-control"
                        id="gross"
                        value={form.gross}
                        onChange={(e) => updateForm({ gross: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="commssion">Commission</label>
                    <input
                        type="text"
                        className="form-control"
                        id="commission"
                        value={form.commission}
                        onChange={(e) => updateForm({ commission: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="vat">VAT</label>
                    <input
                        type="text"
                        className="form-control"
                        id="vat"
                        value={form.vat}
                        onChange={(e) => updateForm({ vat: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gross">Net</label>
                    <input
                        type="text"
                        className="form-control"
                        id="net"
                        value={form.net}
                        onChange={(e) => updateForm(
                                    { 
                                        net: e.target.value
                                    ,   gross: e.target.value / 0.76
                                    ,   commission:((e.target.value / 0.76)*0.2).toFixed(2)
                                    ,   vat:(((e.target.value / 0.76)*0.2)*.2).toFixed(2)
                                     }
                                )}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="net">Cleaning</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cleaning"
                        value={form.cleaning}
                        onChange={(e) => updateForm({ cleaning: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionIntern"
                            value="Intern"
                            checked={form.level === "Intern"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionJunior"
                            value="Junior"
                            checked={form.level === "Junior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionSenior"
                            value="Senior"
                            checked={form.level === "Senior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
}
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker";
import './datepicker.css';

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        start: "",
        end: ""
    })
    const [cleaning, setCleaning] = useState([{
        Cleaning:{Amount:0,Vat:""},
        Linen:{Amount:0,Vat:""},
        Towels:{Amount:0,Vat:""},
        CleaningPack:{Amount:0,Vat:""},
    }])

    const params = useParams()
    const navigate = useNavigate()

    const [date, setDate] = useState();

    const [endDate, setEndDate] = useState(form.endDate);

    
    const handleDateChange = (date) => {
        if (date) {
          // Set time to noon to prevent timezone shift (e.g., from UTC to BST)
          date.setHours(12, 0, 0, 0);
          //setSelectedDate(date);
        } else {
          //setSelectedDate(null);
        }
      };
      

    const Clean = (props) => {
        return (
            props.clean.Linen.Amount       
        )
    
    }

    useEffect(() => {

        async function fetchData() {

            const id = params.id
            const response = await fetch(`${process.env.REACT_APP_TEST}/record/${id}`)
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`
                window.alert(message)
                return
            }

            const record = await response.json()
            if (!record) {
                window.alert(`Record with id ${id} not found`)
                navigate("/")
                return
            }


            setForm(record)

            const cleanresponse = await fetch(`${process.env.REACT_APP_TEST}/cleaning/`)

            if (!cleanresponse.ok) {
                const cleanmessage = `An error occurredddd: ${cleanresponse.statusText}`
                window.alert(cleanmessage)
                return
            }

            const cleaning = await cleanresponse.json();

            setCleaning(cleaning);

            record.clean = cleaning[0].Clean;
            record.cleaningPack = cleaning[0].CleaningPack;

            setForm(record);
        }

        async function getCleaning() {
            const response = await fetch(`${process.env.REACT_APP_TEST}/cleaning/`)

            if (!response.ok) {
                const message = `An error occurredddd: ${response.statusText}`
                window.alert(message)
                return
            }

            const cleaning = await response.json();

            setCleaning(cleaning);

            
        }

        fetchData();

        //getCleaning();

        return
    }, [params.id, navigate])

    function updateForm(value) {
        setForm((prev) => {
            return { ...prev, ...value }
        })
    }

   function cleaningList(){
        return cleaning.map((cleaning) => {
            return (
                <Clean
                    //key={cleaning._id}
                    clean={cleaning}
                    //deleteClean={() => deleteClean(cleaning._id)}
                />
            )
        })
    }
        

        

    async function onSubmit(e) {
        e.preventDefault()

        const editedPerson = { ...form }
        const response = await fetch(`${process.env.REACT_APP_TEST}/update/${params.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedPerson)
        })

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`
            window.alert(message)
            return
        }

        navigate("/")
    }

    console.log(form);
    console.log(cleaning);

    const cleanTotal =  +cleaning[0].Cleaning.Amount + 
                        +cleaning[0].Linen.Amount +
                        +cleaning[0].Towels.Amount +
                        +cleaning[0].CleaningPack.Amount;

    const cleaningVat = ((+cleaning[0].Linen.Amount +
                        +cleaning[0].Towels.Amount +
                        +cleaning[0].CleaningPack.Amount)*0.2).toFixed(2);

    const bottom_line = +form.net - +(+cleanTotal + +cleaningVat)
    const per_day = +(bottom_line/+form.nights).toFixed(2);

    return (
        <div className='mid-content'>
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className='sectionContainer'>
                    <div className="subTitleContainer">
                        <div className='subTitle'>Booking Information</div>
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="apartment">Apartment</label>
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
                    <div className="form-group form-cont">
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
                        <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="name">Booking Reference</label>
                        <input
                            type="text"
                            className="form-control"
                            id="reference"
                            value={form.reference}
                            onChange={(e) => updateForm({ reference: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="start">Start Date</label>
                        <DatePicker 
                            id="start"
                            format = 'dd-mm-yyyy'
                            selected={form.start} 
                            onSelect={(date) => setDate(date)} 
                            onChange={(date) => updateForm({ start: date })}
                        />
                    </div>
                    
                    
                    
                    <div className="form-group form-cont">
                        <label htmlFor="start">End Date</label>
                        <DatePicker 
                            id="end"
                            format = 'dd-mm-yyyy'
                            selected={form.end} 
                            //onSelect={(endDate) => setEndDate(endDate)} 
                            onChange={(endDate) => handleDateChange({ end: endDate })}
                        
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="nights">Nights</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nights"
                            value={form.nights}
                            onChange={(e) => updateForm({ nights: e.target.value })}
                        />
                    </div>
                </div>    
                <div className='sectionContainer'>
                    <div className="subTitleContainer">
                        <div className='subTitle'>Guest details</div>
                    </div>  
                    <div className="form-group form-cont">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={form.name}
                            onChange={(e) => updateForm({ name: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="name">Telephone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="telephone"
                            value={form.telephone}
                            onChange={(e) => updateForm({ telephone: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="name">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={form.email}
                            onChange={(e) => updateForm({ email: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="name">Post Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="postCode"
                            value={form.postCode}
                            onChange={(e) => updateForm({ postCode: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="type">Adults</label>
                        <select
                            type="text"
                            className="form-control"
                            id="adults"
                            value={form.adults}
                            onChange={(e) => updateForm({ adults: e.target.value})}
                        >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        </select>
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="type">Children</label>
                        <select
                            type="text"
                            className="form-control"
                            id="children"
                            value={form.children}
                            onChange={(e) => updateForm({ children: e.target.value})}
                        >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        </select>
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="type">Teenagers</label>
                        <select
                            type="text"
                            className="form-control"
                            id="teenagers"
                            value={form.teenagers}
                            onChange={(e) => updateForm({ teenagers: e.target.value})}
                        >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        </select>
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="type">Infants</label>
                        <select
                            type="text"
                            className="form-control"
                            id="infants"
                            value={form.infants}
                            onChange={(e) => updateForm({ infants: e.target.value})}
                        >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        </select>
                    </div>
                </div>
                <div className='sectionContainer'>
                    <div className="subTitleContainer">
                        <div className='subTitle'>Payment Details</div>
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="gross">Gross</label>
                        <span className="pound">£</span>
                        <input
                            type="text"
                            className="form-control"
                            id="gross"
                            value={form.gross}
                            onChange={(e) => updateForm({ gross: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="gross">Commission</label>
                        <span className="pound">£</span>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="commission"
                            value={form.commission}
                            onChange={(e) => updateForm({ commission: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="vat">Vat</label>
                        <span className="pound">£</span>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="vat"
                            value={form.vat}
                            onChange={(e) => updateForm({ vat: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="gross">Net</label>
                        <span className="pound">£</span>
                        <input
                            
                            type="text"
                            className="form-control"
                            id="net"
                            value={form.net}
                            onChange={(e) => updateForm(
                                        { 
                                            net: e.target.value
                                        ,   gross: (e.target.value / 0.76).toFixed(2)
                                        ,   commission:((e.target.value / 0.76)*0.2).toFixed(2)
                                        ,   vat:(((e.target.value / 0.76)*0.2)*.2).toFixed(2)
                                        ,   linen: 20
                                        }
                                    )}
                        />
                    </div>
                </div>
                <div className='sectionContainer'>
                    <div className="subTitleContainer">
                        <div className='subTitle'>Cleaning Charges</div>
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="gross">Cleaning</label>
                        <span className="pound">£</span>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="cleaning"
                            value={cleaning[0]?.Cleaning.Amount}
                            onChange={(e) => updateForm({ cleaning: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="gross">Towels</label>
                        <span className="pound">£</span>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="towels"
                            value={cleaning[0]?.Towels.Amount}
                            onChange={(e) => updateForm({ towels: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="gross">Linen</label>
                        <span className="pound">£</span>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="linen"
                            value={cleaning[0]?.Linen.Amount}
                            onChange={(e) => updateForm({ linen: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="gross">Cleaning Pack</label>
                        <span className="pound">£</span>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="cleaningPack"
                            //value={cleaning[0]?.CleaningPack.Amount}
                            value={form.cleaningPack?.Amount}
                            onChange={(e) => updateForm({ cleaningPack: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="gross">Services Total</label>
                        <span className="pound">£</span>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="servicesTotal"
                            value={cleanTotal}
                            onChange={(e) => updateForm({ servicesTotal: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="gross">Services VAT</label>
                        <span className="pound">£</span>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="servicesVAT"
                            value={cleaningVat}
                            onChange={(e) => updateForm({ servicesVAT: e.target.value })}
                        />
                    </div>
                </div>
                <div className='sectionContainer'>
                    <div className="subTitleContainer">
                        <div className='subTitle'>Bottom Line</div>
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="gross">Bottom Line</label>
                        <span className="pound">£</span>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="bottomLine"
                            value={bottom_line}
                            onChange={(e) => updateForm({ bottomLine: e.target.value })}
                        />
                    </div>
                    <div className="form-group form-cont">
                        <label htmlFor="gross">Per Day</label>
                        <span className="pound">£</span>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            id="perDay"
                            value={per_day}
                            onChange={(e) => updateForm({ perDay: e.target.value })}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                        onClick={(e) => updateForm({ linen: 10 })}
                    />
                </div>
            </form>
        </div>
    )
}
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Create() {
    const [clean, setClean] = useState([])
    const navigate = useNavigate()


    useEffect(() => {

        async function getCleaning() {
            const response = await fetch(`${process.env.REACT_APP_TEST}/cleaning/`)

            if (!response.ok) {
                const message = `An error occurredddd: ${response.statusText}`
                window.alert(message)
                return
            }

            const cleaning = await response.json();
            console.log('cleaning',cleaning[0]);
            setClean({
                        cleaning:cleaning[0].Cleaning.Amount,
                        linen:cleaning[0].Linen.Amount,
                        cleaningPack:cleaning[0].CleaningPack.Amount,
                        towels:cleaning[0].Towels.Amount,
            })
            
        }


        getCleaning()

        return

    },[]);

    
    function updateForm(value) {
        setClean((prev) => {
            return { ...prev, ...value }
        })
    }

    async function onSubmit(e) {
        e.preventDefault()

        const editedCleaning = { ...clean }
        console.log(editedCleaning);
        const response = await fetch(`${process.env.REACT_APP_TEST}/update/cleaning`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedCleaning)
        })

        if (!response.ok) {
            //const message = 'An error occurredy: ${response.statusText}'
            window.alert(message)
            return
        }

        navigate("/")
    }

        

    return (
        <div>
            <form onSubmit={onSubmit}>
            <h3>Cleaning Costs</h3>
            <div className="form-group form-cont">
                <label htmlFor="cleaning">Cleaning</label>
                <input
                    className="cleaning"
                    name="cleaning"
                    value={clean.cleaning}
                    onChange={(e) => updateForm({ cleaning: e.target.value})}
                />
            </div>
            <div className="form-group form-cont">
            <label htmlFor="cleaning">Linen</label>
                <input
                    className="linen"
                    name="linen"
                    value={clean.linen}
                    onChange={(e) => updateForm({ linen: e.target.value})}
                />
            </div>
            <div className="form-group form-cont">
            <label htmlFor="cleaning">Cleaning Pack</label>
                <input
                    className="cleaningPack"
                    name="linen"
                    value={clean.cleaningPack}
                    onChange={(e) => updateForm({ cleaningPack: e.target.value})}
                />
            </div>
            <div className="form-group form-cont">
            <label htmlFor="cleaning">Towels</label>
                <input
                    className="towels"
                    name="towels"
                    value={clean.towels}
                    onChange={(e) => updateForm({ towels: e.target.value})}
                />
            </div>
            <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                    />
            </div>
            </form>
        </div>
        
    )
}
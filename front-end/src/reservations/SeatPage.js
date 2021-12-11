import React, { useEffect, useState } from "react";
import { updateSeats, listTables } from "../utils/api";
import { useHistory, useParams} from "react-router-dom"

function SeatPage(){
    const [tables, setTables] = useState([]);
    const [tableId, setTableId] = useState();
    const [errors, setErrors] = useState(null);
    const history = useHistory();
    const {reservation_id} = useParams();
    console.log(reservation_id)
    useEffect(loadTables, []);

    function loadTables(){
        const abortController = new AbortController();
        setErrors(null);
          listTables(abortController.signal)
          .then((tables)=> {
              console.log(tables[0].table_id)
              setTableId(tables[0].table_id)
              return setTables(tables) 
            })
          .then(setErrors)
          return () => abortController.abort();
      }

    async function handleSubmit(event){
        const abortController = new AbortController();
        event.preventDefault();
        try{
            await updateSeats({ "reservation_id": Number(reservation_id)}, Number(tableId))
            history.push("/dashboard")
        } catch(error){
            console.log(error)
            setErrors(error.message);
            return;
        }
        return () => abortController.abort();
    }

    function handleCancel(event){
        history.goBack();
    }

    function handleChange(event){
        setTableId(event.target.value);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <select name="table_id" onChange={handleChange}>
                    {tables.map((t) => (
                        <option key={t.table_id} value={t.table_id}>{t.table_name} - {t.capacity}</option>
                    ))}
                </select>
                <button type="submit" className="btn btn-primary mb-2" >Submit</button>
                <button type="cancel" className="btn btn-danger mb-2"onClick={handleCancel}>Cancel</button>
            </div>
        </form>
      );
    }



export default SeatPage;
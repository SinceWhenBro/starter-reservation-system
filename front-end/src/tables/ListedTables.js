import React from "react";
import { finishTable } from "../utils/api"
import { useHistory} from "react-router-dom"

function ListedTables({ table, setTables, setReservations, date }){
    const history = useHistory();

    async function finishHandler(event){
      
      if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
        //todo make api call for DELETE
        await finishTable(table.table_id)
        history.go(0);
      }
      
    }

    return (
        <div className=" border col-5 tableCard justify-content-center" data-table-id-status={table.table_id}>
          <p className="col text-center my-1">Table: {table.table_name}</p>
          <p className="col text-center my-1">This table can seat: {table.capacity}</p>
          
          <div data-table-id-status={table.table_id} className="d-flex justify-content-center">
              {table.reservation_id ? "occupied" : "free"}
          </div>
          {table.reservation_id && (
            <div className="d-flex justify-content-center">
            <button
            className="btn btn-primary mb-2"
              data-table-id-finish={table.table_id}
              type="button"
              onClick={finishHandler}
            >
              {" "}
              Finish
            </button>
            </div>
          )}
        </div>
      );
    }



export default ListedTables;
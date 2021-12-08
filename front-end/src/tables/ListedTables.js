import React from "react";

function ListedTables({ table, setTables, setReservations, date }){
    
    
    return (
        <div className=" border col-5 tableCard justify-content-center" data-table-id-status={table.table_id}>
          <p className="col text-center my-1">Table: {table.table_name}</p>
          <p className="col text-center my-1">This table can seat: {table.capacity}</p>
          
          {table.reservation_id && (
            <div className="d-flex justify-content-center">
            <button
            className="btn btn-primary mb-2"
              data-table-id-finish={table.table_id}
              type="button"
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
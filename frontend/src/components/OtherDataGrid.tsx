import React from "react";
import {
  DataGrid,
  getGridBooleanOperators,
  GridApi,
  GridColumns,
} from "@mui/x-data-grid";
import { updateProduct } from "../productsApiClient";
import { Button, IconButton, Snackbar } from "@mui/material";

function createOrderColumns(): GridColumns {
  return [
    {
      field: "name",
      headerName: "Product Name",
      width: 400,
    },
    {
      field: "quantity",
      headerName: "On Hand QTY",
      type: "number",
      width: 200,
    },
    {
      field: "ordering",
      headerName: "Order QTY",
      type: "number",
      width: 200,
      editable: true,
    },
    {
      field: "remaining",
      headerName: "Remaining QTY",
      type: "number",
      width: 100,
    },
  ];
}

const OtherDataGrid = ({ tableData, updateData }: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: any) => {
    updateData(tableData);
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button onClick={(e) => handleClose(e)}>Submit</Button>
    </React.Fragment>
  );

  const editCommit = (params: any) => {
    if (params.field == "ordering") {
      const productBeingOrdered = tableData.find((rowEntry: any) => {
        return rowEntry.id == params.id;
      });
      if (params.value > 0 && params.value <= productBeingOrdered.quantity) {
        productBeingOrdered.ordering = params.value;
        updateProduct(params.id, {
          quantity: productBeingOrdered.quantity - params.value,
        });
        productBeingOrdered.remaining =
          productBeingOrdered.quantity - params.value;
      }
    }
  };

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        columns={createOrderColumns()}
        rows={tableData}
        onCellEditCommit={(params) => editCommit(params)}
      />
    </div>
  );
};

export default OtherDataGrid;

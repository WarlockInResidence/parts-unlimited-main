import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { updateQuantity } from "../productsApiClient";

/*

todo add const for table column definitions
 */
const columns = [
  {
    field: "name",
    headerName: "Product Name",
    width: 500,
  },
  {
    field: "model",
    headerName: "Model Number",
    width: 300,
    // editable: true,
  },
  {
    field: "quantity",
    headerName: "QTY",
    width: 200,
    editable: true,
  },
  {
    field: "color",
    headerName: "color",
    width: 200,
  },
];

const MyDataGrid = ({ tableData, updateData }: any) => {
  //pulling table data as a prop instead of using useState and useEffect
  //update data is a useState setter

  const editCommit = (params: any) => {
    console.log(params);
    if (params.field == "quantity") {
      updateQuantity(params.id, { quantity: params.value });
    }
    // allow model field to be editied
    if (params.field == "model") {
      updateQuantity(params.id, { model: params.value });
    }

    if (params.field == "color") {
      updateQuantity(params.id, { color: params.value });
    }
    // updateQuantity(params.id, params);
    // todo do you also need to setstate with new value? using updateData
    // handleQuantityUpdate(+params.id, params.value ? +params.value : 0);
  };

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={tableData}
        onCellEditCommit={(params) => editCommit(params)}
      />
    </div>
  );
};

export default MyDataGrid;

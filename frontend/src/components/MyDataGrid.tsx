import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { updateProduct } from "../productsApiClient";

/*

todo add const for table column definitions
 */
const columns = [
  {
    field: "name",
    headerName: "Product Name",
    width: 400,
  },
  {
    field: "quantity",
    headerName: "QTY",
    width: 200,
    editable: true,
  },
];

const MyDataGrid = ({ tableData, updateData }: any) => {
  //pulling table data as a prop instead of using useState and useEffect
  //update data is a useState setter

  const editCommit = (params: any) => {
    console.log(params);
    if (params.field == "quantity") {
      updateProduct(params.id, { quantity: params.value });
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

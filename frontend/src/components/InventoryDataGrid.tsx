import React from "react";
import {
  DataGrid,
  getGridBooleanOperators,
  GridApi,
  GridColumns,
} from "@mui/x-data-grid";
import { updateProduct } from "../productsApiClient";
import { Box, Button, Checkbox } from "@mui/material";

export type Mode = "ordering" | "editing" | "default";

function createProductColumns(
  mode: Mode,
  handleCheckboxProp: (event: any, checked: boolean) => void
): GridColumns {
  return [
    {
      field: "",
      headerName: "Order",
      width: 100,
      hide: mode !== "ordering",
      hideSortIcons: true,
      renderCell: (e) => {
        return (
          <Box sx={{ margin: "auto" }}>
            <Checkbox
              onChange={(_, checked) => handleCheckboxProp(e, checked)}
              data-testid="ordering-checkbox"
            />
          </Box>
        );
      },
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: "Product Name",
      width: 400,
    },
    {
      field: "quantity",
      headerName: "QTY",
      type: "number",
      width: 200,
      editable: true,
    },
  ];
}

const InventoryDataGrid = ({ tableData, mode, handleCheckboxProp }: any) => {
  //pulling table data as a prop instead of using useState and useEffect
  //update data is a useState setter

  const editQuantity = (params: any) => {
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
        columns={createProductColumns(mode, handleCheckboxProp)}
        rows={tableData}
        onCellEditCommit={(params) => editQuantity(params)}
      />
    </div>
  );
};

export default InventoryDataGrid;

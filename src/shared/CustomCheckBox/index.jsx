import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

function CustomCheckBox({
  checked,
  handleChange,
  checkBoxClasses,
  label,
  labelClasses,
  size,
}) {
  return (
    <FormGroup className="!inline-block !m-0">
      <FormControlLabel
        className=""
        control={
          <Checkbox
            size={size}
            checked={checked}
            onChange={handleChange}
            className={checkBoxClasses}
            sx={{
              color: "1px solid #E0E0E0",
              "&.Mui-checked": {
                color: "#045CA8",
              },
            }}
          />
        }
        label={<p className={labelClasses}>{label}</p>}
      />
    </FormGroup>
  );
}

export default CustomCheckBox;

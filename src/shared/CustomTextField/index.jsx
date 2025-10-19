import { memo } from "react";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment, useMediaQuery } from "@mui/material";
import classNames from "classnames";
import { MdClose } from "react-icons/md";

function CustomTextField({
  className,
  inputClassName,
  onChange,
  value,
  showClear,
  name,
  touched,
  maxWords,
  error,
  handleBlur,
  requiredStar,
  disabledField,
  maxLength,
  placeholder,
  labelToShow,
  placeholderClasses,
  fieldWidth,
  icon,
  iconEnd,
  showClearInside = false,
  type,
  multiline,
  rows,
  regex,
  textTransform,
  autoComplete,
  isSearchField,
  textClassOverride
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className={`flex flex-col ${fieldWidth}`}>
      {showClear && (
        <div className="flex flex-row-reverse">
          <p className={classNames("text-xs font-medium pb-1", textClassOverride)}>
            {maxWords} {isMobile ? "chars" : "characters"} |{" "}
            <span
              onClick={() => onChange({ target: { name, value: "" } })}
              onKeyDown={() => onChange({ target: { name, value: "" } })}
              role="presentation"
              className="underline cursor-pointer text-[#388DCA] font-poppins"
            >
              Clear
            </span>
          </p>
        </div>
      )}
      <div className={`${className} bg-transparent`}>
        <TextField
          fullWidth
          rows={rows}
          multiline={multiline}
          disabled={disabledField}
          label={
            labelToShow ? (
              <>
                <span className="!mt-1 !font-poppins !text-cello !font-medium">{labelToShow}</span>
                {requiredStar && <span className="text-bitterSweet">*</span>}
              </>
            ) : undefined
          }
          id={
            requiredStar
              ? "outlined-required"
              : error && touched
                ? "outline-error"
                : disabledField
                  ? "outline-disabled"
                  : ""
          }
          error={!!(error && touched)}
          variant="outlined"
          placeholder={placeholder}
          onBlur={handleBlur}
          type={type}
          InputProps={{
            startAdornment: icon && (
              <InputAdornment position="start" className="!mt-0">
                <IconButton className="!text-xs !px-0 !py-0">{icon}</IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <div className="flex items-center gap-1 pr-2 min-w-[30px] justify-center">
                {(showClearInside || iconEnd) &&
                  (iconEnd ? (
                    <InputAdornment position="start" className="!mt-0">
                      <IconButton className="!text-sm !px-0 !py-0">{iconEnd}</IconButton>
                    </InputAdornment>
                  ) : (
                    value !== "" && (
                      <MdClose
                        className={classNames(
                          "cursor-pointer w-5 h-5 text-gray-500 transition-opacity",
                          value !== "" ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                        onClick={() =>
                          onChange({ target: { name, value: "" } })
                        }
                      />
                    )
                  ))}
              </div>
            ),
            notched: !!labelToShow,
            classes: {
              input: `!text-sm !h-full !font-poppins ${placeholderClasses}`,
              root: `${isSearchField ? "!rounded-3xl" : "!rounded-lg"} ${inputClassName} `,
              disabled: `!bg-transparent ${disabledField && "!bg-solitude-1"}`
            },
            disableUnderline: true
          }}
          InputLabelProps={{
            shrink: !!labelToShow,
            classes: {
              shrink: "!text-licorice"
            }
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: error && touched ? "#FF6262" : "#2F3741"
            },
            "& .MuiInputBase-input:-webkit-autofill": {
              boxShadow: "0 0 0px 1000px transparent inset",
              WebkitBoxShadow: "0 0 0px 1000px transparent inset",
              WebkitTextFillColor: "#2F3741",
              transition: "background-color 5000s ease-in-out 0s"
            },
            "& .MuiInputLabel-root": {
              color: error && touched ? "#FF6262 !important" : "#6B7280 !important"
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: error && touched ? "#FF6262 !important" : "#388DCA !important"
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: error && touched ? "#FF6262 !important" : "#D1D5DB !important"
              },
              "&:hover fieldset": {
                borderColor: error && touched ? "#FF6262 !important" : "#388DCA !important"
              },
              "&.Mui-focused fieldset": {
                borderColor: error && touched ? "#FF6262 !important" : "#388DCA !important"
              }
            }
          }}
          inputProps={{
            maxLength,
            autoComplete
          }}
          onChange={(event) => {
            if (textTransform && textTransform?.toLowerCase() === "uppercase") {
              event.target.value = event.target.value.toString().toUpperCase();
            }
            if (/[<>]/.test(event.target.value)) {
              return;
            }
            if (regex && !regex.test(event.target.value)) {
              return;
            } else if (maxLength && event.target.value.length > maxLength) {
              return;
            }
            if (type === "number") {
              if (Number(event.target.value) || Number(event.target.value) === 0) {
                const newValue = parseFloat(event.target.value) || 0;
                event.target.value = Math.max(newValue, 0);
                if (event.target.value.length === 1 && event.target.value === "0") {
                  event.target.value = "";
                }
                onChange(event);
              } else {
                event.target.value = "";
                onChange(event);
              }
            } else {
              onChange(event);
            }
          }}
          value={value}
          name={name}
        />
      </div>
      {touched && error && <p className="mt-2 ml-1 text-xs text-bitterSweet">{error}</p>}
    </div>
  );
}

export default memo(CustomTextField);

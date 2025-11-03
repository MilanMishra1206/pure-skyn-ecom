import InfoIcon from "@mui/icons-material/Info";
import {
  Chip,
  FormControl,
  IconButton,
  Popper,
  styled,
  TextField,
  Tooltip,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import CustomCheckBox from "../CustomCheckBox";

function CustomAutocomplete({
  size,
  label,
  name,
  value,
  maxLength,
  options,
  placeholder = "Select",
  placeHolderClasses,
  requiredStar,
  selectClasses,
  classes,
  errorMessage,
  error,
  touched,
  disabled,
  handleBlur,
  handleChange,
  showRemove,
  setSearchValue,
  searchValue,
  isLoading,
  multiple,
  textOnSelectAll,
  showSelectAll,
  trimTextLength,
  disableOptionsOnSelectAll,
  selectAllByDefault,
  rootClasses,
  chipClassName = "",
  toolTipMessage,
  optionLabelClasses,
  optionLength = false,
  allowCreateOption = false,
  onCreateOption,
}) {
  const [open, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const inputRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleSelect = () => {
    if (!disabled) {
      setOpen((o) => !o);
    }
  };

  const trimmedLength = trimTextLength || 25;

  useEffect(() => {
    setSelectedOptions(
      selectAllByDefault
        ? options
        : multiple
        ? value?.map((item) => ({
            label: options?.find((option) => option?.value === item)?.label,
            value: item,
          }))
        : []
    );
  }, [options, value]);

  const CustomPopper = styled(Popper)({
    width: "auto !important",
    maxWidth: "500px",
    minWidth: "200px",
  });

  // Enhanced filter to include create option
  const filter = createFilterOptions();

  return (
    <FormControl fullWidth className={`${classes}`}>
      <Autocomplete
        isOptionEqualToValue={(option, newValue) =>
          option.value === newValue.value
        }
        multiple={multiple}
        ListboxProps={{
          sx: {
            boxShadow: "none",
            borderRadius: "8px",
            paddingY: "4px",
            "& ul": {
              padding: 0,
              display: "block",
              overflowX: "auto",
              whiteSpace: "nowrap",
            },
            "& li": {
              display: "flex",
              alignItems: "center",
              whiteSpace: "normal",
              wordBreak: "break-word",
              minWidth: "0",
              color: "#2F3741",
              padding: "16px 16px",
              margin: "0 12px",
              borderBottom: "0.5px solid #E0E0E0",
            },
            "& li:last-of-type": {
              borderBottom: "none",
            },
          },
        }}
        PopperComponent={
          optionLength && options?.length > 0 ? CustomPopper : undefined
        }
        options={options?.filter((opt) => !opt.isHidden)}
        onBlur={handleBlur}
        inputValue={searchValue}
        onInputChange={(_, newInputValue) => {
          setSearchValue?.(newInputValue);
        }}
        limitTags={1}
        open={open}
        classes={{
          option: "!text-kashmirBlue !font-poppins",
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={
          multiple
            ? disableOptionsOnSelectAll
              ? selectedOptions
              : value?.map((item) => ({
                  label:
                    options?.find((option) => option?.value === item)?.label ||
                    item,
                  value: item,
                }))
            : options?.find((option) => option.value === value) ||
              (value ? { label: value, value } : null)
        }
        onChange={(_, newValue) => {
          if (multiple) {
            if (
              newValue.find(
                (option) =>
                  option.value === "Select All" ||
                  option.value === "Unselect All"
              )
            ) {
              if (inputRef.current) {
                inputRef.current.blur();
              }
              if (options?.length === selectedOptions?.length) {
                handleChange({ target: { name, value: [] } });
                setSelectedOptions([]);
              } else {
                if (textOnSelectAll) {
                  handleChange({ target: { name, value: ["All"] } });
                } else {
                  handleChange({
                    target: { name, value: options?.map((item) => item.value) },
                  });
                }
                setSelectedOptions(options);
              }
            } else {
              // Handle create option in multiple mode
              const finalValues = newValue?.map((item) => {
                if (item.inputValue) {
                  const newOption = {
                    label: item.inputValue,
                    value: item.inputValue,
                  };
                  onCreateOption?.(newOption);
                  return item.inputValue;
                }
                return item.value;
              });

              handleChange({ target: { name, value: finalValues } });
              setSelectedOptions(
                newValue?.map((item) => ({
                  label: item.inputValue || item.label,
                  value: item.inputValue || item.value,
                }))
              );
            }
          } else {
            if (inputRef.current) {
              inputRef.current.blur();
            }

            // Handle create option in single mode
            if (newValue?.inputValue) {
              const newOption = {
                label: newValue.inputValue,
                value: newValue.inputValue,
              };
              onCreateOption?.(newOption);
              handleChange({ target: { name, value: newValue.inputValue } });
            } else {
              handleChange({ target: { name, value: newValue?.value } });
            }
          }
        }}
        fullWidth
        disabled={disabled}
        disableCloseOnSelect={multiple}
        className={`!pr-0 ${selectClasses}`}
        renderTags={(tagValue) =>
          multiple &&
          textOnSelectAll &&
          selectedOptions?.length === options?.length ? (
            <Chip
              title={textOnSelectAll}
              label={
                textOnSelectAll?.length > trimmedLength
                  ? `${textOnSelectAll?.slice(0, trimmedLength - 3)}...`
                  : textOnSelectAll
              }
              variant="filled"
              onDelete={() => {
                if (inputRef.current) {
                  inputRef.current.blur();
                }
                handleChange({ target: { name, value: [] } });
                setSelectedOptions([]);
              }}
            />
          ) : (
            <div className="flex items-center !text-cello !font-poppins font-medium">
              {tagValue.slice(0, 1)?.map((option) => (
                <span title={option?.label} key={option.value}>
                  <Chip
                    className={chipClassName}
                    label={
                      option?.label?.length > trimmedLength
                        ? `${option?.label?.slice(
                            0,
                            trimmedLength - (trimmedLength >= 6 ? 6 : 0)
                          )}...`
                        : option?.label
                    }
                    variant="outlined"
                  />
                </span>
              ))}
              <span>
                {tagValue?.length > 1 ? ` + ${tagValue?.length - 1}` : ""}
              </span>
            </div>
          )
        }
        filterOptions={(menuItems, params) => {
          const filtered = filter(menuItems, params);

          // Add create option if enabled and there's input that doesn't match existing options
          if (allowCreateOption && params.inputValue !== "" && !isLoading) {
            const isExisting = menuItems.some(
              (option) =>
                params.inputValue.toLowerCase() === option.label.toLowerCase()
            );

            if (
              !isExisting &&
              params.inputValue.trim() !== "" &&
              params.inputValue.length <= (maxLength ?? 10000)
            ) {
              filtered.push({
                inputValue: params.inputValue,
                label: `Add "${params.inputValue}"`,
                value: `create-${params.inputValue}`,
              });
            }
          }

          // Add select all option if enabled
          const optionName =
            options?.length === selectedOptions?.length
              ? "Unselect All"
              : "Select All";

          return showSelectAll && filtered?.length > 0
            ? [{ label: optionName, value: optionName }, ...filtered]
            : filtered;
        }}
        renderOption={(props, option, state) => (
          <li
            {...props}
            className={`!font-poppins !text-sm ${props.className} ${
              multiple &&
              disableOptionsOnSelectAll &&
              selectedOptions?.length === options?.length &&
              state.selected &&
              "pointer-events-none opacity-50"
            } ${optionLabelClasses} ${
              option.disable ? "pointer-events-none opacity-40" : ""
            } ${
              option?.inputValue?.trim() ? "!text-blue-600 !font-medium" : ""
            }`}
            key={option.value}
          >
            {multiple && !option?.inputValue?.trim() && (
              <CustomCheckBox checked={state.selected} />
            )}
            {option?.inputValue?.trim() ? (
              <span className="flex items-center">
                <span className="mr-2">+</span>
                {option.label}
              </span>
            ) : (
              option.label
            )}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            id={
              requiredStar
                ? "outlined-required"
                : error && touched
                ? "outline-error"
                : disabled
                ? "outline-disabled"
                : ""
            }
            size={size || "medium"}
            inputRef={inputRef}
            className={`${disabled && "bg-white"}`}
            value={searchValue}
            onChange={(event) => {
              setOpen(true);
              setSearchValue?.(event?.target?.value);
            }}
            placeholder={placeholder}
            error={error && touched}
            onClick={toggleSelect}
            disabled={disabled}
            label={
              <>
                <span className="!mt-1 !font-poppins text-cello">{label}</span>
                {requiredStar && <span className="text-[#FF6262]">*</span>}
              </>
            }
            InputLabelProps={{
              shrink: true,
              className: "!font-medium",
              style: {
                padding: "1px 6px",
              },
            }}
            InputProps={{
              ...params.InputProps,
              notched: !!label,
              style: { fontSize: 16 },
              endAdornment: (
                <div className="flex items-center gap-1 pr-2">
                  {showRemove && (multiple ? value?.length > 0 : value) ? (
                    <MdClose
                      className="cursor-pointer text-gray-500"
                      onClick={() => {
                        handleChange({
                          target: { name, value: multiple ? [] : "" },
                        });
                        setSelectedOptions([]);
                        if (setSearchValue) {
                          setSearchValue("");
                        }
                      }}
                    />
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#6B7280"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transform transition-transform"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  )}
                  {toolTipMessage && (
                    <ClickAwayListener
                      onClickAway={() => setTooltipOpen(false)}
                    >
                      <Tooltip title={toolTipMessage} arrow open={tooltipOpen}>
                        <IconButton
                          onClick={() => setTooltipOpen(!tooltipOpen)}
                          size="small"
                        >
                          <InfoIcon
                            fontSize="small"
                            className="text-gray-400"
                          />
                        </IconButton>
                      </Tooltip>
                    </ClickAwayListener>
                  )}
                </div>
              ),
              classes: {
                input: `!font-poppins ${placeHolderClasses} !text-[16px]`,
                root: `!py-14px !pr-0 !flex !rounded-lg ${rootClasses}`,
                disabled: `!bg-transparent ${disabled && "!bg-solitude-1"}`,
              },
              disableUnderline: true,
            }}
            sx={{
              "& .MuiInputBase-input:-webkit-autofill": {
                boxShadow: "0 0 0px 1000px transparent inset",
                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                WebkitTextFillColor: "#2F3741",
                transition: "background-color 5000s ease-in-out 0s",
              },
              "& .MuiOutlinedInput-root": {
                "& legend": {
                  width: "auto",
                },
                "& fieldset": {
                  borderColor: error && touched ? "#FF6262" : "#D1D5DB",
                },
                "&:hover fieldset": {
                  borderColor: error && touched ? "#FF6262" : "#388DCA",
                },
                "&.Mui-focused fieldset": {
                  borderColor: error && touched ? "#FF6262" : "#388DCA",
                },
              },
              "& .MuiInputLabel-root": {
                color: error && touched ? "#FF6262" : "#6B7280",
                "&.Mui-focused": {
                  color: error && touched ? "#FF6262" : "#388DCA",
                },
                "&:hover": {
                  color: error && touched ? "#FF6262" : "#388DCA",
                },
              },
            }}
          />
        )}
        getOptionLabel={(option) => option?.label}
        noOptionsText={isLoading ? "Loading..." : "No options"}
        autoComplete={false}
        freeSolo={allowCreateOption}
        selectOnFocus={allowCreateOption}
        clearOnBlur={allowCreateOption}
        handleHomeEndKeys={allowCreateOption}
      />
      {error && touched && (
        <div className="mt-1 ml-1 text-xs text-[#FF6262]">{errorMessage}</div>
      )}
    </FormControl>
  );
}

export default CustomAutocomplete;

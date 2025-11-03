import React, { Suspense } from "react";
import { Divider, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomDrawer from "../CustomDrawer";

function DrawerComponent({
  openDrawer,
  onClose,
  showClose = false,
  title,
  customElement,
  className = "flex justify-center items-center w-10 h-10 cursor-pointer",
  children,
  childClassName = "",
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <div className={className}>{customElement}</div>

      <Suspense fallback={<div>Loading...</div>}>
        <CustomDrawer
          open={openDrawer}
          anchorPosition={isMobile ? "bottom" : "right"}
          classes="!z-[1300] !h-[80%]"
          childClass={`!h-screen flex flex-col ${
            !isMobile ? "!w-[400px]" : ""
          } ${childClassName}`}
        >
          <div className="flex-shrink-0">
            {showClose ? (
              <div className="flex justify-between items-center p-4">
                <p className="font-medium text-xl font-poppins text-gray-800">
                  {title}
                </p>
                <button
                  aria-label="Close Drawer"
                  onClick={onClose}
                  className="outline-none border-none !cursor-pointer text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>
            ) : (
              <div className="p-4 font-medium text-xl font-poppins text-gray-800">
                {title}
              </div>
            )}
            <Divider className="mt-0" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child, child.props)
                : child
            )}
          </div>
        </CustomDrawer>
      </Suspense>
    </>
  );
}

export default DrawerComponent;

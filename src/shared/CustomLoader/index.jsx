import { Backdrop, CircularProgress } from "@mui/material";

function CustomLoader({ open, showLoadingText, isLogin = false }) {
  return (
    <Backdrop
      open={open}
      className="!z-[9999] flex flex-col items-center justify-center"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <CircularProgress
        sx={{
          color: "#045ca8",
        }}
        size={60}
      />
      {showLoadingText && (
        <div className="text-[#F2F2F2] text-center text-lg font-medium mt-4">
          Please wait while we load the information
        </div>
      )}
      {isLogin && (
        <div className="text-[#F2F2F2] text-center text-lg font-medium mt-4">
          Please wait while we log you in...
        </div>
      )}
    </Backdrop>
  );
}

export default CustomLoader;

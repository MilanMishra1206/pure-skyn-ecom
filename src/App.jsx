import { AppSnackbarProvider } from "./config/Context/SnackbarContext";
import Theme from "./config/Theme";
import Router from "./utils/Router";
import { SnackbarProvider } from "notistack";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

function App() {
  return (
    <div>
      <Theme>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          autoHideDuration={3000}
        >
          <AppSnackbarProvider>
            <Router />
          </AppSnackbarProvider>
        </SnackbarProvider>
      </Theme>
    </div>
  );
}

export default App;

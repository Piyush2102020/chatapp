import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routes from "./routes/routes";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
      <ToastContainer aria-label="notification-container" position="top-right" autoClose={3000} />
    </BrowserRouter>
  </Provider>
);

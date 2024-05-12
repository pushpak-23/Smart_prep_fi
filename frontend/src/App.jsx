import React from "react";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Test from "./Components/TestSection/Test";
import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ResultPage from "./Components/TestSection/ResultPage";
import store from "./state/store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import Homepage from "./Components/HomePage/Homepage";
import NuhUh from "./Components/NuhUh";
import RulesPage from "./Components/TestSection/RulesPage";
import TransactionTable from "./Components/TransactionTable";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/nuh-uh" element={<NuhUh />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="trans" element={<TransactionTable />} />
          {/* catch all other paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

function MainApp() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  );
}

export default MainApp;

import logo from "./logo.svg";
import "./App.css";

import Router from "./routes/routes.index";
import JwtProvider from "./providers/jwtProvider";

function App() {
  return (
    <JwtProvider>
      <div className="App">
        <Router />
      </div>
    </JwtProvider>
  );
}

export default App;

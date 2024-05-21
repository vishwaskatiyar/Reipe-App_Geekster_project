import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Component/Navbar";
import Fotter from "./Component/Fotter";
import RecipeDetails from "./Pages/RecipeDetails";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Fotter />
    </>
  );
}

function App() {
  return (
    <div className="App bg-black">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipe/:id" element={<RecipeDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

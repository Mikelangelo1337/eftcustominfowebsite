import ReactDOM from "react-dom/client";
import React from "react";
import {
       BrowserRouter,
       Routes,
       Route,
       createBrowserRouter,
       createRoutesFromElements,
       RouterProvider
} from "react-router-dom";

import App from "./App";
import Ammo from "./pages/Ammo";
import AmmoItem from "./pages/Item-ammo";
import Boss from "./pages/Boss";
import BossPage from "./pages/Boss-page";
import ItemData from "./pages/Item-data";
import Quest from "./pages/Quests";
import QuestData from "./pages/Quest-data";
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
       createRoutesFromElements(
              <>
                     <Route path="/"
                            element={<App />}>
                     </Route>
                     <Route path="/ammo" element={<Ammo />}></Route>
                     <Route path="/ammo/:id" element={<AmmoItem />}></Route>
                     <Route path="/boss" element={<Boss />}></Route>
                     <Route path="/boss/:id" element={<BossPage />}></Route>
                     <Route path="/item/:id" element={<ItemData />}></Route>
                     <Route path="/quest" element={<Quest />}></Route>
                     <Route path="/quest/:id" element={<QuestData />}></Route>
              </>
       )
)



root.render(
       <React.StrictMode>
              <RouterProvider router={router} />
       </React.StrictMode>
);

import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import DefaultLayout from './layouts/DefaultLayout'
import Home from './pages/Home'
import ServerErrorPage from "./pages/ServerErrorPage"

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { PrintModelsProvider } from "./contexts/GlobalContext"
import SearchResultPage from "./pages/SearchResultsPage"
import Show from "./pages/Show"

function App() {

  return (
    <>
      <PrintModelsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/printModels"></Route>
              <Route path="/printModels/:id" element={<Show />}></Route>
              <Route path="/search" element={<SearchResultPage />}></Route>
              <Route path="*" element={<ServerErrorPage error={"The page you are looking for doesn't exist! 404"} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PrintModelsProvider>
    </>
  )
}

export default App

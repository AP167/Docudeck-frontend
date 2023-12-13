import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UploadRule from "./components/UploadRule"
import DisplayRules from "./components/DisplayRules"

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path = '/' element={<DisplayRules />} />
                <Route path = '/upload-rule' element={<UploadRule />} />
                <Route path = '/*' element={<h>Page not found!</h>} />
            </Routes>
        </Router>
    )
}
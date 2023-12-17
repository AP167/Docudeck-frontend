import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UploadRule from "./components/UploadRule"
import DisplayRules from "./components/DisplayRules"
import TenderDashboard from "./components/TenderDashboard"
import VendorDashboard from "./components/VendorDashboard"
import SignIn from "./components/SignIn"
import VendorParticipation from "./components/VendorParticipation"
import UploadDocuments from "./components/UploadDocuments"
import UploadTender from "./components/UploadTender"
import './components/styles/Common.css'


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path = '/' element={<DisplayRules />} />
                <Route path = '/upload-rule' element={<UploadRule />} />
                <Route path = '/tender-dashboard' element={<TenderDashboard />} />
                <Route path = '/vendor-dashboard' element={<VendorDashboard />} />
                <Route path = '/vendor-participation' element={<VendorParticipation />} />
                <Route path = '/upload-documents' element={<UploadDocuments />} />
                <Route path = '/upload-tender' element={<UploadTender />} />
                <Route path = '/sign-up' element={<SignIn sign="Up" />} />
                <Route path = '/sign-in' element={<SignIn sign="In" />} />
                <Route path = '/*' element={<h>Page not found!</h>} />
            </Routes>
        </Router>
    )
}
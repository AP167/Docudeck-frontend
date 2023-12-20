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
import ProtectedRoute from "./ProtectedRoute"
import BiddingAssistance from "./components/BiddingAssistance"


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path = '/' element={<DisplayRules />} />
                <Route path = '/admin-upload-rule' element={<ProtectedRoute allowedRoles={['admin']} element={<UploadRule />} />} />
                <Route path = '/tia-dashboard' element={<ProtectedRoute allowedRoles={['tia']} element={<TenderDashboard />} />} />
                <Route path = '/tia-upload-tender' element={<ProtectedRoute allowedRoles={['tia']} element={<UploadTender />} />} />
                <Route path = '/technical-evaluation' element={<ProtectedRoute allowedRoles={['tia']} element={<VendorParticipation />} />} />
                <Route path = '/vendor-dashboard' element={<ProtectedRoute allowedRoles={['vendor']} element={<VendorDashboard />} />} />
                <Route path = '/vendor-upload-documents' element={<ProtectedRoute allowedRoles={['vendor']} element={<UploadDocuments />} />} />
                <Route path = '/sign-up' element={<SignIn sign="Up" />} />
                <Route path = '/sign-in' element={<SignIn sign="In" />} />
                <Route path = '/bid-assistance' element={<BiddingAssistance />} />
                <Route path = '/*' element={<h>Page not found!</h>} />
            </Routes>
        </Router>
    )
}
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp.tsx";
import ProfileApplicant from "./pages/ProfileApplicant.tsx";
import ProfileRecruiter from "./pages/ProfileRecruiter.tsx";
import FilteredJobs from "./pages/FilterJobs.tsx";
import AddCompanyDialog from "./components/AddCompanyDialog.tsx";
import JobPostPage from "./pages/JobPostDialog.tsx";
import ResumeDashboard from "./pages/ResumeDashboard.tsx";
import EditResume from "./pages/Resume/[ResumeId]/Edit/EditResume.tsx";
import ViewResume from "./pages/Resume/[ResumeId]/View/ViewResume.tsx";

function App() {
    return (
        <Router>
            <div className="min-h-screen w-screen flex flex-col">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<ProfileRecruiter/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/filtered-jobs" element={<FilteredJobs/>} />
                    <Route path="/cerate-company" element={<AddCompanyDialog/>}/>
                    <Route path="/post-job" element={<JobPostPage/>}/>
                    <Route path="/build-resume" element={<ResumeDashboard/>}/>
                    <Route path="/resume/:ResumeId/edit" element={<EditResume/>}/>
                    <Route path="/resume/:ResumeId/view" element={<ViewResume/>}/>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

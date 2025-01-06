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
import JobPostPage from "./pages/CreateJobPost.tsx";
import ResumeDashboard from "./pages/ResumeDashboard.tsx";
import EditResume from "./pages/Resume/[ResumeId]/Edit/EditResume.tsx";
import ViewResume from "./pages/Resume/[ResumeId]/View/ViewResume.tsx";
import DetailJobPostPreview from "./pages/DetailJobPostPreview.tsx";
import RecentJobPostsTable from "./components/TablePostedJobs/TablePostedJobsRecent.tsx";
import JobPostsTable from "./components/TablePostedJobs/TablePostedJobs.tsx";
import CompaniesTable from "./components/TableCompaniesInvolved/TableCompanies.tsx";
import ApplicantsTable from "./components/TableApplicants/TableApplicants.tsx";
import AppliedJobsTable from "./components/TableAppliedJobs/TableAppliedJobs.tsx";
import JobRecommendations from "./pages/JobRecommendations.tsx";

function App() {
    return (
        <Router>
            <div className="min-h-screen w-screen  flex flex-col">
                <Header />
                <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<ProfileRecruiter />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/filtered-jobs" element={<FilteredJobs />} />
                    <Route path="/create-company" element={<AddCompanyDialog />} />
                    <Route path="/post-job" element={<JobPostPage />} />
                    <Route path="/jobs/:id" element={<DetailJobPostPreview />} />
                    <Route path="/recent-job-posts-table" element={<RecentJobPostsTable />} />
                    <Route path="/job-posts-table/:companyId" element={<JobPostsTable />} />
                    <Route path="/companies-table" element={<CompaniesTable />} />
                    <Route path="/applicants-table/:jobId" element={<ApplicantsTable />} />
                    <Route path="/applied-jobs-table" element={<AppliedJobsTable />} />
                    <Route path="/build-resume" element={<ResumeDashboard />} />
                    <Route path="/resume/:ResumeId/edit" element={<EditResume />} />
                    <Route path="/resume/:ResumeId/view" element={<ViewResume />} />
                    <Route path="/job-recommendations/:profileId" element={<JobRecommendations />} />

                </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FormDataProvider } from "./components/FormDataContext";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Paralelas from "./components/Paralelas";
import LegalDocs from "./components/Legal";
import Learn from "./components/Recursos";
import Enquiry from "./components/Contacto";
import Footer from "./components/Footer";
import ResultsPage from "./components/ResultsPage";
import StepTwo from "./components/StepTwo";
import KnownCourseForm from "./components/KnownCourseForm";
import VocationalQuizForm from "./components/VocationalQuizForm";
import Terms from "./components/terms";
import axios from "axios";
import CookieConsent from "./components/CookieConsent";

import NewsDetail from "./components/NewsDetail";
import ScholarshipDetail from "./components/ScholarshipDetail";
import NotFound from "./components/404";
import PaymentSuccess from "./components/PaymentSuccess";

const token = localStorage.getItem("authToken");
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home/>} />
      <Route path="/contact" element={<Enquiry />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/scholarships/:id" element={<ScholarshipDetail />} />
      <Route
        path="/paralelas"
        element={
            <Paralelas />
        }
      />
      <Route
        path="/legal"
        element={
            <LegalDocs />
        }
      />
      <Route
        path="/recursos"
        element={
            <Learn />
        }
      />
      <Route
        path="/known-course"
        element={
            <KnownCourseForm />
        }
      />

      <Route
        path="/vocational-quiz"
        element={
            <VocationalQuizForm />
        }
      />
      <Route
        path="/escolher-teste"
        element={
            <StepTwo />
        }
      />
      <Route
        path="/results"
        element={
            <ResultsPage />
        }
      />
      <Route 
        path="/payment-success" 
        element={
            <PaymentSuccess />
          } 
      />


      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <FormDataProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navigation />
            <main className="flex-1 pt-6">
              <AppRoutes />
            </main>
            <Footer />
            <CookieConsent />
          </div>
        </Router>
      </FormDataProvider>
    </ThemeProvider>
  );
}


export default App;

import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import Home from './pages/Home';
import WhoWeAre from './pages/WhoWeAre';
import PortHarcourtHub from './pages/PortHarcourtHub';
import ContinentalPresence from './pages/ContinentalPresence';
import RegulatoryNavigator from './pages/RegulatoryNavigator';
import ResponseFootprintBases from './pages/ResponseFootprintBases';
import MobilizationProtocol from './pages/MobilizationProtocol';
import ServicesHub from './pages/ServicesHub';
import ShorelineRecovery from './pages/ShorelineRecovery';
import TierResponse from './pages/TierResponse';
import TrainingCertification from './pages/TrainingCertification';
import EquipmentMaintenance from './pages/EquipmentMaintenance';
import ConsultancyPlanning from './pages/ConsultancyPlanning';
import AssetRegistry from './pages/AssetRegistry';
import KnowledgeHub from './pages/KnowledgeHub';
import BlogPost from './pages/BlogPost';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import MaintenanceRequest from './pages/MaintenanceRequest';
import { PlaceholderPage } from './pages/PlaceholderPage';
import ProtectedRoute from './components/ProtectedRoute';
import MemberPortalLogin from './pages/MemberPortalLogin';
import ResetPassword from './pages/ResetPassword';
import MemberDashboard from './pages/MemberDashboard';
import CareerApplication from './pages/CareerApplication';
import TrainingApplication from './pages/TrainingApplication';
import Gallery from './pages/Gallery';
import PostSpillAssessment from './pages/PostSpillAssessment';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,                            element: <Home /> },
      { path: 'who-we-are',                     element: <WhoWeAre /> },
      { path: 'hubs/port-harcourt',             element: <PortHarcourtHub /> },
      { path: 'presence',                       element: <ContinentalPresence /> },
      { path: 'presence/regulatory-navigator',  element: <RegulatoryNavigator /> },
      { path: 'presence/bases',                 element: <ResponseFootprintBases /> },
      { path: 'presence/mobilization-protocol', element: <MobilizationProtocol /> },
      { path: 'services',                       element: <ServicesHub /> },
      { path: 'services/incident-response',     element: <TierResponse /> },
      { path: 'services/shoreline-recovery',    element: <ShorelineRecovery /> },
      { path: 'services/imo-training',          element: <TrainingCertification /> },
      { path: 'services/equipment-maintenance', element: <EquipmentMaintenance /> },
      { path: 'services/consultancy',           element: <ConsultancyPlanning /> },
      { path: 'knowledge',                      element: <KnowledgeHub /> },
      { path: 'knowledge/blog/:slug',            element: <BlogPost /> },
      { path: 'careers',                        element: <Careers /> },
      { path: 'contact',                        element: <Contact /> },
      { path: 'portal/login',                   element: <MemberPortalLogin /> },
      { path: 'portal/reset-password',           element: <ResetPassword /> },
      { path: 'careers/apply',                  element: <CareerApplication /> },
      { path: 'portal/training-application',    element: <TrainingApplication /> },
      { path: 'gallery',                        element: <Gallery /> },
      { path: 'portal/post-spill-assessment',   element: <PostSpillAssessment /> },
      { path: '*',                              element: <NotFound /> },

      // ── Protected routes (requires login) ──────────────────────
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'portal/dashboard',            element: <MemberDashboard /> },
          { path: 'portal/maintenance-request',  element: <MaintenanceRequest /> },
          { path: 'assets',                      element: <AssetRegistry /> },
        ],
      },

      { path: 'privacy',  element: <PlaceholderPage title="Privacy Policy" /> },
      { path: 'terms',    element: <PlaceholderPage title="Terms of Engagement" /> },
      { path: 'cookies',  element: <PlaceholderPage title="Cookie Policy" /> },
    ],
  },
]);

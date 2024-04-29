import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'
import Main from './pages/menu/Main.jsx'
import Hub from './pages/chat/Hub.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import SignIn from './pages/auth/SignIn.jsx'
import WaitingRoom from './pages/menu/components/WaitingRoom.jsx';
import NotFound from './pages/NotFound.jsx';
import Navbar from "./navbar/Navbar";
import { paths } from "./static/Paths";
import Profile from "./pages/profile/Profile";
import Friends from "./pages/friends/Friends";
import ReportProblem from './pages/report/ReportProblem.jsx';
import Moderation from './pages/admin_pages/Moderation.jsx';
import SiteStats from './pages/admin_pages/SiteStats.jsx';
import { useSession } from './http/context/UserContext.js';
import { observer } from 'mobx-react-lite';


export const App = observer(() => {

    const userSession = useSession();

    const ProtectedRoute = ({ children, requireAdmin = false }) => {

        if (!userSession.IsAuth || requireAdmin && !(userSession.IsAdmin)) {
            return <Navigate to={paths.mainPath} replace />;
        }

        return children;
    };

    return (<>
        <Navbar />
        <div className="container">
            <Routes>
                <Route exec path={paths.mainPath} element={<Main />} />
                <Route exec path={paths.signUpPath} element={<SignUp />} />
                <Route exec path={paths.signInPath} element={<SignIn />} />

                <Route exec path={paths.profilePath} element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>} />

                <Route exec path={paths.friendsPath} element={<ProtectedRoute>
                    <Friends />
                </ProtectedRoute>} />

                <Route exec path={paths.reportPath} element={
                    <ProtectedRoute>
                        <ReportProblem />
                    </ProtectedRoute>} />

                <Route exec path={paths.moderationPath} element={
                    <ProtectedRoute requireAdmin={true}>
                        <Moderation />
                    </ProtectedRoute>} />

                <Route exec path={paths.hubPath} element={
                    <ProtectedRoute>
                        <Hub />
                    </ProtectedRoute>} />

                <Route exec path={paths.waitingRoomPath} element={
                    <ProtectedRoute>
                        <WaitingRoom />
                    </ProtectedRoute>} />

                <Route path={paths.notFoundPath} element={<NotFound />} />
            </Routes>
        </div>
    </>);
});

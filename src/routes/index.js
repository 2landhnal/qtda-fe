import Home from '../pages/Home';
import Login from '../pages/Login';
import Landing from '../pages/Landing';
import User from '../pages/User';
import Error from '../pages/Error';
import Schedule from '../pages/Schedule';
import { HeaderOnly } from '../layouts';
import Signature from '../pages/Signature';
import Veirfy from '../pages/Verify';
import SignedDocuments from '../pages/Signed';
import LandingLayout from '../layouts/LandingLayout';

const routePath = {
    login: '/login',
    landing: '/',
    user: '/user',
    home: '/home',
    error: '/error',
    signature: '/signature',
    schedule: '/schedule',
    verify: '/verify',
    signed: '/signedDocuments',
};

const publicRoutes = [
    {
        path: routePath.login,
        component: Login,
        layout: HeaderOnly,
        redirect: routePath.home,
    },
    {
        path: routePath.landing,
        component: Landing,
        layout: LandingLayout,
    },
    { path: routePath.error, component: Error, layout: null },
    {
        path: routePath.verify,
        component: Veirfy,
    },
];
const privateRoutes = [
    {
        path: routePath.user,
        component: User,
        layout: HeaderOnly,
    },
    {
        path: routePath.home,
        component: Home,
    },
    {
        path: routePath.signed,
        component: SignedDocuments,
    },
    {
        path: routePath.schedule,
        component: Schedule,
    },
    {
        path: routePath.signature,
        component: Signature,
    },
];

export { privateRoutes, publicRoutes, routePath };

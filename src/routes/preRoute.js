import { publicRoutes, privateRoutes, routePath } from '.';
import { checkCredential } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './authProvider';

function PreRoute(route) {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            const isAuthenticated = await checkCredential();
            setAuth(isAuthenticated);

            const isPublicRoute = publicRoutes.some(
                (r) => r.path === route.path,
            );

            // Nếu route là public
            if (isPublicRoute && route.redirect && isAuthenticated) {
                navigate(route.redirect, { replace: true });
            }
            // Nếu route là private
            if (!isPublicRoute && !isAuthenticated) {
                navigate(routePath.login, { replace: true });
            }
        };

        checkAuth(); // Gọi hàm bất đồng bộ
    }, [auth, navigate, route]);

    if (auth === null) {
        // Có thể hiển thị trạng thái loading trong lúc chờ
        return <div>Loading...</div>;
    }

    const Component = route.component;
    return <Component />;
}

export default PreRoute;

import React from 'react';
import { Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

function PagePrincipal() {
    return (
        <>
            <Menu
                mode="horizontal"
                items={[
                    {
                        key: 'Noticias',
                        label: <Link to="/noticias">Noticias</Link>
                    },
                    {
                        key: 'Preferencia',
                        label: <Link to="/">Preferencias</Link>
                    },
                    {
                        key: 'Permisos',
                        label: <Link to="/permisos">Solicitar</Link>
                    }
                ]}
            />
            <Outlet />
        </>
    );
}

export default PagePrincipal;



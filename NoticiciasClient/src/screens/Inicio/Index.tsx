import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu, Button, Drawer } from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  GlobalOutlined,
  AppstoreAddOutlined, UserOutlined ,UserAddOutlined,NotificationOutlined 
} from '@ant-design/icons';


import { Input } from 'antd';

import { i } from 'framer-motion/m';
import NoticiasPage from '../Noticias/Index';
import EnhancedModernLogin from '../Mundo';
import CrearNoticiaPage from '../Noticias/Create';
import Register from '../Mundo/Register';
import PagePrincipal from '../Usuario/Index';
import './indexInicio.css'
import PagePerpisoPublicar from '../Permisos/Index';


const { Header, Content, Footer } = Layout;

function AppInicio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <Layout className="app-layout">
        <Header className="app-header">
          <div className="nav-logo">Noticias UCE</div>
      
          <div className="nav-right">
          <Link to=" " className="login-link">
              <Button icon={<NotificationOutlined  />}type="primary"></Button>  
             
            </Link>
            <Link to="/mundo" className="login-link">
              <Button icon={<UserOutlined />}type="primary">Iniciar sesión</Button>  
             
            </Link>
            <Link to="/mundo/register" className="register-link">
              <Button icon={<UserAddOutlined/>}type="primary">Registrarse</Button>
            </Link>
            </div>
          <Button
            className="menu-toggle"
            onClick={toggleMenu}
            icon={<MenuOutlined />}
            size="large"
          />
        </Header>

        <Drawer
          title="Menú"
          placement="left"
          closable={true}
          onClose={toggleMenu}
          visible={isMenuOpen}
          bodyStyle={{ padding: 0 }}
        >
          <Menu mode="vertical" onClick={toggleMenu}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/noticias">Inicio</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
              <Link to="/noticias">Noticias</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<GlobalOutlined />}>
              <Link to="/mundo">Mundo</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
              <Link to="/noticias/create">Crear Noticia</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<AppstoreAddOutlined />}>
              <Link to="/mundo/register">Registrarse</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<AppstoreAddOutlined />}>
              <Link to="/usuario">Usuario</Link>
            </Menu.Item>
          </Menu>
        </Drawer>

        <Content className="app-content">
          <Routes>
            
            <Route path="/noticias" element={<NoticiasPage/>} />
            <Route path="/mundo" element={<EnhancedModernLogin />} />
            <Route path="/noticias/create" element={<CrearNoticiaPage />} />
            <Route path="/mundo/register" element={<Register/>} />
            <Route path="/usuario" element={<PagePrincipal />} />
            <Route path="/Permisos" element={<PagePerpisoPublicar />} />
          </Routes>
        </Content>
        

        <Footer className="app-footer">
          NewsApp ©2024 Creado con Ant Designaaa
        </Footer>
      </Layout>
    </Router>
  );
}

export default AppInicio;

import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu, Button, Drawer } from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  GlobalOutlined,
  AppstoreAddOutlined, UserOutlined ,UserAddOutlined,NotificationOutlined 
} from '@ant-design/icons';
import './App.css';
import AppInicio from './screens/Inicio/Index';


function App() {


  return (
   <AppInicio/>
  );
}

export default App;

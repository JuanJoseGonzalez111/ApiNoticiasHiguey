import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Form, Input, Button, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const EnhancedModernLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post("https://localhost:7165/login", {
        email: values.email,
        password: values.password,
      }, { withCredentials: true });
  
      message.success(response.data.Message);
      
      // Guarda el token en el almacenamiento local o en cookies
      localStorage.setItem('token', response.data.token); // Asegúrate de que el backend devuelve el token en 'response.data.token'
      
      navigate("/usuario");  
    } catch (error) {
      message.error("Error: Usuario o contraseña incorrectos");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <Title level={3} className="text-white text-center mb-4">Welcome Back</Title>
        <Form
          name="login"
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Form.Item
            label={<Text className="text-white">Email</Text>}
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                size="large"
                className="rounded-lg text-white placeholder-gray-300 bg-opacity-20"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              />
            </motion.div>
          </Form.Item>

          <Form.Item
            label={<Text className="text-white">Password</Text>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                size="large"
                className="rounded-lg text-white placeholder-gray-300 bg-opacity-20"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              />
            </motion.div>
          </Form.Item>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="font-semibold text-lg bg-white text-purple-600"
            >
              Sign In
            </Button>
          </motion.div>
        </Form>

        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-white hover:underline">Forgot password?</a>
        </div>
        <div className="mt-4 text-center">
          <Text className="text-sm text-white">
            Don't have an account?{' '}
            <Link to="/Mundo/Register" className="font-medium hover:underline text-white">Sign up</Link>
          </Text>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedModernLogin;

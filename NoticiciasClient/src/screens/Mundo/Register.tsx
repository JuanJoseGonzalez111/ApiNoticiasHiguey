import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Form, Input, Button, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NoticiasPage from '../Noticias/Index';

const { Title, Text } = Typography;

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7165/register', {
        email,
        password,
      });

      if (response.status === 200) {
        message.success("");
        // Redirige al usuario al inicio de sesión o página principal
      }
    } catch (error) {
      message.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-green-500 to-teal-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <Title level={3} className="text-white text-center mb-4">Create Account</Title>
        <Form
          name="register"
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

          <Form.Item
            label={<Text className="text-white">Confirm Password</Text>}
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              className="font-semibold text-lg bg-white text-teal-600"
            >
              Sign Up
            </Button>
          </motion.div>
        </Form>

        <div className="mt-4 text-center">
          <Text className="text-sm text-white">
            Already have an account?{' '}
            <Link to="/login" className="font-medium hover:underline text-white">Sign in</Link>
          </Text>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios.post('/api/register', values)
      .then(res => {
        message.success(res.data.message);
        navigate('/');
      })
      .catch(err => {
        message.error(err.response?.data?.message || '注册失败');
      });
  };

  return (
    <div style={{ maxWidth: 300, margin: '100px auto' }}>
      <h2 style={{ textAlign: 'center' }}>注册</h2>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>注册</Button>
          <Button type="link" block onClick={() => navigate('/')}>已有账号？去登录</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;

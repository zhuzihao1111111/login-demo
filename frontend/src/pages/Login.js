import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const onFinish = (values) => {
    axios.post('/api/login', values)
      .then(res => {
        const msg = res.data.message;
        if (msg === '登录成功') {
          message.success(msg);
          setErrorMsg('');
          navigate('/home');
        } else {
          setErrorMsg(msg);
        }
      })
      .catch(err => {
        const msg = err.response?.data?.message || '登录失败';
        setErrorMsg(msg);
      });
  };

  return (
    <div style={{ maxWidth: 300, margin: '100px auto' }}>
      <h2 style={{ textAlign: 'center' }}>登录</h2>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>登录</Button>
          <Button type="link" block onClick={() => navigate('/register')}>没有账号？注册</Button>
        </Form.Item>
      </Form>
      {errorMsg && (
        <div style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</div>
      )}
    </div>
  );
};

export default Login;

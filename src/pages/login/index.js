import { Form, Input, Button, Card, Typography, Space } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUser, loginUser } from "../../store/actions/user";
import "./index.css";
const { Title } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = () => {
  const [isReg, setIsReg] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = (payload) => {
    console.log("Success:", payload);
    if (isReg) dispatch(createUser({ payload, history }));
    else dispatch(loginUser({ payload, history }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    alert(errorInfo);
  };

  return (
    <div className="login-container">
      <Card>
        <Title>Incident Management</Title>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className="app-form-footer">
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                {!isReg ? "Signin" : "Register"}
              </Button>
            </Form.Item>
            {isReg && (
              <Form.Item {...tailLayout}>
                <Button type="primary" onClick={() => setIsReg(false)}>
                  Cancel
                </Button>
              </Form.Item>
            )}
          </div>
          {!isReg && <a onClick={() => setIsReg(true)}>Register user</a>}
        </Form>
      </Card>
    </div>
  );
};

export default Login;

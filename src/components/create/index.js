import React from "react";
import { Form, Input, Button, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createComplaint } from "../../store/actions/complaint";
import AppTitle from "../title";

const { TextArea } = Input;

const CraeteIncident = () => {
  const history = useHistory();
  const dispatch = useDispatch();

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

  const onFinish = (payload) => {
    console.log("Success:", payload);
    dispatch(createComplaint({ payload, history }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <AppTitle title={"Create Incidents"} />
      <Row>
        <Col span={12} offset={4}>
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
              label="Device Model"
              name="deviceModel"
              rules={[
                {
                  required: true,
                  message: "Please input your deviceModel!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Manufacturer"
              name="manufacturer"
              rules={[
                {
                  required: true,
                  message: "Please input your manufacturer!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Problem Summary"
              name="problemSummary"
              rules={[
                {
                  required: true,
                  message: "Please input your problemSummary!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <TextArea />
            </Form.Item>

            <Form.Item label="Log file" name="logfilePath">
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <div className="app-form-footer">
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button onClick={() => history.goBack()}>Cancel</Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CraeteIncident;

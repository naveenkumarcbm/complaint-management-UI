import { Button, Col, Row, Typography, Form, Select, Card, Input } from "antd";
import { DisplayFields } from "../../config/detail";
import { Routes, StatusMap, StatusOptions } from "../../config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComplaint } from "../../store/actions/complaint";
import { useHistory } from "react-router-dom";
import AppTitle from "../title";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const DisplayField = (props) => {
  return (
    <Col offset={props.offset ?? 0} span={props.span}>
      <Title level={5}>{props.text}</Title>
    </Col>
  );
};

const IncidentDetail = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const dispatch = useDispatch();
  const agentIncident = useSelector(
    ({ complaint }) => complaint.selectedComplaint
  );
  const userIncident = useSelector(({ user }) => user.selectedComplaint);

  const history = useHistory();
  const [isView, setIsView] = useState(true);
  const [incident, setIncident] = useState({});

  useEffect(() => {
    if (agentIncident) setIncident(agentIncident);
    if (userIncident) setIncident(userIncident);
  }, [agentIncident, userIncident]);

  useEffect(() => {
    if (history.location.pathname === Routes.editIncident) {
      setIsView(false);
    }
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    const payload = { ...incident, ...values };
    dispatch(updateComplaint({ payload, history }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const EditForm = () => (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row>
        <Col offset={2} className="app-work-status">
          <Card>
            <Form.Item
              name="status"
              label="Complaint Status"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select status"
                initialValues={incident.status}
                allowClear
              >
                {StatusOptions.map((opt) => (
                  <Option value={opt.value}>{opt.label}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Fix Description"
              name="fixDescription"
              rules={[{ required: true }]}
            >
              <TextArea />
            </Form.Item>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col offset={2}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
        <Col offset={1}>
          <Button onClick={() => history.goBack()}>Cancel</Button>
        </Col>
      </Row>
    </Form>
  );

  return (
    <>
      <AppTitle title={isView ? "View Incident" : "Edit Incident"} />
      {DisplayFields.map((fld) => (
        <Row key={fld.key}>
          <DisplayField offset={2} span={4} text={fld.label} />
          <Col span={1}>:</Col>
          <DisplayField span={8} text={incident[fld.key] ?? " - "} />
        </Row>
      ))}
      <Row>
        <DisplayField offset={2} span={4} text="Status" />
        <Col span={1}>:</Col>
        <DisplayField
          span={8}
          text={StatusMap[incident["status"]] ?? incident["status"]}
        />
      </Row>
      {!isView ? (
        <EditForm />
      ) : (
        <Row>
          <Col offset={12}>
            <Button onClick={() => history.goBack()}>Cancel</Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default IncidentDetail;

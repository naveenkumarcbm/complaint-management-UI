import { Row, Col, Button, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CraeteIncident from "../../components/create";
import AppTable from "../../components/table";
import AppTitle from "../../components/title";
import { Routes } from "../../config";
import { findComplaintById, getUserComplaints } from "../../store/actions/complaint";
import { setUserSelectedComplaint } from "../../store/actions/user";
const { Search } = Input;
const { Title } = Typography;

const Toolbar = () => {
  return (
    <Row>
      <Col span={4} offset={20}>
        <Link to={Routes.createIncident}>
          <Button type="primary">Create Incident</Button>
        </Link>
      </Col>
    </Row>
  );
};

const Incident = () => {
  const complaints = useSelector(({ user }) => user.complaints);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!complaints.length) dispatch(getUserComplaints());
  }, []);

  const onDoubleClick = (rec, idx) => {
    history.push(Routes.viewIncident);
    dispatch(setUserSelectedComplaint(rec));
  };

  const onSearch = (value) => {
    dispatch(findComplaintById(value, history));
  };

  return (
    <div>
      <Toolbar />
      <Row className="app-search">
        <Col span={12} offset={4}>
          <Search
            placeholder="Enter your Complaint Id... "
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            loading={false}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 30 }}>
        <Col offset={2} span={20}>
          <AppTable data={complaints} onDoubleClick={onDoubleClick} />
        </Col>
      </Row>
    </div>
  );
};

export default Incident;

import { Row, Col, Popconfirm, Tabs, message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AppTable from "../../components/table";
import AppTitle from "../../components/title";
import { Routes } from "../../config";
import {
  assignToMe,
  getAllComplaints,
  setSelectedComplaint,
} from "../../store/actions/complaint";
const { TabPane } = Tabs;

const Fixed = ({ rec }) => {
  const dispatch = useDispatch();
  const confirm = () => {
    console.log(rec);
    dispatch(assignToMe(rec));
  };
  return (
    <Popconfirm
      placement="topRight"
      title={"Are you sure to assign this incident to you?"}
      onConfirm={confirm}
      okText="Yes"
      cancelText="No"
    >
      <a>Assign to me</a>
    </Popconfirm>
  );
};

const action = [
  {
    title: "Action",
    dataIndex: "",
    render: (rec) => <Fixed rec={rec} />,
  },
];

const ManageIncidents = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { initList, inProgressList, completedList } = useSelector(
    ({ complaint }) => complaint
  );
  console.log({ initList, inProgressList, completedList });
  useEffect(() => {
    dispatch(getAllComplaints());
  }, []);
  function callback(key) {
    console.log(key);
  }
  const onDoubleClick = (rec, idx) => {
    dispatch(setSelectedComplaint(rec));
    history.push(Routes.editIncident)
  };

  return (
    <>
      <AppTitle title="Manage Incident" />
      <Row>
        <Col offset={2}>
          <Tabs onChange={callback} type="card">
            <TabPane tab="Initiated" key="1">
              <AppTable
                action={action}
                data={initList}
                onDoubleClick={onDoubleClick}
              />
            </TabPane>
            <TabPane tab="In Progress" key="2">
              <AppTable
                action={action}
                data={inProgressList}
                onDoubleClick={onDoubleClick}
              />
            </TabPane>
            <TabPane tab="Fixed" key="3">
              <AppTable
                data={completedList}
                onDoubleClick={onDoubleClick}
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default ManageIncidents;

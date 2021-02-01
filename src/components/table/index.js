import { Table } from "antd";
const Moment = require('moment')

const columns = [
  {
    title: "Complaint Id",
    dataIndex: "_id",
    render: (text, row, index) => <a>{text}</a>,
    onFilter: (value, record) => record._id.indexOf(value) === 0,
    sorter: (a, b) => a._id.length - b._id.length,
  },
  {
    title: "Device Model",
    dataIndex: "deviceModel",
    sorter: (a, b) => a.deviceModel.length - b.deviceModel.length,
  },
  {
    title: "Manufacturer",
    dataIndex: "manufacturer",
    sorter: (a, b) => a.manufacturer - b.manufacturer,
  },
  {
    title: "Problem Summary",
    dataIndex: "problemSummary",
    sorter: (a, b) => a.problemSummary.length - b.problemSummary.length,
  },
  {
    title: "Create By",
    dataIndex: ["createdBy","name"],
  },
  {
    title: "Assigned to",
    dataIndex: ["assignedTo","name"],
  },
  {
    title: "Created Date",
    dataIndex: "dateCreated",
    defaultSortOrder: "descend",
    sorter: (a,b) => new Moment(a.dateCreated).format('YYYYMMDD') - new Moment(b.dateCreated).format('YYYYMMDD')
  }
];

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

const AppTable = ({data=[], action=[], onDoubleClick}) => {

  return <Table 
        columns={[...columns, ...action]}
        dataSource={data} 
        onChange={onChange} 
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: event => onDoubleClick(record, rowIndex)}
        }}
        />;
};

export default AppTable;

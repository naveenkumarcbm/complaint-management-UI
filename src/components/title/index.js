import { Row, Typography } from "antd";
const { Title } = Typography
const AppTitle = ({ title }) => (
  <Row>
    <Title level={2}>{title}</Title>
  </Row>
);

export default AppTitle;

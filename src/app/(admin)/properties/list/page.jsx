
import CatchData from "./component/catchData";
import { Card, CardBody,  Col, Row } from "react-bootstrap";
import Link from "next/link";
import IconifyIcon from "@/components/wrapper/IconifyIcon";

export const metadata = {
  title: 'Properties',
};

export default function FeaturePage({ searchParams }) {

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="page-title-box">
            <h4 className="mb-0">Properties</h4>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="">Basic info</Link>
              </li>
              <div className="mx-1" style={{ height: 24 }}>
                <IconifyIcon icon="bx:chevron-right" height={16} width={16} />
              </div>
              <li className="breadcrumb-item active">List Properties</li>
            </ol>
          </div>
        </Col>
      </Row>
      <Card>
        <CardBody>
          <CatchData/>
        </CardBody>
      </Card>
    </>
  );
}
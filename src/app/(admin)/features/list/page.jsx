
import { getFeatures } from "@/lib/feature/getFeatures";
import DataTableCustom from "./component/dataTableCustom";
import Pagination from "@/components/dataTable/pagination";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "react-bootstrap";
import Link from "next/link";
import IconifyIcon from "@/components/wrapper/IconifyIcon";
export const metadata = {
  title: 'Features'
};
export default async function FeaturePage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 5;
  
  // Fetch data on the server
  const result = await getFeatures(page, limit );
  if (!result.success) {
    return <p>Error: {result.message}</p>;
  }

  const data = result.data.data.map((element, index) => ({
    id: index + 1,
    name_en: element.name_en || "",
    name_ar: element.name_ar || "",
    description_en: element.description_en || "-",
    description_ar: element.description_ar || "-",
    subFeatures: element.subFeatures?.length || "",
    file: element.photo || "",
    addedBy : element.added_by.email || ""
  }));

  const meta = result.data.meta;

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="page-title-box">
            <h4 className="mb-0">Features</h4>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="">Basic info</Link>
              </li>
              <div className="mx-1" style={{ height: 24 }}>
                <IconifyIcon icon="bx:chevron-right" height={16} width={16} />
              </div>
              <li className="breadcrumb-item active">List Features</li>
            </ol>
          </div>
        </Col>
      </Row>
      <Card>
        {/* <CardHeader>
          <CardTitle as={"h5"}>Basic Example</CardTitle>
          <p className="card-subtitle">
            Create and group avatars of different sizes and shapes with Bootstrap&apos;s naming convention.
          </p>
        </CardHeader> */}
        <CardBody>
          <DataTableCustom data={data} />
          {meta && <Pagination meta={meta} />}
        </CardBody>
      </Card>
    </>
  );
}
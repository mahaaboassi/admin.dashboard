// import { getUsers } from "@/lib/user/getUsers";
// import DataTable from "./dataTable";

// // Server-side fetching of users with pagination
// export default async function UserPage({ searchParams }) {
//   const page = searchParams.page || 1; // Default to page 1 if no page is specified
//   const limit = searchParams.limit || 5; // Default to page 1 if no page is specified
//   const result = await getUsers(page,limit);

//   if (!result.success) {
//     return <p>Error: {result.message}</p>;
//   }

//   const data = result.data.data.map((user, index) => ({
//     id: index + 1,
//     name: user.name || "",
//     email: user.email || "",
//     role: user.role || "",
//     country_dial: user.country_dial || "",
//     phone_number: user.phone_number || "",
//     active: user.active || false,
//     file: user.file?.url || "",
//   }));

//   return (
//     <div>
//       <h1>User List (SSR with Pagination)</h1>
//       <DataTable data={data} page={parseInt(page)} />
      
    
//     </div>
//   );
// }

import { getUsers } from "@/lib/user/getUsers";
import DataTableCustom from "./component/dataTableCustom";
import Pagination from "@/components/dataTable/pagination";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "react-bootstrap";
import Link from "next/link";
import IconifyIcon from "@/components/wrapper/IconifyIcon";
export const metadata = {
  title: 'Features'
};
export default async function UserPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 5;
  
  // Fetch data on the server
  const result = await getUsers(page, limit );
  if (!result.success) {
    return <p>Error: {result.message}</p>;
  }

  const data = result.data.data.map((element, index) => ({
    id: index + 1,
    name: element.name || "",
    email: element.email || "",
    role: element.role || "",
    country_dial: element.country_dial || "",
    phone_number: element.phone_number || "",
    active: element.active || false,
    file: element.file?.url || "",
  }));

  const meta = result.data.meta;

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="page-title-box">
            <h4 className="mb-0">Uses</h4>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="">Basic info</Link>
              </li>
              <div className="mx-1" style={{ height: 24 }}>
                <IconifyIcon icon="bx:chevron-right" height={16} width={16} />
              </div>
              <li className="breadcrumb-item active">List Users</li>
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
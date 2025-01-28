
import React from 'react';
import BasicExamples from '../../add/components/BasicExamples';
import IconifyIcon from '@/components/wrapper/IconifyIcon';
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
import { getSubFeatures } from "@/lib/feature/getSubFeatures"
import { getUsers } from "@/lib/user/getUsers"
import { getTypes } from "@/lib/type/getTypes"
export const metadata = {
  title: ' Properties '
};
const EditProperty = async ({searchParams, params}) => {
  const { id } = params
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 100;
    

  // Get Types
  const type = await getTypes(page, limit );
  if (!type.success) {
    return <p>Error: {type.message}</p>;
  }
  

  const data_type = type.data.data

  // Get Users
  const user = await getUsers(page, limit );
  if (!user.success) {
    return <p>Error: {user.message}</p>;
  }

  const data_users = user.data.data


  // Get Sub Features
  const sub_features = await getSubFeatures(page, limit );
  if (!sub_features.success) {
    return <p>Error: {sub_features.message}</p>;
  }

  const data_sub_features = sub_features.data.data

  return <>
      <Row className='pb-4'>
        <Col xs={12}>
          <div className="page-title-box">
            <h4 className="mb-0">Edit Property</h4>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="">Basic Info</Link>
              </li>
              <div className="mx-1" style={{
                  height: 24
                }}>
                <IconifyIcon icon="bx:chevron-right" height={16} width={16} />
              </div>
              <li className="breadcrumb-item active">Edit Property</li>
            </ol>
          </div>
        </Col>
      </Row>
       <BasicExamples id={id} types = {data_type} subFeatures = {data_sub_features } users = { data_users } />
      
    </>;
};
export default EditProperty;
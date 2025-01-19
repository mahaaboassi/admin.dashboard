
import React from 'react';
import BasicExamples from './components/BasicExamples';
import IconifyIcon from '@/components/wrapper/IconifyIcon';
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
export const metadata = {
  title: ' Features '
};
const AddFeature = () => {
  return <>
      <Row className='pb-4'>
        <Col xs={12}>
          <div className="page-title-box">
            <h4 className="mb-0">Add Feature</h4>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="">Basic Info</Link>
              </li>
              <div className="mx-1" style={{
                  height: 24
                }}>
                <IconifyIcon icon="bx:chevron-right" height={16} width={16} />
              </div>
              <li className="breadcrumb-item active">Add Feature</li>
            </ol>
          </div>
        </Col>
      </Row>
       <BasicExamples />
      
    </>;
};
export default AddFeature;
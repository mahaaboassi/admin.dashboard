'use client';

import { Card, Col, FormLabel, FormText, Row } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import useFileUploader from '@/hooks/useFileUploader';
import Link from 'next/link';
// import IconifyIcon from '../wrappers/IconifyIcon'

import IconifyIcon from '../wrapper/IconifyIcon';
import Image from 'next/image';
import { useState } from 'react';
const DropzoneFormInput = ({
  label,
  labelClassName,
  helpText,
  iconProps,
  showPreview,
  className,
  text,
  textClassName,
  onFileUpload,
  isMultiple = true,
}) => {
    const [ selectedFiles, setSelectedFiles] = useState([])

  return <>
      {label && <FormLabel className={labelClassName}>{label}</FormLabel>}

      <Dropzone multiple={isMultiple} onDrop={acceptedFiles => {
        onFileUpload(acceptedFiles)
        acceptedFiles[0].src = "" 
        acceptedFiles[0].preview = acceptedFiles[0]['type'].split('/')[0] === 'image' ? URL.createObjectURL(acceptedFiles[0]) : null
        
        if(isMultiple){
            setSelectedFiles(prev=>[...prev, acceptedFiles[0]])
        }else{
            setSelectedFiles(acceptedFiles)
        }
      }}
      maxFiles={isMultiple ? 5 : 1}>
        {({
        getRootProps,
        getInputProps
      }) => <>
            <div className={`dropzone dropzone-custom ${className}`}>
              <div className="dz-message" {...getRootProps()}>
                <input {...getInputProps()} />
                <IconifyIcon icon={iconProps?.icon ?? 'bx:cloud-upload'} {...iconProps} />
                <h3 className={textClassName}>{text}</h3>
                {helpText && typeof helpText === 'string' ? <FormText>{helpText}</FormText> : helpText}
              </div>
            </div>
            {showPreview && selectedFiles.length > 0 && <div className="dz-preview mt-3">
                {(selectedFiles || []).map((file, idx) => {

                  
            const ext = file.name.substr(file.name.lastIndexOf('.') + 1);
            return <Card className="mt-1 mb-0 shadow-none border" key={idx + '-file'}>
                      <div className="p-2">
                        <Row className="align-items-center">
                          {file.preview ? <Col xs={'auto'}>
                              <Image height={60} width={50} data-dz-thumbnail="" className="avatar-sm object-fit-cover rounded bg-light" alt={file.name} src={file.src == "" ? file.preview : file.src} />
                            </Col> : <Col xs={'auto'}>
                              <div className="avatar-sm">
                                <span className="avatar-title bg-primary rounded">{ext.toUpperCase()}</span>
                              </div>
                            </Col>}
                          <Col className="ps-0">
                            <Link href="" className="text-muted fw-bold">
                              {file.name}
                            </Link>
                            <p className="mb-0">
                              <strong>{file.formattedSize}</strong>
                            </p>
                          </Col>
                          <Col className="text-end">
                            <Link href="" className="btn btn-link btn-lg text-muted shadow-none">
                              <div className="flex-shrink-0 ms-3">
                                <button data-dz-remove className="btn btn-sm btn-primary" onClick={() => removeFile(file)}>
                                  Delete
                                </button>
                              </div>
                            </Link>
                          </Col>
                        </Row>
                      </div>
                    </Card>;
          })}
              </div>}
          </>}
      </Dropzone>
    </>;
};
export default DropzoneFormInput;
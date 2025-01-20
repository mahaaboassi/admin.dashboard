'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Row,Card, CardBody, CardHeader, CardTitle, Col,Button,  Form, FormCheck, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import DropzoneFormInput from '@/components/dropZone/DropzoneFormInput';
import { addFeature } from "@/lib/feature/addFeatures"


const BasicExamples = () => {
  const [error, setError] = useState(null);
  const route = useRouter()
  const [values, setValues]= useState({
    name_en : "",
    name_ar : "",
    description_ar :``,
    description_en : ``,
    file : ""
  })
  const [loading , setLoading] = useState(false)
  const handleChange = (key, value) =>{
      setValues(prev=>({...prev,[key]:value}))
  }
  const [validated, setValidated] = useState(false);
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    // if (form.checkValidity() === false) {
      
      event.preventDefault();
      event.stopPropagation();
    // }
    console.log(values);
    setValidated(true);
    if(values.name_ar != "" && values.name_en != "" && values.file != ""){
          setLoading(true);
          setError(null);
          const formData = new FormData();
          formData.append("name_en", values.name_en);
          formData.append("name_ar", values.name_ar);
          formData.append("description_en", values.description_en);
          formData.append("description_ar", values.description_ar);
          formData.append("photo", values.file); // Send file properly
          try {
            const result = await addFeature(formData)
            console.log(result);
            
            if(result && result.success){
                route.push("/feature/list")
            } else{
              setError(result.message)
            }
           
          } catch (error) {
            console.log("client side error" , error);
            
          } finally {
            setLoading(false)
          }
    }else{
      setError("Names Feilds and  file Feild are required !")
    }
    
    
  };
  const modules = {
    toolbar: [[{
      font: []
    }, {
      size: []
    }], ['bold', 'italic', 'underline', 'strike'], [{
      color: []
    }, {
      background: []
    }], [{
      script: 'super'
    }, {
      script: 'sub'
    }], [{
      header: [false, 1, 2, 3, 4, 5, 6]
    }, 'blockquote', 'code-block'], [{
      list: 'ordered'
    }, {
      list: 'bullet'
    }, {
      indent: '-1'
    }, {
      indent: '+1'
    }], ['direction', {
      align: []
    }], ['link', 'image', 'video'], ['clean']]
  };

    
  return  <Form className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className=" row-cols-lg-2 gx-3">
        <Col>
          <Card>
            <CardHeader>
              <CardTitle as={'h5'}>English Information</CardTitle>
              <p className="card-subtitle">
                Please insert English Information to Feature.
              </p>
            </CardHeader>
            <CardBody>
              <div className="mb-3">
                  <FormGroup className="">
                    <FormLabel>Name</FormLabel>
                    <FormControl value={values.name_en} onChange={(e)=>handleChange("name_en",e.target.value)} type="text" id="validationCustom01" placeholder="Name"  required />
                    <Feedback>Looks good!</Feedback>
                  </FormGroup>
                
              </div>
              <div>
                  <Card >
                    <CardHeader>
                      <CardTitle as={'h5'}>Decription</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="mb-3">
                        <ReactQuill  id="snow-editor" placeholder="Write something here..."  style={{
                           minHeight: 300,
                           maxHeight : 300,
                           overflowY: "auto"
                      }} onChange={(e)=>handleChange("description_en",e)}  modules={modules} defaultValue={values.description_en}  theme="snow" />
                      </div>
                    </CardBody>
                  </Card>
              </div>
            </CardBody>
          </Card>
        
        </Col>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle as={'h5'}>Arabic Information</CardTitle>
              <p className="card-subtitle">
                Please insert Arabic Information to Feature.
              </p>
            </CardHeader>
            <CardBody>
              <div className="mb-3">
                  <FormGroup className="">
                    <FormLabel>Name</FormLabel>
                    <FormControl value={values.name_ar} onChange={(e)=>handleChange("name_ar",e.target.value)} type="text" id="validationCustom01" placeholder="Name"  required />
                    <Feedback>Looks good!</Feedback>
                  </FormGroup>
                  
              </div>
              <div>
                <Card  >
                  <CardHeader>
                    <CardTitle as={'h5'}>Decription</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3">
                      <ReactQuill placeholder="Write something here..."  style={{
                        minHeight: 300,
                        maxHeight : 300,
                        overflowY: "auto"
                      }} onChange={(e)=>handleChange("description_ar",e)} id="snow-editor" modules={modules} defaultValue={values.description_ar} theme="snow" />
                    </div>
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        
        </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <CardTitle as={'h4'}>File Upload</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="mb-3">
                  <DropzoneFormInput onFileUpload={(res)=>{
                    setValues(prev=>({...prev,file:res[0]}))
                  }} isMultiple={false} className="mb-10" iconProps={{
                  icon: 'bx:cloud-upload',
                  height: 36,
                  width: 36
                }} text="Drop files here or click to upload. " helpText={<span className="text-muted fs-13">
                        (This is just a demo dropzone. Selected files are
                        <strong>not</strong> actually uploaded.)
                      </span>} showPreview />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center text-align-center'>
              {error && (
                    <div className={`${"text-danger"} border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4`}>
                      {error}
                    </div>
                  )}
        </Row>
        
        <Row className='d-flex justify-content-center '>
                
              <Button disabled={loading} className='w-50' variant="primary" type="submit">
                {loading ? "Loading" : "Submit Form"}
              </Button>
        </Row>
     </Form>
        
 ;
};
export default BasicExamples;
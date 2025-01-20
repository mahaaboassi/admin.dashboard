'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Row,Card, CardBody, CardHeader, CardTitle, Col,Button,  Form, FormCheck, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import  DropzoneFormInput from '@/components/dropZone/DropzoneFormInput';
import { addProperties } from "@/lib/property/addProperties"



const BasicExamples = ({types, users , subFeatures}) => {
  const bufferToString = (buffer) => {
    return new TextDecoder().decode(new Uint8Array(buffer));
};  
  const [error, setError] = useState(null);
  const route = useRouter()
  const [values, setValues]= useState({
    name_en : "",
    name_ar : "",
    description_ar :``,
    description_en : ``,
    type : null,
    owner : null,
    furnishing : undefined,
    ready : undefined,
    bathrooms : undefined,
    bedrooms : undefined,
    beds : undefined,
    guests : undefined,
    city : "",
    region : "",
    street : "",
    floor : "",
    building : "",
    files : [] ,
    features : [ {
      id : "",
      subFeatures : []
    }],
    link_map : "",
    registration_number : ""
  })
  const [temp, setTemp] = useState([])
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
    const validationNumberPositive = (value) => {
      return /^[0-9]*$/.test(value) ; // Ensures the value consists of only positive numbers (including zero)
    };
    
     // Feature field validation (check if 'type' is selected)
     if (!values.type) {
        setError("The Type field is required! Please select a Type.");
        return;  // Exit the function if validation fails
    }
    if (!values.type) {
        setError("The Type field is required! Please select a Type.");
        return;  // Exit the function if validation fails
    }
    setValidated(true);
    if(values.name_ar != "" && values.name_en != ""){
      if(values.owner  && values.type){
        if(validationNumberPositive(values.bathrooms) && validationNumberPositive(values.bedrooms) && validationNumberPositive(values.beds) && validationNumberPositive(values.guests)){
            if(values.city != "" && values.region !="" && values.street != '' && values.link_map != "" && values.building != "" && values.floor != ''){
                if(values.registration_number != ""){
                    if(values.files.length>0){
                      setLoading(true);
                      setError(null);
                      const formData = new FormData()
                      
                      formData.append("name_en", values.name_en);
                      formData.append("name_ar", values.name_ar);
                      formData.append("description_en", values.description_en);
                      formData.append("description_ar", values.description_ar);
                      formData.append("owner", values.owner);
                      formData.append("type", values.type);
                      formData.append("ready", values.ready ? values.ready : "0");
                      formData.append("furnishing", values.furnishing ? values.furnishing : "0");
                      formData.append("bathrooms", values.bathrooms);
                      formData.append("bedrooms", values.bedrooms);
                      formData.append("beds", values.beds);
                      formData.append("guests", values.guests);
                      formData.append("city", values.city);
                      formData.append("region", values.region);
                      formData.append("building", values.building);
                      formData.append("street", values.street);
                      formData.append("floor", values.floor);
                      formData.append("link_map", values.link_map);
                      formData.append("registration_number", values.registration_number);
                      values.files.forEach((ele)=>{
                        formData.append("files", ele); // Send file properly
                      })
                     
                     const finalFeauterstoSend = []
                     const parents = []
                     temp.forEach(ele=>{
                      parents.push(ele.parent._id)
                      
                     })
                     
                     const realParents = [...new Set(parents)]
                     realParents.forEach(ele=>{
                      finalFeauterstoSend.push({
                        id :ele,
                        subFeatures:[]
                      })
                     })
                    //  return
                     temp.forEach(ele=>{
                        finalFeauterstoSend.forEach((pa,index)=>{
                          if(ele.parent._id == pa.id){
                            finalFeauterstoSend[index].subFeatures.push(ele._id)
                          }
                        })
                     })
                     
                     finalFeauterstoSend.forEach((parent,index)=>{
                      formData.append(`features[${index}][id]`, parent.id); // Send file properly
                      parent.subFeatures.forEach((child,i)=>{
                        formData.append(`features[${index}][subFeatures][${i}]`, child); // Send file properly
                      })
                    })
                      try {
                        const result = await addProperties(formData)
                        console.log(result);
                        
                        if(result && result.success){
                            route.push("/properties/list")
                        } else{
                          setError(result.message)
                        }
                       
                      } catch (error) {
                        console.log("client side error" , error);
                        
                      } finally {
                        setLoading(false)
                      }
                    }else{
                      setError("File Field is required !")
                    }
                }else{
                  setError("Registeration number Field is required !")
                }
            }else{
              setError("City, Region, Street, Building, Link Map and Floor Fields are required !")
            }
        }else{
          setError("Invalid input: Bathrooms, Bedrooms, Beds, and Guests fields must be positive numbers.")
        }

      }else{
        setError("Owner and Type Fields are required !")
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
  const handleSelectSubFeauters =(value)=>{
    const tempValue = subFeatures.find(ele => ele._id == value)
    const existValue = temp.find(ele=> ele._id == value)
    if(!existValue)
       setTemp(prev=>[...prev,tempValue])
    
  }
    
  return  <Form className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="row-cols-sm-1 row-cols-md-1 row-cols-lg-2 gx-3">
        <Col>
          <Card>
            <CardHeader>
              <CardTitle as={'h5'}>English Information</CardTitle>
              <p className="card-subtitle">
                Please insert English Information.
              </p>
            </CardHeader>
            <CardBody>
              <div className="mb-3">
                  <FormGroup className="">
                    <FormLabel>Name</FormLabel>
                    <FormControl value={values.name_en} onChange={(e)=>handleChange("name_en",e.target.value)} type="text" id="validationCustom01" placeholder="Name"  required />
                    <Feedback type="invalid">Name is required.</Feedback>
                    <Feedback>Looks good!</Feedback>
                  </FormGroup>
                
              </div>
              <div>
                  <Card >
                    <CardHeader>
                      <CardTitle as={'h5'}>Description</CardTitle>
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
                Please insert Arabic Information.
              </p>
            </CardHeader>
            <CardBody>
              <div className="mb-3">
                  <FormGroup className="">
                    <FormLabel>Name</FormLabel>
                    <FormControl value={values.name_ar} onChange={(e)=>handleChange("name_ar",e.target.value)} type="text" id="validationCustom01" placeholder="Name"  required />
                    <Feedback type="invalid">Name is required.</Feedback> 
                    <Feedback>Looks good!</Feedback>
                  </FormGroup>
                  
              </div>
              <div>
                <Card  >
                  <CardHeader>
                    <CardTitle as={'h5'}>Description</CardTitle>
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

      {/* Basic & Location Information */}
      <Row className="row-cols-sm-1 row-cols-md-1 row-cols-lg-2 gx-3">
        <Col>
          <Card>
            <CardHeader>
              <CardTitle as={'h5'}>Basic Information </CardTitle>
              <p className="card-subtitle">
                Please insert Basic Information .
              </p>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>Type</FormLabel>
                      <select value={values.type} onChange={(e)=>{setValues(prev=>({...prev,type:e.target.value}))
                      }} className="form-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" required>
                        <option selected disabled>
                          Choose...
                        </option>
                        {types.map(ele=>(<option key={`Types_${ele.name_en}`} value={ele._id}>{ele.name_en}</option>))}

                      </select>
                      <Feedback>Looks good!</Feedback>
                    </FormGroup>
                  
                </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>Owner</FormLabel>
                      <select value={values.owner} onChange={(e)=>{setValues(prev=>({...prev,owner:e.target.value}))
                      }} className="form-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" required>
                        <option selected disabled>
                          Choose...
                        </option>
                        {users.map(ele=>(<option key={`Users_${ele.name}`} value={ele._id}>{ele.name}</option>))}

                      </select>
                      <Feedback>Looks good!</Feedback>
                    </FormGroup>
                  
                </div>
                </Col>

              </Row>
              <Row>
                <Col>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>Guests</FormLabel>
                      <FormControl value={parseInt(values.guests)} onChange={(e)=>handleChange("guests",e.target.value)} type="number" id="validationCustom01" placeholder="Guests"  required />
                      <Feedback>Looks good!</Feedback>
                    </FormGroup>
                  
                </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl value={parseInt(values.bathrooms)} onChange={(e)=>handleChange("bathrooms",e.target.value)} type="number" id="validationCustom01" placeholder="Bathrooms"  required />
                      <Feedback>Looks good!</Feedback>
                    </FormGroup>
                  
                </div>
                </Col>

              </Row>
              <Row>
                <Col>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl value={parseInt(values.bedrooms)} onChange={(e)=>handleChange("bedrooms",e.target.value)} type="number" id="validationCustom01" placeholder="Bedrooms"  required />
                      <Feedback>Looks good!</Feedback>
                    </FormGroup>
                  
                </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>Beds</FormLabel>
                      <FormControl value={parseInt(values.beds)} onChange={(e)=>handleChange("beds",e.target.value)} type="number" id="validationCustom01" placeholder="Beds"  required />
                      <Feedback>Looks good!</Feedback>
                    </FormGroup>
                  
                </div>
                </Col>

              </Row>
              <Row>
                <Col>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>Furnishing</FormLabel>
                      <select value={values.furnishing} onChange={(e)=>{setValues(prev=>({...prev,furnishing:e.target.value}))
                      }} className="form-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" required>
                        <option selected disabled>
                          Choose...
                        </option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                     
                      <Feedback>Looks good!</Feedback>
                    </FormGroup>
                  
                </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>ready</FormLabel>
                      <select value={values.ready} onChange={(e)=>{setValues(prev=>({...prev,ready:e.target.value}))
                      }} className="form-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" required>
                        <option selected disabled>
                          Choose...
                        </option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                      <Feedback>Looks good!</Feedback>
                    </FormGroup>
                  
                </div>
                </Col>

              </Row>
              <Row>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>Registeration Number</FormLabel>
                      <FormControl value={values.registration_number} onChange={(e)=>handleChange("registration_number",e.target.value)} type="text" id="validationCustom01" placeholder="Registeration Number<"  required />
                      <Feedback>Looks good!</Feedback>
                    </FormGroup>
                  
                </div>
          

              </Row>
            </CardBody>
          </Card>
        
        </Col>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle as={'h5'}>Location Information</CardTitle>
              <p className="card-subtitle">
                Please insert Loaction Information.
              </p>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>City</FormLabel>
                      <FormControl value={values.city} onChange={(e)=>handleChange("city",e.target.value)} type="text" id="validationCustom01" placeholder="City"  required />
                      <Feedback>Looks good!</Feedback>
                    </FormGroup>
                  
                </div>
                </Col>
                <Col>
                  <div className="mb-3">
                      <FormGroup className="">
                        <FormLabel>Region</FormLabel>
                        <FormControl value={values.region} onChange={(e)=>handleChange("region",e.target.value)} type="text" id="validationCustom01" placeholder="Region"  required />
                        <Feedback>Looks good!</Feedback>
                      </FormGroup>
                    
                  </div>
                </Col>

              </Row>
              <Row>
                <Col>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>Street</FormLabel>
                      <FormControl value={values.street} onChange={(e)=>handleChange("street",e.target.value)} type="text" id="validationCustom01" placeholder="Street"  required />
                      <Feedback>Looks good!</Feedback>
                    </FormGroup>
                  
                </div>
                </Col>
                <Col>
                  <div className="mb-3">
                      <FormGroup className="">
                        <FormLabel>Building</FormLabel>
                        <FormControl value={values.building} onChange={(e)=>handleChange("building",e.target.value)} type="text" id="validationCustom01" placeholder="Building"  required />
                        <Feedback>Looks good!</Feedback>
                      </FormGroup>
                    
                  </div>
                </Col>

              </Row>
              <Row>
                <Col>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>Floor</FormLabel>
                      <FormControl value={values.floor} onChange={(e)=>handleChange("floor",e.target.value)} type="text" id="validationCustom01" placeholder="Floor"  required />
                      <Feedback>Looks good!</Feedback>
                    </FormGroup>
                  
                </div>
                </Col>
                <Col>
                  <div className="mb-3">
                      <FormGroup className="">
                        <FormLabel>Link Map</FormLabel>
                        <FormControl value={values.link_map} onChange={(e)=>handleChange("link_map",e.target.value)} type="text" id="validationCustom01" placeholder="https://link_map"  required />
                        <Feedback>Looks good!</Feedback>
                      </FormGroup>
                    
                  </div>
                </Col>

              </Row>
            </CardBody>
          </Card>
        
        </Col>
      </Row>
      {/* Feature Information */}
      <Row className="">
      <Card>
            <CardHeader>
              <CardTitle as={'h5'}>Features Information </CardTitle>
              <p className="card-subtitle">
                Please add Features For Property .
              </p>
            </CardHeader>
            <CardBody>
              <Row  style={{minHeight:"200px"}} className="row-cols-sm-1 row-cols-md-1 row-cols-lg-2 gx-3">
                <Col>
                  <div className="mb-3">
                    <FormGroup className="">
                      <FormLabel>Features</FormLabel>
                      <select  onChange={(e)=>handleSelectSubFeauters(e.target.value)} 
                      className="form-select" id="validationServer04" aria-describedby="validationServer04Feedback" >
                        <option value="" selected disabled>
                          Choose...
                        </option>
                        {subFeatures.map(ele=>(<option className='d-flex' key={`SubFeatures${ele.name_en}`} value={ele._id}>
                          <div dangerouslySetInnerHTML={{ __html: bufferToString(ele.icon.data)}} />{ele.name_en} / {ele.parent?.name_en}
                          </option>))}

                      </select>
                      {/* <Feedback>Looks good!</Feedback> */}
                    </FormGroup>
                  
                </div>
                </Col>
                <Col>
                  <div className="mb-3">
                   <ul style={{margin:"0",padding:"0"}}>
                    {temp.length >0 ? temp.map((ele,index)=>(<li className='d-flex align-items-center mb-1 justify-content-between ' key={`Temp_${ele.name_en}_12`}>
                      <div className='d-flex align-items-center gap-2'>
                        <div dangerouslySetInnerHTML={{ __html: bufferToString(ele.icon.data)}} />
                        <div>
                        {ele.name_en } / {ele.parent.name_en}
                        </div>
                      </div>
                      <div>
                        <button onClick={()=>setTemp(temp.filter((e,i)=> i != index))} type="button" className="btn btn-secondary btn-sm">
                            Delete
                          </button>
                      </div>
                    </li>))
                    :<p>No Feauters here yet .</p>}
                       
                   </ul>
                  
                </div>
                </Col>

              </Row>

            </CardBody>
          </Card>

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
                  
                  setValues(prev=>({...prev,files:[...prev.files,res[0]]}))
                }} isMultiple={true} className="mb-10" iconProps={{
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
                  <div className={`${"text-danger"} d-flex justify-content-center border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4`}>
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
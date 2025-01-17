"use client"; // Ensure this runs on the client side
import { submitSignIn } from "@/lib/auth/action"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFormInput from '@/components/from/TextFormInput';
import Image from 'next/image';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import DarkLogo from '@/assets/images/foreshore-images/logo_main.webp';
import LightLogo from '@/assets/images/foreshore-images/logo_light.webp';
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const route = useRouter()
  // Validation schema
  const messageSchema = yup.object({
    email: yup.string().email().required('Please enter Email'),
    password: yup.string().required('Please enter password'),
  });

  const { handleSubmit, control } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(messageSchema),
  });

  const handleLogin = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await submitSignIn(data)
      console.log(result);
      
      if(result && result.success){
          route.push("/dashboards")
      } else{
        setError(result.message)
      }
     
    } catch (error) {
      console.log("client side error" , error);
      
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <div className="account-pages py-5">
        <div className="container">
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <Card className="border-0 shadow-lg">
                <CardBody className="p-5">
                  <div className="text-center">
                    <div className="mx-auto mb-4 text-center auth-logo">
                      <a href="/" className="logo-dark">
                        <Image src={DarkLogo} height={50} alt="logo dark" />
                      </a>
                      <a href="/" className="logo-light">
                        <Image src={LightLogo} height={50} alt="logo light" />
                      </a>
                    </div>
                    <h4 className="fw-bold text-dark mb-2">Welcome Back!</h4>
                    <p className="text-muted">Sign in to your account to continue</p>
                  </div>

                  {error && (
                    <div className={`${"text-danger"} border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4`}>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(handleLogin)} className="mt-4">
                    <div className="mb-3">
                      <TextFormInput
                        control={control}
                        name="email"
                        placeholder="Enter your email"
                        className="form-control"
                        label="Email Address"
                      />
                    </div>
                    <div className="mb-3">
                      <TextFormInput
                        control={control}
                        name="password"
                        placeholder="Enter your password"
                        className="form-control"
                        label="Password"
                      />
                    </div>

                    <div className="form-check mb-3">
                      <input type="checkbox" className="form-check-input" id="remember-me" />
                      <label className="form-check-label" htmlFor="remember-me">
                        Remember me
                      </label>
                    </div>

                    <div className="d-grid">
                      <button disabled={loading} className="btn btn-dark btn-lg fw-medium" type="submit">
                        {loading ? 'Loading...' : 'Sign In'}
                      </button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
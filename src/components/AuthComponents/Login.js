import './auth.css'
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className='d-flex w-50 mx-auto flex-column align-items-center mt-4'>
      <Formik
        initialValues={{ userName: '', email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.password) {
            errors.password = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post('http://localhost:4000/login', values)
            toast.success(response.data.message)
            navigate('/')
          } catch (error) {
            toast.error(error.response.data.message)
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          /* and other goodies */
        }) => (
          <div className="form-box">
            <form onSubmit={handleSubmit} className='form'>
              <h1 className='text-info'>Sign In</h1>
              <span className="subtitle">Login to your account with your email and password.</span>
              <div className="form-container">
                <input
                  type="email"
                  className={`input ${errors.email && touched.email && 'border border-danger'} `}
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email} />
                {errors.email && touched.email && <span className='text-danger px-4 py-2'>{errors.email}</span>}
                <input
                  type="password"
                  name="password"
                  className={`input ${errors.password && touched.password && 'border border-danger'} `}
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password} />
                {errors.password && touched.password && <span className='text-danger  px-4 py-2'> {errors.password}</span>}
              </div>
              <button type='submit'>Sign in</button>
            </form>
            <div className="form-section">
              <span>Don't have an account? <Link className='text-primary' to="/register">Register</Link> </span>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default Login
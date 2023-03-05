import './auth.css'
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate()
  return (
    <div className='d-flex w-50 mx-auto flex-column align-items-center mt-4'>
      <Formik
        initialValues={{ userName: '', email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.userName) {
            errors.userName = 'Username is equired';
          }
          if (!values.password) {
            errors.password = 'Password is required';
          }
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post('http://localhost:4000/register', values)
            navigate('/login')
            toast.success(response.data.message)
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
          isSubmitting,
          /* and other goodies */
        }) => (
          <div className="form-box">
            <form onSubmit={handleSubmit} className='form'>
              <h1 className='text-info'>Sign up</h1>
              <span className="subtitle">Create a free account with your email.</span>
              <div className="form-container">
                <input
                  type="text"
                  className={`input ${errors.userName && touched.userName && 'border border-danger'} `}
                  name="userName"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName} />
                {errors.userName && touched.userName && <span className='text-danger px-4 py-2'>{errors.userName}</span>}
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
              <button type='submit'>Sign up</button>
            </form>
            <div className="form-section">
              <p>Have an account? <Link className='text-primary' to="/login">Login</Link></p>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default Register
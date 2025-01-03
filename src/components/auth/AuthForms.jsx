import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

interface FormData {
  email: string;
  password: string;
  name?: string;
}

const AuthForms: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required').trim(),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').trim(),
    name: isLogin ? Yup.string().notRequired() : Yup.string().required('Name is required').trim() ,
  });

  const initialValues: FormData = {
    email: '',
    password: '',
    name: '',
  };


  const onSubmit = async (values: FormData, { setSubmitting, resetForm }) => {
    setLoading(true);
    setApiError(null);
    const sanitizedValues = {
        email: values.email.trim(),
        password: values.password.trim(),
        ...(values.name ? { name: values.name.trim() } : {}),
      };

    try {
      if (isLogin) {
          await login(sanitizedValues);
      } else {
        await register(sanitizedValues);
      }
      resetForm();
    } catch (error: any) {
        setApiError(error.message || 'Authentication failed.');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    formik.resetForm();
    setApiError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h2>
          {!isLogin && (
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name}
          />
         )}
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
        />
        {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
        <Button type="submit" onClick={formik.handleSubmit} className="w-full mt-4" disabled={loading} >
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
        </Button>
        <div className="mt-4 text-center">
          <button type="button" onClick={toggleAuthMode} className="text-blue-500 hover:underline">
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await login(values);
      toast.success('Welcome back.');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-12">
      <section className="w-full rounded-md border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-bold text-ink">Login</h1>
        <p className="mt-2 text-sm text-slate-600">Continue to your resume dashboard.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            type="email"
            error={errors.email}
            registration={register('email', { required: 'Email is required' })}
          />
          <FormInput
            label="Password"
            type="password"
            error={errors.password}
            registration={register('password', { required: 'Password is required' })}
          />
          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Login
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">
          New here?{' '}
          <Link to="/signup" className="font-semibold text-ocean">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}


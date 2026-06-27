import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useAuth } from '../hooks/useAuth';

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await signup(values);
      toast.success('Account created.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Signup failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-12">
      <section className="w-full rounded-md border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-bold text-ink">Create account</h1>
        <p className="mt-2 text-sm text-slate-600">Start analyzing resumes in under a minute.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Name"
            error={errors.name}
            registration={register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />
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
            registration={register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            })}
          />
          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Sign up
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-ocean">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}


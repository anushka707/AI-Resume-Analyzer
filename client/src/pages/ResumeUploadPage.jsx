import { UploadCloud } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import { uploadResume } from '../services/resumeService';

export default function ResumeUploadPage() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error('Choose a PDF resume first.');
      return;
    }
    setIsUploading(true);
    try {
      const resume = await uploadResume(file);
      toast.success('Resume analyzed.');
      navigate(`/dashboard/resume/${resume.id}`);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-ink">Upload resume</h1>
      <p className="mt-2 text-slate-600">Upload a PDF resume to extract text and generate ATS feedback.</p>
      <form onSubmit={handleSubmit} className="mt-6 rounded-md border border-slate-200 bg-white p-6 shadow-soft">
        <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 bg-slate-50 px-4 text-center transition hover:border-ocean">
          <UploadCloud className="text-ocean" size={42} />
          <span className="mt-4 text-base font-semibold text-ink">
            {file ? file.name : 'Select a PDF resume'}
          </span>
          <span className="mt-1 text-sm text-slate-500">PDF files only</span>
          <input
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
        </label>
        <Button type="submit" className="mt-5 w-full sm:w-auto" isLoading={isUploading}>
          Analyze resume
        </Button>
      </form>
    </section>
  );
}


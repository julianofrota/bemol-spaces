import React from 'react';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 space-y-8">
        <div className="text-center">
          <img
            src="/lovable-uploads/976fd8bd-8c22-4237-9751-2f1e53020e6a.png"
            alt="Bemol Spaces"
            className="h-12 mx-auto"
          />
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
} 
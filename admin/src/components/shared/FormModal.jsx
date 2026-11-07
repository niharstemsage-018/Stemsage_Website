import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2 } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  schema,
  defaultValues = {},
  fields = [],
  isSubmitting = false,
  submitLabel = 'Save',
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  const watchedFiles = watch('images') || [];

  const handleSubmitForm = (data) => {
    if (onSubmit) onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="p-6 space-y-6">
          {fields.map((field) => {
            const { name, label, type = 'text', required = false, placeholder, options, render, description } = field;
            const error = errors[name];

            if (render) {
              return (
                <div key={name} className="space-y-1.5">
                  {render({ control, register, watch, setValue, error })}
                </div>
              );
            }

            if (type === 'textarea') {
              return (
                <div key={name} className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    {...register(name)}
                    placeholder={placeholder}
                    rows={4}
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      error ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  />
                  {error && <p className="text-sm text-red-500">{error.message}</p>}
                  {description && !error && <p className="text-sm text-slate-500">{description}</p>}
                </div>
              );
            }

            if (type === 'select') {
              return (
                <div key={name} className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    {...register(name)}
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      error ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <option value="">Select...</option>
                    {options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {error && <p className="text-sm text-red-500">{error.message}</p>}
                </div>
              );
            }

            if (type === 'checkbox') {
              return (
                <div key={name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register(name)}
                    className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <label className="text-sm font-medium text-slate-700 cursor-pointer">{label}</label>
                  {error && <p className="text-sm text-red-500">{error.message}</p>}
                </div>
              );
            }

            if (type === 'number') {
              return (
                <div key={name} className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    {...register(name, { valueAsNumber: true })}
                    placeholder={placeholder}
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      error ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  />
                  {error && <p className="text-sm text-red-500">{error.message}</p>}
                </div>
              );
            }

            if (type === 'images') {
              return (
                <div key={name} className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  <ImageUploader
                    name={name}
                    control={control}
                    error={error}
                    required={required}
                    multiple={true}
                    maxFiles={5}
                  />
                </div>
              );
            }

            if (type === 'image') {
              return (
                <div key={name} className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  <ImageUploader
                    name={name}
                    control={control}
                    error={error}
                    required={required}
                    multiple={false}
                  />
                </div>
              );
            }

            if (type === 'gif') {
              return (
                <div key={name} className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  <ImageUploader
                    name={name}
                    control={control}
                    error={error}
                    required={required}
                    multiple={false}
                    accept="image/gif"
                  />
                </div>
              );
            }

            return (
              <div key={name} className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  {label}
                  {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={type}
                  {...register(name)}
                  placeholder={placeholder}
                  className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    error ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
                {error && <p className="text-sm text-red-500">{error.message}</p>}
              </div>
            );
          })}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export default function ImageUploader({
  name,
  control,
  error,
  required = false,
  multiple = false,
  maxFiles = 5,
  accept = ALLOWED_TYPES.join(','),
}) {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFiles = (files) => {
    const validFiles = [];
    const newPreviews = [];

    for (const file of files) {
      if (!accept.split(',').includes(file.type)) {
        alert(`${file.name}: Invalid file type. Allowed: JPG, PNG, WebP, GIF`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name}: File size exceeds 5MB limit`);
        continue;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    if (multiple) {
      const current = control.getValues(name) || [];
      if (current.length + validFiles.length > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        validFiles.forEach((_, i) => URL.revokeObjectURL(newPreviews[i]));
        return;
      }
      control.setValue(name, [...current, ...validFiles], { shouldValidate: true });
      setPreviews((prev) => [...prev, ...newPreviews]);
    } else {
      control.setValue(name, validFiles[0], { shouldValidate: true });
      setPreviews([newPreviews[0]]);
    }
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const removeFile = (index) => {
    const current = control.getValues(name) || [];
    const newFiles = multiple
      ? current.filter((_, i) => i !== index)
      : null;

    control.setValue(name, newFiles, { shouldValidate: true });

    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="flex flex-col items-start justify-center w-full min-h-[120px] border-2 border-dashed rounded-xl p-6 text-center transition-colors hover:border-red-400 hover:bg-red-50 cursor-pointer group relative" htmlFor={`${name}-input`}>
        <input
          id={`${name}-input`}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={uploading}
        />
        <div className="flex flex-col items-center gap-2 relative z-10">
          <Upload className="h-8 w-8 text-slate-400 group-hover:text-red-500 transition-colors" />
          <p className="text-sm font-medium text-slate-600 group-hover:text-red-600">
            {multiple ? 'Click or drag to upload images' : 'Click or drag to upload image'}
          </p>
          <p className="text-xs text-slate-400">Max 5MB per file. {multiple ? `Max ${maxFiles} files.` : ''}</p>
        </div>
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {previews.map((preview, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-50 group">
              <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 p-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
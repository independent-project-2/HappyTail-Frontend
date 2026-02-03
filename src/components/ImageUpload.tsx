import { useRef, useState } from "react";
import type { DragEvent, ChangeEvent } from "react";

type ImageUploadProps = {
  onFileSelect: (file: File) => void;
};

const ImageUpload = ({ onFileSelect }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    // ⭐ send file to parent
    onFileSelect(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      className={`relative flex cursor-pointer items-center justify-center rounded-xl transition size-32
        ${isDragging ? "bg-blue-50" : "bg-gray-50"}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {image ? (
        <img
          src={image}
          alt="Preview"
          className="h-full w-full rounded-xl object-cover"
        />
      ) : (
        <div className="text-center text-gray-500">
          <p className="text-sm">Drag & drop</p>
          <p className="text-xs">or click</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

import { Upload } from "lucide-react";

interface ThumbnailUploadProps {
  onUpload: (file: File) => void;
}

const ThumbnailUpload = ({ onUpload }: ThumbnailUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-900 mb-3">
        Add Thumbnail Photo
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="thumbnail-upload"
        />
        <label
          htmlFor="thumbnail-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
            <Upload className="w-6 h-6 text-emerald-500" />
          </div>
          <button
            type="button"
            className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium mb-2"
            onClick={() => document.getElementById("thumbnail-upload")?.click()}
          >
            Upload
          </button>
          <p className="text-sm text-gray-600">
            Drop your images here, or click to browse
          </p>
          <p className="text-xs text-gray-400 mt-1">
            1600 x 1200 (4:3) recommended, PNG, JPG and GIF files are allowed
          </p>
        </label>
      </div>
    </div>
  );
};

export default ThumbnailUpload;

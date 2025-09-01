import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/NavBar';

function Upload() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [specifications, setSpecifications] = useState({
    paperSize: 'A4',
    paperType: 'glossy',
    quantity: 1,
    color: 'color',
    binding: 'none',
    specialInstructions: ''
  });
  const [uploading, setUploading] = useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup');
    }
  }, [isAuthenticated, navigate]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSpecificationChange = (field, value) => {
    setSpecifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('Please select at least one file to upload');
      return;
    }

    setUploading(true);
    
    // Create FormData for file upload
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
    });
    
    // Add specifications
    Object.keys(specifications).forEach(key => {
      formData.append(key, specifications[key]);
    });

    try {
      // Here you would typically upload to your backend
      // For now, we'll simulate the upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store order data in localStorage for cart
      const orderData = {
        files: files.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        })),
        specifications,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('currentOrder', JSON.stringify(orderData));
      navigate('/cart');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Upload Your Files</h1>
            <p className="text-gray-300 text-lg">Upload the files you want to print and specify your requirements</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* File Upload Section */}
            <div className="bg-base-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Upload Files</h2>
              
              <div className="border-2 border-dashed border-gray-400 rounded-xl p-8 text-center hover:border-yellow-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.tiff,.psd,.ai"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-6xl mb-4">📤</div>
                  <p className="text-xl text-white mb-2">Click to upload files</p>
                  <p className="text-gray-400">PDF, DOC, Images, Design files (Max 50MB each)</p>
                </label>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Selected Files:</h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-base-300 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">📄</span>
                          <div>
                            <p className="text-white font-medium">{file.name}</p>
                            <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="btn btn-sm btn-error"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Specifications Section */}
            <div className="bg-base-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">⚙️ Print Specifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Paper Size */}
                <div>
                  <label className="label">
                    <span className="label-text text-white font-medium">Paper Size</span>
                  </label>
                  <select
                    value={specifications.paperSize}
                    onChange={(e) => handleSpecificationChange('paperSize', e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="A4">A4 (210 × 297 mm)</option>
                    <option value="A3">A3 (297 × 420 mm)</option>
                    <option value="A5">A5 (148 × 210 mm)</option>
                    <option value="Letter">Letter (8.5 × 11 in)</option>
                    <option value="Legal">Legal (8.5 × 14 in)</option>
                  </select>
                </div>

                {/* Paper Type */}
                <div>
                  <label className="label">
                    <span className="label-text text-white font-medium">Paper Type</span>
                  </label>
                  <select
                    value={specifications.paperType}
                    onChange={(e) => handleSpecificationChange('paperType', e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="glossy">Glossy</option>
                    <option value="matte">Matte</option>
                    <option value="satin">Satin</option>
                    <option value="bond">Bond</option>
                    <option value="photo">Photo Paper</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="label">
                    <span className="label-text text-white font-medium">Quantity</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={specifications.quantity}
                    onChange={(e) => handleSpecificationChange('quantity', parseInt(e.target.value))}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="label">
                    <span className="label-text text-white font-medium">Color</span>
                  </label>
                  <select
                    value={specifications.color}
                    onChange={(e) => handleSpecificationChange('color', e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="color">Color</option>
                    <option value="black-white">Black & White</option>
                    <option value="grayscale">Grayscale</option>
                  </select>
                </div>

                {/* Binding */}
                <div>
                  <label className="label">
                    <span className="label-text text-white font-medium">Binding</span>
                  </label>
                  <select
                    value={specifications.binding}
                    onChange={(e) => handleSpecificationChange('binding', e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="none">No Binding</option>
                    <option value="staples">Staples</option>
                    <option value="spiral">Spiral Binding</option>
                    <option value="perfect">Perfect Binding</option>
                  </select>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mt-6">
                <label className="label">
                  <span className="label-text text-white font-medium">Special Instructions</span>
                </label>
                <textarea
                  value={specifications.specialInstructions}
                  onChange={(e) => handleSpecificationChange('specialInstructions', e.target.value)}
                  placeholder="Any special requirements or notes for your order..."
                  className="textarea textarea-bordered w-full h-24"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={uploading || files.length === 0}
                className="btn btn-lg bg-yellow-400 text-black hover:bg-yellow-300 border-0 font-bold text-xl px-12 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <span className="loading loading-spinner loading-md"></span>
                    Uploading...
                  </>
                ) : (
                  'Continue to Cart'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload;

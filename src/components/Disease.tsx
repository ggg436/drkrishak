import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Disease = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const { t } = useTranslation();
  
  const API_KEY = 'hPT78zMVcCVlJLvk1cf8q8bO8vg1Ij9idgIAdI3sJXgvdriEtl';
  const OPENROUTER_API_KEY = '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';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setResult(null);
      setError(null);
      setAccessToken(null);
      setAiAdvice(null);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the prefix (data:image/jpeg;base64,)
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;
    
    setLoading(true);
    setError(null);
    setResult(null);
    setAiAdvice(null);
    
    try {
      // Convert image to base64
      const base64Image = await convertFileToBase64(imageFile);
      
      // Make POST request to identification API
      const response = await fetch('https://crop.kindwise.com/api/v1/identification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': API_KEY
        },
        body: JSON.stringify({
          images: [base64Image],
          latitude: 49.207,
          longitude: 16.608,
          similar_images: true
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || data.message || 'Failed to analyze image');
        return;
      }
      
      if (data && data.access_token) {
        setAccessToken(data.access_token);
        // Automatically fetch detailed results
        fetchIdentificationDetails(data.access_token);
      } else {
        setError('No access token returned from API');
      }
    } catch (err: any) {
      setError(`Error during identification: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchIdentificationDetails = async (accessToken: string) => {
    try {
      setLoading(true);
      
      const response = await fetch(`https://crop.kindwise.com/api/v1/identification/${accessToken}`, {
        method: 'GET',
        headers: {
          'Api-Key': API_KEY
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || data.message || 'Failed to fetch identification details');
        return;
      }
      
      setResult(data);
      
      // Get AI advice if we have disease info
      const suggestions = data.result?.disease?.suggestions;
      if (suggestions && suggestions.length > 0) {
        getAIAdvice(suggestions[0].name);
      }
    } catch (err: any) {
      setError(`Error fetching details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Get AI-powered advice on the identified disease
  const getAIAdvice = async (diseaseName: string) => {
    try {
      setLoadingAdvice(true);
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://project-bolt.com',
          'X-Title': 'Crop Disease Identifier'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4.1',
          max_tokens: 2350,
          messages: [
            {
              role: 'user',
              content: `My crop has been identified with "${diseaseName}". Please provide:
              1. A brief explanation of what this disease is
              2. What causes it
              3. How it spreads
              4. Specific treatment options (both organic and conventional)
              5. Preventive measures for future crops
              Format your answer in HTML with <h4> for headings and <ul> for lists.`
            }
          ]
        })
      });
     console.log("how are you",response)
      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setAiAdvice(data.choices[0].message.content);
      } else {
        console.error('Unexpected API response structure:', data);
      }
    } catch (err: any) {
      console.error('Error fetching AI advice:', err);
    } finally {
      setLoadingAdvice(false);
    }
  };
  
  const renderResults = () => {
    if (!result) return null;
    
    // Extract suggestions from the correct path in the response
    const suggestions = result.result?.disease?.suggestions || [];
    const hasValidData = Array.isArray(suggestions) && suggestions.length > 0;
    
    if (!hasValidData) {
      return (
        <div>
          <p>Unable to parse response data</p>
          <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-green-700">{t('disease.result')}</h3>
        
        {/* Top disease summary */}
        {suggestions.length > 0 && (
          <div className="bg-white border border-green-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-medium text-gray-800">
                  Primary identification: <span className="text-green-700 font-semibold">{suggestions[0].name}</span>
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Confidence level: {Math.round((suggestions[0].probability || 0) * 100)}%
                </p>
              </div>
              {suggestions[0].similar_images && suggestions[0].similar_images[0] && (
                <img 
                  src={suggestions[0].similar_images[0].url} 
                  alt={suggestions[0].name}
                  className="w-24 h-24 rounded-lg object-cover border border-green-100"
                />
              )}
            </div>
          </div>
        )}
        
        {/* AI-powered advice section */}
        {(aiAdvice || loadingAdvice) && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Expert AI Analysis
            </h3>
            
            {loadingAdvice ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-700"></div>
                <p className="text-green-700">Generating comprehensive advice...</p>
              </div>
            ) : (
              <div 
                className="prose prose-sm max-w-none prose-headings:text-green-700 prose-headings:font-semibold prose-headings:text-base prose-p:text-gray-700 prose-ul:text-gray-700"
                dangerouslySetInnerHTML={{ __html: aiAdvice || '' }}
              />
            )}
          </div>
        )}
        
        {suggestions.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {suggestions.slice(0, 4).map((item: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 border border-green-100">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-lg">{item.name || 'Unknown'}</h4>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {Math.round((item.probability || 0) * 100)}%
                    </span>
                  </div>
                  
                  {item.similar_images && item.similar_images[0] && (
                    <div className="mt-3">
                      <img 
                        src={item.similar_images[0].url} 
                        alt={item.name}
                        className="rounded-lg w-full h-32 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      {item.description || 
                        `${item.name} is a common crop disease that affects plants. Proper identification and treatment are essential to prevent spread.`}
                    </p>
                    
                    {/* Add disease management tips */}
                    <div className="mt-2 p-2 bg-green-50 rounded">
                      <h5 className="font-medium text-green-800">Management tips:</h5>
                      <ul className="list-disc ml-4 mt-1 text-green-700">
                        <li>Remove and destroy infected plant parts</li>
                        <li>Ensure proper spacing for air circulation</li>
                        <li>Apply appropriate fungicides if necessary</li>
                      </ul>
                    </div>
                    
                    {item.details && item.details.url && (
                      <a 
                        href={item.details.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mt-2 inline-block"
                      >
                        {t('disease.learnMore')}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => document.getElementById('full-json')?.classList.toggle('hidden')}
              className="text-blue-600 underline mt-4 text-sm"
            >
              {t('disease.showHideJson')}
            </button>
            <pre id="full-json" className="mt-2 whitespace-pre-wrap hidden text-xs bg-gray-100 p-3 rounded overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="text-amber-700 bg-amber-50 p-4 rounded-lg">
            {t('disease.noResults')}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('disease.title')}</h1>
        <p className="text-gray-600 mb-6">{t('disease.upload')}</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image upload area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input 
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label 
              htmlFor="image-upload" 
              className="cursor-pointer flex flex-col items-center justify-center space-y-4"
            >
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Selected crop" 
                  className="h-48 object-contain rounded-lg"
                />
              ) : (
                <>
                  <div className="bg-green-50 rounded-full p-4">
                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-600">{t('upload.dragDrop')}</p>
                  <p className="text-xs text-gray-500">{t('upload.fileTypes')}</p>
                </>
              )}
            </label>
          </div>
          
          <div className="flex justify-center">
            <button 
              type="submit" 
              disabled={!imageFile || loading}
              className={`px-6 py-2.5 rounded-full font-medium text-white transition-all
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
                }`}
            >
              {loading ? t('disease.processing') : t('disease.identify')}
            </button>
          </div>
        </form>
      </div>
      
      {/* Display error if any */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {/* Display results if available */}
      {result && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          {renderResults()}
        </div>
      )}
    </div>
  );
};

export default Disease; 
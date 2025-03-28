import { useState } from 'react';
import { Wand2, Copy, Check, Loader2 } from 'lucide-react';
import { generateProjectTitle } from './services/sonnetAI';

function App() {
  const [description, setDescription] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generateTitle = async () => {
    if (!description.trim()) return;
    
    setIsGenerating(true);
    setError('');
    
    const result = await generateProjectTitle(description);
    
    if (result.error) {
      setError(result.error);
    } else if (result.title) {
      setGeneratedTitle(result.title);
    }
    
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedTitle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-8 transition-all duration-500">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-800">AI Project Title Generator</h1>
          <p className="text-gray-600">Transform your project idea into a captivating title</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Project Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project idea..."
              className="w-full h-32 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
            />
          </div>

          <button
            onClick={generateTitle}
            disabled={isGenerating || !description.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Generate Title</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 rounded-lg animate-fade-in">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {generatedTitle && !error && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-sm font-medium text-gray-600 mb-2">Generated Title:</h2>
              <p className="text-xl font-semibold text-gray-800">{generatedTitle}</p>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy Title</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
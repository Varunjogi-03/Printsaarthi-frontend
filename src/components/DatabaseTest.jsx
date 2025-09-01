import React, { useState } from 'react';
import { checkDatabaseHealth } from '../services/api';

const DatabaseTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      const result = await checkDatabaseHealth();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Database Connection Test</h3>
      
      <button
        onClick={handleTestConnection}
        disabled={isTesting}
        className="btn btn-primary w-full mb-4"
      >
        {isTesting ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Testing...
          </>
        ) : (
          'Test Database Connection'
        )}
      </button>

      {testResult && (
        <div className={`p-4 rounded-lg ${
          testResult.success ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
        }`}>
          <h4 className="font-semibold mb-2">
            {testResult.success ? 'Connection Successful' : 'Connection Failed'}
          </h4>
          
          {testResult.success ? (
            <div className="text-sm">
              <p><strong>Database Status:</strong> {testResult.database.status}</p>
              <p><strong>State:</strong> {testResult.database.state}</p>
              <p><strong>Ready State:</strong> {testResult.database.readyState}</p>
              <p><strong>Server Status:</strong> {testResult.serverStatus}</p>
            </div>
          ) : (
            <div className="text-sm">
              <p><strong>Error:</strong> {testResult.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatabaseTest;

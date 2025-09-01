import React from 'react';
import { useAuth } from '../context/AuthContext';

const DatabaseStatus = () => {
  const { dbStatus } = useAuth();

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-green-500';
      case 'unhealthy':
        return 'text-red-500';
      case 'checking':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return '✅';
      case 'unhealthy':
        return '❌';
      case 'checking':
        return '🔄';
      default:
        return '❓';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'healthy':
        return 'Database Connected';
      case 'unhealthy':
        return 'Database Disconnected';
      case 'checking':
        return 'Checking Connection...';
      default:
        return 'Connection Unknown';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-base-200 p-3 rounded-lg shadow-lg border border-base-300 z-50">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{getStatusIcon(dbStatus.status)}</span>
        <div>
          <div className={`text-sm font-medium ${getStatusColor(dbStatus.status)}`}>
            {getStatusText(dbStatus.status)}
          </div>
          <div className="text-xs text-gray-500">
            State: {dbStatus.state}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseStatus;

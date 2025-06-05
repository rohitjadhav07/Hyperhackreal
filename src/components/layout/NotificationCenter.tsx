import React, { useState } from 'react';
import { Bell, X, Check, Info, AlertTriangle, AlertCircle } from 'lucide-react';
import { useNotificationStore, Notification } from '../../store/notificationStore';

const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotificationStore();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="text-green-500" size={18} />;
      case 'warning':
        return <AlertTriangle className="text-amber-500" size={18} />;
      case 'error':
        return <AlertCircle className="text-rose-500" size={18} />;
      default:
        return <Info className="text-blue-500" size={18} />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-800 text-gray-400"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full text-xs flex items-center justify-center text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex space-x-2">
              <button
                onClick={markAllAsRead}
                className="text-xs text-gray-400 hover:text-gray-300"
              >
                Mark all as read
              </button>
              <button
                onClick={clearNotifications}
                className="text-xs text-gray-400 hover:text-gray-300"
              >
                Clear all
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400 text-sm">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer ${
                    !notification.read ? 'bg-gray-700/20' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
import React from "react";

const NotificationTable = ({ notifications }) => {
  return (
    <div>
      <table className="notification-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Property</th>
            <th>Anomaly</th>
            <th>Notification Type</th>
            <th>Root Cause</th>
            <th>Notification Send Time</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, index) => (
            <tr key={index}>
              <td>{notification.category}</td>
              <td>{notification.subCategory}</td>
              <td>{notification.property}</td>
              <td>{notification.anomaly}</td>
              <td>{notification.notificationType}</td>
              <td>{notification.rootCause}</td>
              <td>{notification.notificationSendTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTable;

// formatDate.js
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Định dạng ngày
  const formattedDate = date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  // Định dạng giờ
  const formattedTime = date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  // Ghép ngày và giờ lại mà không có dấu phẩy
  return `${formattedTime} ${formattedDate}`;
};

export const timeSinceMessage = (sentTime) => {
  const now = new Date();
  const timeDiff = now - new Date(sentTime); // Difference in milliseconds

  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}

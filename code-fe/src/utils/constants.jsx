export const ContestSearchOptions = [
  { displayName: 'Title', value: 'TITLE' },
  { displayName: 'ID', value: 'ID' },
  { displayName: 'Owner name', value: 'OWNER_NAME' },
];

export function formatDuration(duration) {
  const seconds = Math.floor(duration / 1000);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedDuration = '';
  if (hours > 0) {
    formattedDuration += `${hours}h`;
  }
  if (minutes > 0) {
    formattedDuration += `${minutes}m`;
  }
  if (hours === 0 && minutes === 0) {
    formattedDuration += `${remainingSeconds}s`;
  }

  return formattedDuration;
}

export function formatDateTime(dateTime) {
  const day = String(dateTime.getDate()).padStart(2, '0');
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const year = dateTime.getFullYear();

  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

export function getStatusColor(status) {
  switch (status) {
    case "ACTIVE":
      return "red.400";
    case "PREPARING":
      return "blue.400";
    case "IN_PROCESS":
      return "green.400";
    case "PAUSED":
      return "yellow.400";
    case "COMPLETED":
      return "purple.400";
    default:
      return "gray.400";
  }
}
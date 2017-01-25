export default function truncateString(s) {
  const words = s.split(' ');
  const truncated = words.slice(0, 12);
  if (words.length >= 12) {
    truncated[truncated.length - 1] += '...';
  }
  return truncated.join(' ');
}

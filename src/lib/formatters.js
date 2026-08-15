export function formatTelemetryTimestamp(isoString) {
  const d = isoString ? new Date(isoString) : new Date();
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = d.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
  return { time, date, full: `${date} ${time}` };
}

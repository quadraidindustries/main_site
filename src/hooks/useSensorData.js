import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const DEFAULT_READINGS = {
  flow_rate_l_hr: 1250,
  today_production_l: 18600,
  tds_input: 356,
  tds_output: 28,
  ph: 7.2,
  orp: 620,
  turbidity: 1.2,
  temperature: 25.4,
  conductivity: 650,
  dissolved_oxygen: 6.3,
  free_chlorine: 1.4,
  inlet_pressure: 2.8,
  pump_pressure: 5.6,
  membrane_dp: 1.3,
  flow_rate_l_min: 22.5,
  tank_level: 78,
  tank_status: 'NORMAL',
  voltage: 232,
  current: 3.6,
  power: 0.82,
  energy_today: 8.45,
  system_status: 'RUNNING'
};

export function useSensorData() {
  const [readings, setReadings] = useState(DEFAULT_READINGS);
  const [history, setHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let readingsChannel;
    let alertsChannel;

    async function initializeData() {
      try {
        setLoading(true);

        // 1. Fetch recent 30 sensor readings for live charts & history
        const { data: recentReadings, error: readingsErr } = await supabase
          .from('sensor_readings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(30);

        if (readingsErr) throw readingsErr;
        if (recentReadings && recentReadings.length > 0) {
          setReadings(recentReadings[0]);
          setHistory(recentReadings);
        }

        // 2. Fetch active alerts
        const { data: activeAlerts, error: alertsErr } = await supabase
          .from('alerts')
          .select('*')
          .eq('status', 'Active')
          .order('created_at', { ascending: false });

        if (alertsErr) throw alertsErr;
        if (activeAlerts) {
          setAlerts(activeAlerts);
        }

        // 3. Real-time subscription for sensor_readings inserts
        readingsChannel = supabase
          .channel('realtime-readings')
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'sensor_readings' },
            (payload) => {
              if (payload.new) {
                setReadings(payload.new);
                setHistory((prev) => [payload.new, ...prev.slice(0, 29)]);
              }
            }
          )
          .subscribe();

        // 4. Real-time subscription for alerts
        alertsChannel = supabase
          .channel('realtime-alerts')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'alerts' },
            async () => {
              const { data: refreshedAlerts } = await supabase
                .from('alerts')
                .select('*')
                .eq('status', 'Active')
                .order('created_at', { ascending: false });
              
              if (refreshedAlerts) {
                setAlerts(refreshedAlerts);
              }
            }
          )
          .subscribe();

      } catch (err) {
        console.error('Error fetching sensor/alert data from Supabase:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    initializeData();

    return () => {
      if (readingsChannel) supabase.removeChannel(readingsChannel);
      if (alertsChannel) supabase.removeChannel(alertsChannel);
    };
  }, []);

  return { readings, history, alerts, loading, error };
}

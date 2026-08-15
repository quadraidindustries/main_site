import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
let supabaseUrl = '';
let supabaseAnonKey = '';

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach((line) => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      if (key === 'VITE_SUPABASE_URL') supabaseUrl = value;
      if (key === 'VITE_SUPABASE_ANON_KEY') supabaseAnonKey = value;
    }
  });
} catch (error) {
  console.error('Error reading .env.local file. Please make sure it exists.', error);
  process.exit(1);
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

console.log('Connecting to Supabase at:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// FULLY AUTOMATED WATER PURIFIER STATE ENGINE
// ==========================================
let purifierState = 'PURIFYING'; // 'PURIFYING' | 'AUTO_FLUSHING' | 'TANK_FULL_STANDBY' | 'MANUAL_STOPPED'

let todayProduction = 18600.0; // Liters
let energyToday = 8.45; // kWh
let tankLevel = 75.0; // %
let cycleCount = 0;
let flushCyclesLeft = 0;

function randomRange(min, max, decimals = 2) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

// Function to clean up old alerts periodically
async function cleanupOldAlerts() {
  try {
    const { data: activeAlerts } = await supabase
      .from('alerts')
      .select('id')
      .order('created_at', { ascending: false });

    if (activeAlerts && activeAlerts.length > 10) {
      const idsToDelete = activeAlerts.slice(10).map((a) => a.id);
      await supabase.from('alerts').delete().in('id', idsToDelete);
    }
  } catch (err) {
    console.error('Error cleaning up old alerts:', err);
  }
}

// Helper to push a reading to Supabase
async function pushReading(reading) {
  try {
    const { error } = await supabase.from('sensor_readings').insert([reading]);
    if (error) {
      console.error('Error inserting sensor reading:', error.message);
    } else {
      console.log(`[${new Date().toLocaleTimeString()}] State: [${reading.system_status}] | Tank: ${reading.tank_level}% | Flow: ${reading.flow_rate_l_hr} L/H | TDS: In=${reading.tds_input} Out=${reading.tds_output} ppm | Power: ${reading.power} kW`);
    }
  } catch (err) {
    console.error('Error sending reading:', err);
  }
}

// Listen for remote start/stop commands from dashboard
function listenForCommands() {
  const commandChannel = supabase.channel('system-commands');

  commandChannel
    .on('broadcast', { event: 'command' }, async ({ payload }) => {
      if (!payload) return;
      const { action } = payload;
      
      if (action === 'STOP') {
        console.log('\n🛑 [MANUAL OVERRIDE] Purifier STOPPED by user.');
        purifierState = 'MANUAL_STOPPED';
        await pushTelemetry(true);
        await supabase.from('alerts').insert([{
          message: 'Water Purifier manually stopped from Dashboard',
          severity: 'Notice',
          status: 'Active'
        }]);
      } else if (action === 'START') {
        console.log('\n▶️ [MANUAL OVERRIDE] Purifier STARTED by user. Resuming Auto Mode.');
        purifierState = 'PURIFYING';
        await pushTelemetry(true);
      }
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('📡 Connected to Supabase Live Command Bus.');
      }
    });
}

// Push one telemetry cycle
async function pushTelemetry() {
  cycleCount++;

  // 1. AUTOMATED WATER PURIFIER LIFECYCLE LOGIC
  if (purifierState === 'MANUAL_STOPPED') {
    // Machine is manually halted
  } else if (purifierState === 'AUTO_FLUSHING') {
    flushCyclesLeft--;
    if (flushCyclesLeft <= 0) {
      console.log('\n✨ [AUTO-CYCLE] Membrane flush complete. Resuming purification.');
      purifierState = 'PURIFYING';
    }
  } else if (purifierState === 'TANK_FULL_STANDBY') {
    // Pure water tank is full, simulate natural water consumption over time
    tankLevel -= randomRange(1.0, 2.0, 1);
    if (tankLevel <= 65) {
      console.log('\n💧 [AUTO-CYCLE] Tank level low (< 65%). Auto-starting RO booster pump.');
      purifierState = 'PURIFYING';
      await supabase.from('alerts').insert([{
        message: 'Auto Refill: Tank level below setpoint (65%). RO Pump started.',
        severity: 'Notice',
        status: 'Active'
      }]);
    }
  } else if (purifierState === 'PURIFYING') {
    // Pure water fills the tank
    tankLevel += randomRange(1.5, 2.5, 1);

    // Auto-cutoff when tank fills to 100%
    if (tankLevel >= 100) {
      tankLevel = 100;
      purifierState = 'TANK_FULL_STANDBY';
      console.log('\n🛑 [AUTO-CYCLE] Pure Water Tank is FULL (100%). Automated pump cutoff activated.');
      await supabase.from('alerts').insert([{
        message: 'Auto Cutoff: Storage Tank 100% full. Purifier in standby.',
        severity: 'Notice',
        status: 'Active'
      }]);
    }

    // Auto-flush trigger every 15 cycles (~75 seconds)
    if (purifierState === 'PURIFYING' && cycleCount % 15 === 0) {
      purifierState = 'AUTO_FLUSHING';
      flushCyclesLeft = 2; // 2 cycles of high-pressure membrane wash
      console.log('\n🌊 [AUTO-CYCLE] Initiating automated high-pressure RO membrane flush.');
      await supabase.from('alerts').insert([{
        message: 'Auto Maintenance: High-pressure membrane backwash cycle active.',
        severity: 'Notice',
        status: 'Active'
      }]);
    }
  }

  // 2. GENERATE SENSOR TELEMETRY BASED ON AUTOMATED PURIFIER STATE
  let flowRateHr = 0;
  let pumpPressure = 0;
  let inletPressure = randomRange(2.5, 2.9, 1);
  let membraneDp = 1.2;
  let power = 0.01;
  let current = 0.05;
  let tdsIn = randomRange(345, 365, 0);
  let tdsOut = 0;
  let statusText = 'RUNNING';

  if (purifierState === 'PURIFYING') {
    flowRateHr = randomRange(1220, 1290, 1);
    pumpPressure = randomRange(5.4, 5.8, 1);
    membraneDp = randomRange(1.2, 1.4, 1);
    power = randomRange(0.78, 0.84, 2);
    current = randomRange(3.4, 3.7, 2);
    tdsOut = randomRange(24, 32, 0);
    todayProduction += flowRateHr / 720;
    energyToday += power / 720;
    statusText = 'RUNNING';
  } else if (purifierState === 'AUTO_FLUSHING') {
    flowRateHr = randomRange(1500, 1650, 1); // Flush velocity
    pumpPressure = randomRange(3.2, 3.8, 1);
    membraneDp = randomRange(1.6, 1.8, 1);
    power = randomRange(0.65, 0.72, 2);
    current = randomRange(2.8, 3.1, 2);
    tdsOut = randomRange(45, 60, 0);
    energyToday += power / 720;
    statusText = 'FLUSHING';
  } else if (purifierState === 'TANK_FULL_STANDBY') {
    flowRateHr = 0;
    pumpPressure = 0;
    membraneDp = 0;
    power = 0.01; // Standby
    current = 0.05;
    tdsOut = 26;
    statusText = 'STANDBY';
  } else if (purifierState === 'MANUAL_STOPPED') {
    flowRateHr = 0;
    pumpPressure = 0;
    membraneDp = 0;
    power = 0;
    current = 0;
    tdsOut = 0;
    statusText = 'STOPPED';
  }

  const sensorReading = {
    flow_rate_l_hr: flowRateHr,
    today_production_l: Math.round(todayProduction),
    tds_input: tdsIn,
    tds_output: tdsOut,
    ph: randomRange(7.15, 7.35, 2),
    orp: randomRange(600, 625, 0),
    turbidity: randomRange(0.4, 0.8, 2),
    temperature: randomRange(24.5, 25.8, 1),
    conductivity: randomRange(640, 665, 0),
    dissolved_oxygen: randomRange(6.2, 6.5, 2),
    free_chlorine: randomRange(1.3, 1.5, 2),
    inlet_pressure: inletPressure,
    pump_pressure: pumpPressure,
    membrane_dp: membraneDp,
    flow_rate_l_min: parseFloat((flowRateHr / 60).toFixed(1)),
    tank_level: Math.round(tankLevel),
    tank_status: tankLevel >= 95 ? 'FULL' : tankLevel <= 25 ? 'LOW' : 'NORMAL',
    voltage: randomRange(229, 233, 0),
    current: current,
    power: power,
    energy_today: parseFloat(energyToday.toFixed(2)),
    system_status: statusText
  };

  await pushReading(sensorReading);

  if (Math.random() < 0.08) {
    await cleanupOldAlerts();
  }
}

// Main simulator loop
async function runSimulation() {
  console.log('💧 [QUADRAID AUTOMATION ENGINE] Initializing Intelligent Water Purifier Simulator...');
  listenForCommands();
  await cleanupOldAlerts();

  // Run cycle every 5 seconds
  setInterval(async () => {
    await pushTelemetry();
  }, 5000);
}

runSimulation();

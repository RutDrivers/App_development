-- migrations/001_create_tables.sql

-- Tabla de conductores (drivers)
CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de vehículos (vehicles)
CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  driver_id INTEGER REFERENCES drivers(id),
  brand VARCHAR(50),
  model VARCHAR(50),
  plate VARCHAR(20) UNIQUE,
  color VARCHAR(30),
  year INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de viajes (trips)
CREATE TABLE IF NOT EXISTS trips (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  driver_id INTEGER REFERENCES drivers(id),
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pagos (payments)
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  trip_id INTEGER REFERENCES trips(id),
  amount NUMERIC(10,2) NOT NULL,
  method VARCHAR(30),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de calificaciones (ratings)
CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  trip_id INTEGER REFERENCES trips(id),
  user_id INTEGER REFERENCES users(id),
  driver_id INTEGER REFERENCES drivers(id),
  score INTEGER CHECK (score >= 1 AND score <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

import { pool } from './database.js'
import './dotenv.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'


const currentPath = fileURLToPath(import.meta.url)

const tripsFile = fs.readFileSync(path.join(dirname(currentPath), '../config/data/data.json'))
const tripsData = JSON.parse(tripsFile)

const createTripsTable = async () => {
  const createTripsTableQuery = `
      DROP TABLE IF EXISTS trips;

      CREATE TABLE IF NOT EXISTS trips (
          id serial PRIMARY KEY,
          title varchar(100) NOT NULL,
          description varchar(500) NOT NULL,
          img_url text NOT NULL,
          num_days integer NOT NULL,
          start_date date NOT NULL,
          end_date date NOT NULL,
          total_cost money NOT NULL
      );
  `
  try {
  const res = await pool.query(createTripsTableQuery)
  console.log('🎉 trips table created successfully')
    } catch (err) {
        console.error('⚠️ error creating trips table', err)
    }
}

const seedTripsTable = async () => {
  await createTripsTable()
}



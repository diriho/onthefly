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
  const res = 
  await pool.query(createTripsTableQuery)
  console.log('🎉 trips table created successfully')
    } catch (err) {
        console.error('⚠️ error creating trips table', err)
    }
}


const seedTripsTable = async () => {
  await createTripsTable()
  tripsData.forEach(async (trip) => {
    const insertQuery = {
        text: 'INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7)'
    }
    const values = [
        trip.title,
        trip.description,
        trip.img_url,
        trip.num_days,
        trip.start_date,
        trip.end_date,
        trip.total_cost
    ]
    pool.query(insertQuery, values, (err, res) => {
    if (err) {
        console.error('⚠️ error inserting trip', err)
        return
    }

    console.log(`✅ ${trip.title} added successfully`)
})

  })
}

seedTripsTable()


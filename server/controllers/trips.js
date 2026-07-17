import {pool} from '../config/database.js'

const createTrip = async (req, res) => {
    try{ 
        const {title, description, img_url, num_days, start_date, end_date, total_cost} = req.body
        const result = await pool.query(
            'INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, description, img_url, num_days, start_date, end_date, total_cost]
        )
        const newTrip = result.rows[0]
        res.status(201).json(newTrip)


    } catch (error) {
        res.status(409).json({ error: error.message })
    }

}

const getTrips = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM trips')
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }

}

const getTrip = async (req, res) => {
    const { id } = parseInt(req.params.id)
    try {
        const result = await pool.query('SELECT * FROM trips WHERE id = $1', [id])
        res.status(200).json(result.rows[0])

    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateTrip = async (req, res) => {
    try{
        const { id } = parseInt(req.params.id)
        const {title, description, img_url, num_days, start_date, end_date, total_cost} = req.body
        const result = await pool.query(
            'UPDATE trips SET title = $1, description = $2, img_url = $3, num_days = $4, start_date = $5, end_date = $6, total_cost = $7 WHERE id = $8 RETURNING *',
            [title, description, img_url, num_days, start_date, end_date, total_cost, id]
        )
        const updatedTrip = result.rows[0]
        res.status(200).json(updatedTrip)
    
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteTrip = async (req, res) => {
    try{
        const { id } = parseInt(req.params.id)
        // delete the activities associated with this trip
        const activitiesResult = await pool.query('DELETE FROM activities WHERE trip_id = $1', [id])

        // delete the trip from the trips table
        const tripResult = await pool.query('DELETE FROM trips WHERE id = $1', [id])
        res.status(200).json({trip: tripResult.rows[0], activities: activitiesResult.rows})

    } catch (error) {
        res.status(409).json({ error: error.message })
    }

}

export default { createTrip, getTrips, getTrip, updateTrip, deleteTrip }
import {pool} from '../config/database.js'

const createActivity = async (req, res) => {
    try{
        const {id, trip_id, activity, num_votes} = req.body
        const result = await pool.query(
            `INSERT INTO activities (id, trip_id, activity, num_votes) VALUES ($1, $2, $3, $4) RETURNING *`,
            [id, trip_id, activity, num_votes]
        )
        const newActivity = result.rows[0]
        res.status(201).json(newActivity)
        
        
    } catch (error) {
        res.status(409).json({ error: error.message })
    
    }


}

const getActivities = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM activities ORDER BY num_votes DESC')
        res.status(200).json(result.rows)   
    }catch (error) {
        res.status(409).json({ error: error.message })

    }

}

const getActivity = async (req, res) => {
    try{
        const { id } = parseInt(req.params.id)
        const result = await pool.query('SELECT * FROM activities WHERE id = $1', [id])
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }

}

const updateActivity = async (req, res) => {
    try{
        const { id } = parseInt(req.params.id)
        const {trip_id, activity, num_votes} = req.body
        const result = await pool.query(
            'UPDATE activities SET trip_id = $1, activity = $2, num_votes = $3 WHERE id = $4 RETURNING *',
            [trip_id, activity, num_votes, id]
        )
        const updatedActivity = result.rows[0]
        res.status(200).json(updatedActivity)
        
    } catch (error) {
        res.status(409).json({ error: error.message })
    }   
}

const deleteActivity = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const result = await pool.query('DELETE FROM activities WHERE id = $1 RETURNING *', [id])
        const deletedActivity = result.rows[0]
        res.status(200).json(deletedActivity)
        
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}


export default { createActivity, getActivities, getActivity, updateActivity, deleteActivity }   
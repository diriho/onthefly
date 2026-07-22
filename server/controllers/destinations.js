import {pool} from '../config/database.js'

const createDestination = async (req, res) => {
    try{
        const {id, destination, description, city, country, img_url, flag_img_url} = req.body
        const result = await pool.query(
            `INSERT INTO destinations (id, destination, description, city, country, img_url, flag_img_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [id, destination, description, city, country, img_url, flag_img_url]
        )
        const newDestination = result.rows[0]
        res.status(201).json(newDestination)

    } catch (error) {
        res.status(409).json({ error: error.message })

    }

}     

const getDestinations = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM destinations')
        res.status(200).json(result.rows)   
        
    }catch (error) {
        res.status(409).json({ error: error.message })
    }

}

const getDestination = async (req, res) => {
    try{
        const {id} = parseInt(req.params.id)
        const result = await pool.query('SELECT * FROM destinations WHERE id = $1', [id])
        res.status(200).json(result.rows[0])

    }catch (error) {
        res.status(409).json({ error: error.message })
    }

}

const updateDestination = async (req, res) => {
    try{
        const {id} = parseInt(req.params.id)
        const {destination, description, city, country, img_url, flag_img_url} = req.body
        const result = await pool.query(
            'UPDATE destinations SET destination = $1, description = $2, city = $3, country = $4, img_url = $5, flag_img_url = $6 WHERE id = $7 RETURNING *',
            [destination, description, city, country, img_url, flag_img_url, id]
        )
        const updatedDestination = result.rows[0]
        res.status(200).json(updatedDestination)
        
    }catch (error) {
        res.status(409).json({ error: error.message })
    }
    
}   

const deleteDestination = async (req, res) => {
    try{
        const {id} = parseInt(req.params.id)
        const result = await pool.query('DELETE FROM destinations WHERE id = $1 RETURNING *', [id])
        const deletedDestination = result.rows[0]
        res.status(200).json(deletedDestination)
        
    }catch (error) {
        res.status(409).json({ error: error.message })
    }
    
}   


export default { createDestination, getDestinations, getDestination, updateDestination, deleteDestination }
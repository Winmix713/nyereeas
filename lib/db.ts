import mysql from 'mysql2/promise'

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'mysql.rackhost.hu',
  user: process.env.DB_USER || 'c694347cdsoxru',
  password: process.env.DB_PASSWORD || 'VvJLxHhKG7Fk',
  database: process.env.DB_NAME || 'c694347cdsoxru',
  charset: process.env.DB_CHARSET || 'utf8',
}

// Create a connection pool
const pool = mysql.createPool(dbConfig)

// Function to test the database connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()
    return true
  } catch (error) {
    console.error('Error connecting to the database:', error)
    return false
  }
}

// Function to execute a query
export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}

// Export the pool for direct use if needed
export default pool


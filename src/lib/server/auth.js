// Import database connection
import pool from './database.js';

// Import bcrypt for password hashing
import bcrypt from 'bcrypt';

// Import function to generate unique session IDs
import { randomUUID } from 'crypto';


// Hash user password before saving to database
export async function hashPassword(password) {

    return bcrypt.hash(password, 10);
}


// Compare entered password with hashed password
export async function verifyPassword(password, hash) {

    return bcrypt.compare(password, hash);
}


// Create new user session
export async function createSession(userId) {

    // Generate unique session ID
    const sessionId = randomUUID();

    // Session expires after 30 days
    const expiresAt = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
    );

    // Save session in database
    await pool.execute(
        `
        INSERT INTO sessions
        (id, user_id, expires_at)
        VALUES (?, ?, ?)
        `,
        [sessionId, userId, expiresAt]
    );

    // Return created session ID
    return sessionId;
}


// Validate existing session
export async function validateSession(sessionId) {

    // Get user connected to session
    const [rows] = await pool.execute(
        `
        SELECT
            u.id,
            u.username,
            u.role
        FROM sessions s
        JOIN users u
        ON s.user_id = u.id
        WHERE s.id = ?
        AND s.expires_at > NOW()
        `,
        [sessionId]
    );

    // Return user or null
    return rows[0] ?? null;
}


// Delete user session during logout
export async function invalidateSession(sessionId) {

    await pool.execute(
        'DELETE FROM sessions WHERE id = ?',
        [sessionId]
    );
}
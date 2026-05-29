// Import SvelteKit helpers
import { fail, redirect } from '@sveltejs/kit';

// Import database connection
import pool from '$lib/server/database.js';

// Import authentication helper functions
import {
    hashPassword,
    createSession
} from '$lib/server/auth.js';

// Form actions
export const actions = {

    // Register action
    register: async ({ request, cookies }) => {

        // Read submitted form data
        const form = await request.formData();

        // Get username and password from form
        const username = form.get('username');
        const password = form.get('password');

        // Check if fields are empty
        if (!username || !password) {

            return fail(400, {
                error: 'Please fill all fields'
            });
        }

        let result;

        try {

            // Insert new user into database
            [result] = await pool.execute(
                `
                INSERT INTO users
                (username, password)
                VALUES (?, ?)
                `,
                [
                    username,

                    // Hash password before saving
                    await hashPassword(password)
                ]
            );

        } catch (err) {

            // Handle duplicate usernames
            if (err.code === 'ER_DUP_ENTRY') {

                return fail(400, {
                    error: 'Username already exists'
                });
            }

            // Throw unexpected errors
            throw err;
        }

        // Create new session for user
        const sessionId = await createSession(result.insertId);

        // Save session cookie
        cookies.set('session', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30
        });

        // Redirect user to dashboard
        throw redirect(303, '/dashboard');
    }
};
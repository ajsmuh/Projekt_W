import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { verifyPassword, createSession } from '$lib/server/auth.js';

export const actions = {
    login: async ({ request, cookies }) => {

        // Formulardaten aus dem Login-Formular auslesen
        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');

        // Überprüfen, ob alle Pflichtfelder ausgefüllt wurden
        if (!username || !password) {
            return fail(400, { error: 'Bitte alle Felder ausfüllen.' });
        }

        // Benutzer anhand des Benutzernamens in der Datenbank suchen
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        // Fehler zurückgeben, wenn kein Benutzer gefunden wurde
        if (rows.length === 0) {
            return fail(400, { error: 'Username nicht gefunden.' });
        }

        // Passwort mit dem gespeicherten Hash vergleichen
        if (!(await verifyPassword(password, rows[0].password_hash))) {
            return fail(400, { error: 'Falsches Passwort.' });
        }

        // Neue Session für den angemeldeten Benutzer erstellen
        const sessionId = await createSession(rows[0].id);

        // Session-ID als Cookie im Browser speichern
        cookies.set('session', sessionId, {
            path: '/',                 
            httpOnly: true,           
            sameSite: 'strict',        
            maxAge: 60 * 60 * 24 * 30  
        });

        // Nach erfolgreicher Anmeldung auf die Startseite weiterleiten
        throw redirect(303, '/');
    }
};
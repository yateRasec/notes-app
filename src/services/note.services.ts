
import { SERVICE_CONSTANTS } from "../environments/environments";
import Note from "./models/note_response";

export default class NoteServices {
    base_url: string;
    headers;

    constructor() {
        this.base_url = `${SERVICE_CONSTANTS.base_url}note/`;
        this.headers = {
            "Content-Type": "application/json"
        }

    }

    async getAllNotes(): Promise<Note[]> {
        try {
            const response = await fetch(this.base_url, { headers: this.headers });
            const status = response.status;
            if (status !== 200) {
                throw new Error(`Error fetching notes: ${status}`);
            }
            const data = await response.json();

            if (data.response == null) {
                return [];
            }
            const notes: Note[] = data.response.map((note: unknown): Note => {
                return Note.map_to_service(note);
            });

            return notes;
        } catch (error) {
            console.error("Error fetching notes:", error);
            throw new Error("Failed to fetch notes");
        }
    }

    async serachByText({ text }: { text: string }): Promise<Note[]> {
        try {
            const response = await fetch(`${this.base_url}search`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ text })
            }); const status = response.status;
            if (status !== 200) {
                return []
            }
            const data = await response.json();
            console.log("data", data)
            return data.response;
        } catch (error) {
            console.error("Error fetching notes:", error);
            throw new Error("Failed to fetch notes");
        }
    }

    async saveNote({ title, description }: { title: string, description: string }): Promise<boolean> {
        try {
            const response = await fetch(this.base_url, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    title, description
                })
            }); const status = response.status;
            if (status !== 200) {
                return false
            }
            const data = await response.json();
            console.log("data", data)
            return data.response;
        } catch (error) {
            console.error("Error fetching notes:", error);
            throw new Error("Failed to fetch notes");
        }
    }

    async updateNote({ id, title, description }: { id: number, title: string, description: string }): Promise<boolean> {
        try {
            const response = await fetch(`${this.base_url}${id}`, {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify({
                    title, description
                })
            });
            const status = response.status;
            if (status !== 200) {
                return false
            }
            const data = await response.json();

            return data.response;
        } catch (error) {
            console.error("Error fetching notes:", error);
            throw new Error("Failed to fetch notes");
        }

    }

    async deleteNote({ id }: { id: number }): Promise<boolean> {
        try {
            const response = await fetch(`${this.base_url}${id}`, {
                method: "DELETE",
                headers: this.headers
            });
            const status = response.status;
            if (status !== 200) {
                return false
            }
            const data = await response.json();

            return data.response;
        } catch (error) {
            console.error("Error fetching notes:", error);
            throw new Error("Failed to fetch notes");
        }
    }

}
import type { noteType } from "../../types/noteType";

export default class Note implements noteType {
    id: number;
    title: string;
    description: string;

    constructor(id: number, title: string, description: string) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    static map_to_service(data: unknown): Note {
        const { id, title, description } = data as { id: number; title: string; description: string };
        return new Note(id, title, description);

    }

}
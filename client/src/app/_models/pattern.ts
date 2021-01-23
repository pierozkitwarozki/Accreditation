import { Attachment } from "./attachment";

export interface Pattern {
    id: number;
    name: string;
    description: string;
    attachments: Attachment[];
}

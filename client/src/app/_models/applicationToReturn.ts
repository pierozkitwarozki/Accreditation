import { Attachment } from "./attachment";

export interface ApplicationToReturn {
    id: number;
    name: string;
    description: string;
    nameOfUser: string;
    surname: string;
    adminComment: string;
    approved: boolean;
    userAttachments: Attachment[];
}

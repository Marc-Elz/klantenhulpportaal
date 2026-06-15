export interface storeType {
    id: number;
}

export interface userType extends storeType {
    name: string;
    email?: string;
    phone_number?: string;
    role: Role;
    created_at: Date;
}

export interface ticketType extends storeType {
    title: string;
    description: string;
    submitter_id: number;
    user_asignee_id: number;
    category_ids: number[];
    status: Status;
    priority: Priority;
    created_at: Date;
    updated_at: Date;
}

export interface categoryType extends storeType {
    name: string;
}

export interface authType {
    email: string;
    password: string;
}

export interface resetPasswordPayload {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}

export interface registerPayload {
    name: string;
    email: string;
    phone_number?: string;
    password: string;
    password_confirmation: string;
}

export interface commentType extends storeType {
    content: string;
    user_id: number;
    ticket_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface noteType extends storeType {
    content: string;
    user_id: number;
    ticket_id: number;
    created_at: Date;
    updated_at: Date;
}

export type Role = "admin" | "user";
export type Status = "open" | "in_progress" | "resolved" | "closed";
export type Priority = "low" | "medium" | "high";

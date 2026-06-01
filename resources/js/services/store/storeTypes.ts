export interface storeType {
    id: number;
}

export interface userType extends storeType {
    name: string;
    role: Role;
    created_at: Date;
}

export interface ticketType extends storeType {
    title: string;
    description: string;
    user_submitter_id: number;
    asignee_id: number;
    category_ids: number[];
    status: Status;
    priority: Priority;
    created_at: Date;
    updated_at: Date;
}

export interface categoryType extends storeType {
    name: string;
}

export interface authType extends storeType {
    email: string;
    password: string;
}

export type Role = "admin" | "user";
export type Status = "open" | "in_progress" | "resolved" | "closed";
export type Priority = "low" | "medium" | "high";

export interface storeType {
    id: number;
}

export interface userType extends storeType {
    name: string;
    role: Enumerator;
    created_at: Date;
}

export interface ticketType extends storeType {
    title: string;
    description: string;
    submitter_id: number;
    asignee_id: number;
    category_ids: [number];
    status: Enumerator;
    priority: Enumerator;
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

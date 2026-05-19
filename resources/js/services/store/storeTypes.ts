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
    submitter: number;
    assigned_to: number;
    category_id: number;
    status: Enumerator;
    priority: Enumerator;
    created_at: Date;
}

export interface categoryType extends storeType {
    name: string;
}

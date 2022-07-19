export interface Team {
    teamId: number;
    name: string;
    state: string;
}

export interface ApiResponse<T> {
    isSuccess: boolean;
    errors: string[];
    body: any
}
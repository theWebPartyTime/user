export interface Script {
    id: number;
    public: boolean;
    creator_id: number;
    title: string;
    description: string;
    script_hash: string;
    cover_hash: string;
    created_at: string;
    updated_at: string;
}

export interface ScriptsResponse {
    scripts: Script[];
}
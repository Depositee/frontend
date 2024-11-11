export interface Review {
    id: string;
    depositor_id: string;
    depositee_id: string;
    rating: number;
    review_text?: string;
    created_at: string;
}

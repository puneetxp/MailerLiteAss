export interface Subscriber {
       id: number,
       created_at: Date,
       updated_at: Date,
       name: string,
       lastname: string,
       email: string,
       phone: string | null,
       status_id: number
    }
export interface Category {
    category_id: number
    category_name: string
}

export interface ReportResponse {
    total: number
    offset: number
    size: number
    items: ReportItem[]
}

export interface ReportItem {
    report_id: number
    writer_id: number
    category: {
        category_id: number
        category_name: string
    }
    latitude: number
    longitude: number
    title: string
    description: string
    image_url: string
    state: string
    created_at: string
}

export interface State {
    state: string
}

export interface Comment {
    answer: string
}

export interface CommentResponse {
    report_answer_id: number
    report_id: number
    writer_id: number
    answer: string
    state: string
    created_at: string
}

export interface CommentedReport {
    report: ReportItem
    answer: CommentResponse
}

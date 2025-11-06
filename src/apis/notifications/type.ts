export interface Notice {
    title: string
    content: string
}

export interface NoticeResponse {
    notification_id: number
    writer_id: number
    title: string
    content: string
    created_at: string
}

export interface NoticeList {
    total: number
    offset: number
    size: number
    items: NoticeItem[]
}

interface NoticeItem {
    notification_id: number
    writer_id: number
    title: string
    content: string
    created_at: string
}

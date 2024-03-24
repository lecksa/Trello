export type Item = {
    id: string
    title: string
    description: string
    status: 1
    created_at: Date
    updated_at: Date
}

export type Reload = {
    arr: Array<Item>
    places: NodeListOf<HTMLDivElement>
}

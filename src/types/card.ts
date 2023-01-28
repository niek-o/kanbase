export type CardType = {
    title: string,
    description: string,
    card_status: string,
    assignee: {
        name: string,
        profile_picture: string
    } | null,
    due_date: string | null,
    tags: Array<{ name: string, color: string }> | null
}

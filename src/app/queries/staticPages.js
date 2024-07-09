export const pageQuery = `
    query Pages ($title: String) {
        pages(filter: { Title: { _eq: $title } }) {
            Title
            Content
        }
    }
`;
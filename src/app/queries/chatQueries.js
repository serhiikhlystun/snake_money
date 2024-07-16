export const subscription = `
    subscription {
        messages_mutated {
          key
          event
          data {
            content
          }
        }
    }
`;

export const createMessage = `
    mutation Create_messages_item ($content: String) {
        create_messages_item(
            data: { chat_id: { id: "4c26c5ef-93cd-43cb-9f30-1423effdc065" }, content: $content }
        ) {
            id
            date_created
            content
            user_created {
                id
                first_name
            }
            chat_id {
                id
                chat_name
                type
            }
        }
    }
`;

export const getUserChats = `
    query Chat_participants ($userId: String) {
        chat_participants(
            filter: { user_id: { id: { _eq: $userId } } }
        ) {
            chat_id {
                id
                date_created
                date_updated
                type
                chat_name
                last_message
            }
        }
    }
`;

export const getChatMessages = `
    query Messages ($chatId: String) {
    messages(filter: { chat_id: { id: { _eq: $chatId } } }) {
        date_created
        content
    }
}
`;
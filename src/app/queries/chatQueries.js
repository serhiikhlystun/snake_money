export const messagesSubscription = `
    subscription {
        messages_mutated (event: create) {
          key
          event
          data {
            id
            content
            date_created
            chat_id {
                id
            }
            user_created {
                id
                first_name
                avatar {
                    id
                }
            }
          }
        }
    }
`;

export const createMessage = `
    mutation Create_messages_item ($chatId: ID, $content: String) {
        create_messages_item(
            data: { chat_id: { id: $chatId }, content: $content }
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

export const getUserChat = `
    query Chat_participants ($chatId: String, $userId: String) {
        chat_participants(
            filter: { chat_id: {id: { _eq: $chatId } }, user_id: { id: { _eq: $userId } } }
        ) {
            chat_id {
                id
                date_created
                date_updated
                type
                chat_name
                last_message
            }
            user_id {
                id
                first_name
                avatar {
                    id
                }
            }
        }
    }
`;

export const getGroupChats = `
    query Chats {
        chats(filter: { type: { _eq: "group" } }) {
            id
            date_created
            date_updated
            type
            chat_name
            last_message
            chat_icon {
                id
            }
        }
    }
`;

export const getChatUsersMessages = `
    query Messages ($chatId: String) {
    messages(filter: { chat_id: { id: { _eq: $chatId } } }) {
        date_created
        user_created {
            id
            first_name
            avatar {
                id
            }
        }
        content
    }
}
`;

export const chatsSubscription = `
    subscription Chats_mutated {
        chats_mutated {
            key
            event
            data {
                id
                date_created
                date_updated
                type
                chat_name
                last_message
                user_1 {
                    id
                    first_name
                    email
                    is_online
                }
                user_2 {
                    id
                    first_name
                    email
                    is_online
                }
            }
        }
    }
`;

export const getUsers = `
    query Users ($userId: [String]) {
        users(filter: { id: { _in: $userId } }) {
            id
            first_name
            last_name
            email
            last_access
            is_online
            avatar {
                id
            }
        }
    }
`;

export const getSearchedUsers = `
    query Users ($value: String) {
        users(filter: { first_name: { _contains: $value } }) {
            id
            first_name
            last_name
            email
            last_access
            avatar {
                id
            }
        }
    }
`;

export const createChat = `
    mutation Create_chats_item ($username: String, $user1: String, $user2: String ) {
        create_chats_item(
            data: {user_1: $user1, user_2: $user2  , chat_name: $username, type: "one_to_one" }
        ) {
            id
            date_created
            user_created {
                id
                first_name
            }
            chat_name
            type
        }
    }
`;

export const createChatParticipants = `
    mutation Create_chat_participants_item ($userId: String, $chatId: ID) {
        create_chat_participants_item(
            data: { user_id: $userId, chat_id: { id: $chatId } }
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

export const updateLastMessage = `
    mutation Update_chats_item ($chatId: ID!, $message: String) {
        update_chats_item(id: $chatId, data: { last_message: $message }) {
            id
            type
            chat_name
            chat_icon {
                id
            }
            last_message
        }
    }
`;

export const getOneToOneChat = `
    query Chats ($users: [String]) {
    chats(filter: { user_1: { id: { _in: $users } }, user_2: { id: { _in: $users } } }) {
        id
        date_created
        date_updated
        type
        chat_name
        last_message
    }
}
`;

export const usersSubscription = `
    subscription Directus_users_mutated {
    directus_users_mutated {
        key
        event
        data {
            id
            first_name
            last_name
            email
            status
            token
            last_access
            is_online
        }
    }
}
`;

export const userOnlineMutated = `
    mutation Update_users_item ($userId: ID!, $isOnline: Boolean){
        update_users_item(id: $userId, data: { is_online: $isOnline }) {
            id
            first_name
            last_name
            email
            is_online
        }
    }
`
export const getChatParticipants = `
    query Chat_participants ($userId: String) {
    chat_participants(filter: { user_id: { id: { _eq: $userId } } chat_id: { type: { _eq: "one_to_one" } }}) {
        id
        status
        sort
        date_created
        date_updated
        chat_id {
            id
            type
            chat_name
            last_message
            user_1 {
                id
                first_name
                email
                is_online
            }
            user_2 {
                id
                first_name
                email
                is_online
            }
        }
    }
}
`

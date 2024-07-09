export const createNewUser = `
    #graphql
    mutation createNewUser($data: create_directus_users_input!) {
        create_users_item(data: $data)
    }
`;

export const getCurrentUser = `
    #graphql
    query {
        users_me {
            id
            email
            first_name
            avatar {
              id
            }
        }
    }
`;

export const updateCurrentUser = `
    #graphql
    mutation updateCurrentUser($data: update_directus_users_input!) {
        update_users_me(data: $data) {
            id
            email
            first_name
            avatar {
              id
            }

        }
    }
`;

export const logoutUser = `
    #graphql
        mutation Auth_logout ($refresh_token: String) {
            auth_logout(refresh_token: $refresh_token)
    }
`;

export const refreshAuth = `
    #graphql
        mutation Auth_refresh ($refresh_token: String) {
            auth_refresh(refresh_token: $refresh_token, mode: json) {
                access_token
                expires
                refresh_token
            }
    }
`;

export const updateUserSession = `
    #graphql
    mutation Update_users_item ($user_id: ID!, $data: update_directus_users_input!) {
        update_users_item(
            id: $user_id
            data: $data
        ) {
            session {
                id
            }
        }
    }
`;

export const getUserData = `
    query User_data ($user_id: String) {
        user_data(filter: { user: { id: { _eq: $user_id } }}) {
            balance
            best_score
            user {
                id
            }
        }
    }
`;

export const createUserData = `
    mutation Create_user_data_item ($user_id: ID) {
        create_user_data_item(data: { user: { id: $user_id} }) {
            best_score
            balance
            user {
                id
            }
        }
}
`;


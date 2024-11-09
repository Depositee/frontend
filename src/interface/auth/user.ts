export interface UserData {
    id : string,
    username : string
}

export interface GetCurrentUserData{
    success : boolean,
    data : {
        valid : boolean,
        user : UserData
    }
}
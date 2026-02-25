export interface IUser {
    id: string,
    name: string,
    roleId: string,
    roleName: string,
    emailId: string,
    mobileNo: string,
    countryName: string,
    countryCode: string,
    referalCode: string,
    gender: string,
    isInvitedUser: boolean,
    isActive: boolean,
    permissions?: any[]
}
export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    roleId: string,
    roleName: string,
    emailId: string,
    mobileNo: string,
    countryName: string,
    countryCode: string,
    referalCode: string,
    isIndividual: boolean,
    organisationName: string,
    gender: string,
    isInvitedUser: boolean,
    isActive: boolean,
    permissions?: any[]
}
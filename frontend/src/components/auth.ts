export type role = "Admin" | "Moderator" | "Analyst"

export type User = {
	_id?: string;
	username: string;
	email: string;
	password: string;
	role?: role;
}

export const DefaultEmptyUser: User = {
    _id: undefined, 
    username: '', 
    email: '',
    password: '',
    role: "Moderator"
}
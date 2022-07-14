import { User } from "./user";

export interface UserIdentity {
    user: User;
    identityToken: string;
}
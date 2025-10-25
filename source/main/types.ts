import { EntryID, VaultSourceID } from "Buttercup-Rev";

export * from "../shared/types";

export enum BrowserAPIErrorType {
    AuthMismatch = "err/auth/mismatch",
    NoAPIKey = "err/key/missing",
    NoAuthorization = "err/auth/missing",
    VaultInvalidState = "err/vault/invalidState"
}

export interface OTP {
    entryID: EntryID;
    entryProperty: string;
    entryTitle: string;
    loginURL: string | null;
    otpTitle?: string;
    otpURL: string;
    sourceID: VaultSourceID;
}

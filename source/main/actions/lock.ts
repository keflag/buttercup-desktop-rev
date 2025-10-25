import { VaultSourceID } from "Buttercup-Rev";
import { lockSource } from "../services/Buttercup-Rev";
import { logInfo } from "../library/log";

export async function lockSourceWithID(sourceID: VaultSourceID) {
    await lockSource(sourceID);
    logInfo(`Locked source: ${sourceID}`);
}

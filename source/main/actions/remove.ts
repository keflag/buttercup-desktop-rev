import { VaultSourceID } from "Buttercup-Rev";
import { lockSource, removeSource } from "../services/Buttercup-Rev";
import { logInfo } from "../library/log";
import { removeVaultSettings } from "../services/config";

export async function removeSourceWithID(sourceID: VaultSourceID) {
    await lockSource(sourceID);
    await removeSource(sourceID);
    await removeVaultSettings(sourceID);
    logInfo(`Removed source: ${sourceID}`);
}

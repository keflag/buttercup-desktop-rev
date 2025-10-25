import { VaultFacade, VaultSourceID } from "Buttercup-Rev";
import { getVaultFacadeBySource } from "./Buttercup-Rev";

const __cachedFacades: Record<VaultSourceID, VaultFacade> = {};

export function cacheFacade(sourceID: VaultSourceID, vaultFacade: VaultFacade): void {
    __cachedFacades[sourceID] = vaultFacade;
}

export function clearFacadeCache(sourceID: VaultSourceID): void {
    delete __cachedFacades[sourceID];
}

export function getVaultFacade(sourceID: VaultSourceID): VaultFacade {
    if (!__cachedFacades[sourceID]) {
        cacheFacade(sourceID, getVaultFacadeBySource(sourceID));
    }
    return __cachedFacades[sourceID];
}

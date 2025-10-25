import { ipcRenderer } from "electron";
import { VaultSourceID } from "Buttercup-Rev";
import { VAULTS_STATE } from "../state/vaults";

export async function removeVaultSource(sourceID: VaultSourceID) {
    if (sourceID === VAULTS_STATE.currentVault) {
        VAULTS_STATE.currentVault = null;
    }
    ipcRenderer.send(
        "remove-source",
        JSON.stringify({
            sourceID
        })
    );
}

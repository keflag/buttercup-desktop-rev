import fs from "fs/promises";
import { VaultSourceID } from "buttercup";
import { getConfigStorage, getVaultSettingsPath, getVaultSettingsStorage } from "./storage";
import { naiveClone } from "../../shared/library/clone";
import { logErr, logInfo } from "../library/log";
import { runConfigMigrations } from "./migration";
import { PREFERENCES_DEFAULT, VAULT_SETTINGS_DEFAULT } from "../../shared/symbols";
import { Config, VaultSettingsLocal } from "../types";

const DEFAULT_CONFIG: Config = {
    browserClients: {},
    browserPrivateKey: null,
    browserPublicKey: null,
    fileHostKey: null,
    isMaximised: false,
    preferences: naiveClone(PREFERENCES_DEFAULT),
    selectedSource: null,
    windowHeight: 600,
    windowWidth: 800,
    windowX: null,
    windowY: null
};

export async function getConfigValue<K extends keyof Config>(key: K): Promise<Config[K]> {
    const storage = getConfigStorage();
    const value = await storage.getValue(key);
    return typeof value === "undefined" || value === null ? DEFAULT_CONFIG[key] || null : value;
}

export async function getVaultSettings(sourceID: VaultSourceID): Promise<VaultSettingsLocal> {
    const storage = getVaultSettingsStorage(sourceID);
    const keys = await storage.getAllKeys();
    if (keys.length === 0) return naiveClone(VAULT_SETTINGS_DEFAULT);
    const settings = await storage.getValues(keys);
    return settings as unknown as VaultSettingsLocal;
}

export async function initialise(): Promise<void> {
    // Initialise config
    const storage = getConfigStorage();
    const config = (await storage.getValues()) as unknown as Config;
    // Run migrations
    const [updatedConfig, didMigrate] = runConfigMigrations(config);
    if (didMigrate) {
        logInfo("Detected config migration changes");
        await storage.setValues(updatedConfig);
    }
    // Fill empty config values
    for (const key in DEFAULT_CONFIG) {
        const configKey = key as keyof Config;
        if (typeof config[configKey] === "undefined") {
            // Fill value
            await setConfigValue(configKey, DEFAULT_CONFIG[configKey]);
        }
    }
    // Initialise preferences
    const preferences = naiveClone(await getConfigValue("preferences"));
    for (const key in PREFERENCES_DEFAULT) {
        if (PREFERENCES_DEFAULT.hasOwnProperty(key) && typeof preferences[key] === "undefined") {
            logInfo(`Adding new preference key: ${key} => ${PREFERENCES_DEFAULT[key]}`);
            preferences[key] = PREFERENCES_DEFAULT[key];
        }
    }
    // Save preferences
    await setConfigValue("preferences", preferences);
}

export async function removeVaultSettings(sourceID: VaultSourceID): Promise<void> {
    const path = getVaultSettingsPath(sourceID);
    try {
        await fs.unlink(path);
    } catch (err) {
        logErr(`Failed removing vault settings: ${sourceID}`, err);
    }
}

export async function setConfigValue<K extends keyof Config>(
    key: K,
    value: Config[K]
): Promise<void> {
    const storage = getConfigStorage();
    await storage.setValue(key, value);
}

export async function setVaultSettings(
    sourceID: VaultSourceID,
    settings: VaultSettingsLocal
): Promise<void> {
    const storage = getVaultSettingsStorage(sourceID);
    await storage.setValues(settings);
}

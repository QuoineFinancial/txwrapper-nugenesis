import {
	getRegistryBase,
	GetRegistryOptsCore,
	getSpecTypes,
	TypeRegistry,
} from '@substrate/txwrapper-core';
import { methods as substrateMethods } from '@substrate/txwrapper-substrate';


// Export methods of pallets included in the Polkadot, Kusama, Westend, Rococo
// and State{mint, mine} runtimes.
// Note: in the future this may also include methods defined within this package
// that do not exist in Substrate.
export const methods = {
	balances: substrateMethods.balances,
	utility: substrateMethods.utility,
	proxy: substrateMethods.proxy,
	democracy: substrateMethods.democracy,
	session: substrateMethods.session,
	staking: substrateMethods.staking,
	system: substrateMethods.system,
	vesting: substrateMethods.vesting,
	multisig: substrateMethods.multisig,
	// assets is only applicable to State{mint, mine}
	assets: substrateMethods.assets,
};

// Re-export all of txwrapper-core so users have access to utilities, construct functions,
// decode function, and types.
export * from '@substrate/txwrapper-core';

/**
 * `ChainProperties` for networks that txwrapper-polkadot supports. These are normally returned
 * by `system_properties` call, but since they don't change much, it's pretty safe to hardcode them.
 */
const KNOWN_CHAIN_PROPERTIES = {
	nucoin: {
		ss58Format: 42,
		tokenDecimals: 18,
		tokenSymbol: 'NUC',
	},
};

// We override the `specName` property of `GetRegistryOptsCore` in order to get narrower type specificity,
// hopefully creating a better experience for users.
/**
 * Options for txwrapper-polkadot's `getRegistry` function.
 */
export interface GetRegistryOpts extends GetRegistryOptsCore {
	specName: keyof typeof KNOWN_CHAIN_PROPERTIES;
}

/**
 * Get a type registry for networks that txwrapper-polkadot supports.
 *
 * @param GetRegistryOptions specName, chainName, specVersion, and metadataRpc of the current runtime
 */
export function getRegistry({
	specName,
	chainName,
	specVersion,
	metadataRpc,
	properties,
	asCallsOnlyArg,
}: GetRegistryOpts): TypeRegistry {
	// The default type registry has polkadot types
	const registry = new TypeRegistry();
	registry.setKnownTypes({
		types: {
			"Address": "AccountId",
			"LookupSource": "AccountId",
			"PeerId": "(Vec<u8>)",
		}
	});

	return getRegistryBase({
		chainProperties: properties || KNOWN_CHAIN_PROPERTIES[specName],
		specTypes: getSpecTypes(
			registry,
			chainName,
			specName,
			specVersion
		),
		metadataRpc,
		asCallsOnlyArg,
	});
}

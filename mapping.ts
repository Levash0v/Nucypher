import { BigInt } from "@graphprotocol/graph-ts"
import {
  Worklock,
  Bid,
  BiddersChecked,
  Canceled,
  Claimed,
  CompensationWithdrawn,
  Deposited,
  ForceRefund,
  OwnershipTransferred,
  Refund,
  Shutdown
} from "../generated/Worklock/Worklock"
import { Depo, CancelDepo } from "../generated/schema"

export function handleBid(event: Bid): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Depo.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Depo(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = entity.count + BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.sender = event.params.sender
  entity.depositedETH = event.params.depositedETH

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.SLOWING_REFUND(...)
  // - contract.bidders(...)
  // - contract.bonusETHSupply(...)
  // - contract.boostingRefund(...)
  // - contract.claim(...)
  // - contract.compensation(...)
  // - contract.endBidDate(...)
  // - contract.endCancellationDate(...)
  // - contract.escrow(...)
  // - contract.ethToTokens(...)
  // - contract.ethToWork(...)
  // - contract.getAvailableRefund(...)
  // - contract.getBiddersLength(...)
  // - contract.getRemainingWork(...)
  // - contract.isClaimingAvailable(...)
  // - contract.isOwner(...)
  // - contract.maxAllowableLockedTokens(...)
  // - contract.minAllowableLockedTokens(...)
  // - contract.minAllowedBid(...)
  // - contract.nextBidderToCheck(...)
  // - contract.owner(...)
  // - contract.refund(...)
  // - contract.stakingPeriods(...)
  // - contract.startBidDate(...)
  // - contract.token(...)
  // - contract.tokenSupply(...)
  // - contract.verifyBiddingCorrectness(...)
  // - contract.workInfo(...)
  // - contract.workToETH(...)
}

export function handleBiddersChecked(event: BiddersChecked): void {}

export function handleCanceled(event: Canceled): void {
  let entity = CancelDepo.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new CancelDepo(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.sender = event.params.sender
  entity.value = event.params.value

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleClaimed(event: Claimed): void {}

export function handleCompensationWithdrawn(
  event: CompensationWithdrawn
): void {}

export function handleDeposited(event: Deposited): void {}

export function handleForceRefund(event: ForceRefund): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleRefund(event: Refund): void {}

export function handleShutdown(event: Shutdown): void {}

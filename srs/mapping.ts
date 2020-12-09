import { BigInt } from "@graphprotocol/graph-ts"
import {
  Worklock,
  Bid,
  Canceled
} from "../generated/Worklock/Worklock"
import { Depo, CancelDepo } from "../generated/schema"

export function handleBid(event: Bid): void {
  let entity = Depo.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new Depo(event.transaction.from.toHex())
    entity.count = BigInt.fromI32(0)
  }
  
  entity.count = entity.count + BigInt.fromI32(1)
  entity.sender = event.params.sender
  entity.depositedETH = event.params.depositedETH
  entity.save()
}

export function handleCanceled(event: Canceled): void {
  let entity = CancelDepo.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new CancelDepo(event.transaction.from.toHex())
    entity.count = BigInt.fromI32(0)
  }
  
  entity.count = entity.count + BigInt.fromI32(1)
  entity.sender = event.params.sender
  entity.value = event.params.value
  entity.save()
}

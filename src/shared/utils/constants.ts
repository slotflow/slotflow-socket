import { IdType } from "./types";

export const PREFIX_MAP: Record<IdType, string> = {
  [IdType.EVENT]: "sf_evt_",
  [IdType.TRANSACTION]: "sf_trx_",
  [IdType.ROOM]: "sf_room_",
  [IdType.IDEMPOTENCY]: "sf_idem_",
  [IdType.FILE]: "sf_file_",
};
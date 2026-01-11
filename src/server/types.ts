import { NeonDbError } from "@neondatabase/serverless";
import { DrizzleQueryError } from "drizzle-orm";

export type NeonDrizzleQueryError = DrizzleQueryError & {
	cause: NeonDbError;
};

export function isNeonDrizzleQueryError(
	err: unknown,
): err is NeonDrizzleQueryError {
	return err instanceof DrizzleQueryError && err.cause instanceof NeonDbError;
}

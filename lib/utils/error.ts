export const throwExtensionError = (allowed: readonly string[], ext?: string) => {
  throw new Error(
    `Error: unexpected extensions! Extension should be only be ${allowed.join(", ")}. Extension ${ext} is not currently supported!`,
  );
};

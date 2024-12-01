export const extensionError = (allowed: readonly string[], ext?: string) => {
  return `Error: unexpected extensions! Extension should be only be ${allowed.join(", ")}. Extension ${ext} is not currently supported!`;
};

export const resourceError = (resource?: string) => {
  return `Error: couldn't find resource! Resource ${resource} isn't available!`;
};

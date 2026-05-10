/**
 * Auth client stub: better-auth was removed from dependencies.
 * Panels using useSession behave as logged-out until auth is wired again.
 */
export const authClient = {
  useSession: () =>
    ({
      data: null as null,
      isPending: false,
    }) as const,
};

export async function getAuthUserById(_userId: string): Promise<null> {
  return null;
}

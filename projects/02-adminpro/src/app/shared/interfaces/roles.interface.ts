

export const roles = ['USER_ROLE', 'ADMIN_ROLE'] as const;
/**
 * ? Posibles roles de la app
 * @export
 * @typedef {Roles}
 */
export type Roles = typeof roles[number];

import env from 'env-var';

export const port = env.get('PORT').default('3000').asIntPositive();
export const host = env.get('HOST').default('0.0.0.0').asString();
export const logLevel = env.get('LOG_LEVEL').default('info').asString();
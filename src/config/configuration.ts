export default () => ({
    port: (process.env.PUBLIC_API_PORT) || 3000,
    node_env: process.env.NODE_ENV,
    resend_api_key: process.env.RESEND_API_KEY
});
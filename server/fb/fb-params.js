module.exports = (function() {
    // Setup Messenger API parameters from environment
    const FB_PAGE_ID    = process.env.FB_PAGE_ID;
    const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
    const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN;
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
    const FB_APP_SECRET = process.env.FB_APP_SECRET;

    // Sanity checks for availability of Messenger API parameters
    (function doSanityChecks() {
        if (!FB_PAGE_ID) { throw new Error('missing FB_PAGE_ID') }
        if (!FB_PAGE_TOKEN) { throw new Error('missing FB_PAGE_TOKEN') }
        if (!FB_APP_SECRET) { throw new Error('missing FB_APP_SECRET') }
    })();

    return {
        FB_PAGE_ID : FB_PAGE_ID,
        B_PAGE_ACCESS_TOKEN: B_PAGE_ACCESS_TOKEN,
        FB_PAGE_TOKEN: FB_PAGE_TOKEN,
        PAGE_ACCESS_TOKEN: PAGE_ACCESS_TOKEN,
        FB_APP_SECRET: FB_APP_SECRET
    };
});
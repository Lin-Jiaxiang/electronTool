module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                appId: 'lin.com',
                productName: "实用工具",
                win: {
                    icon: 'public/tool.png',
                    target: ["zip", "nsis"]
                }
            },
            preload: "src/preload.js",
            mainProcessTypeChecking: false,
        }
    }
}

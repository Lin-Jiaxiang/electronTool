module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                appId: 'lin.com',
                productName: "实用工具",
                icon: "public/windows.ico",
                win: {
                    icon: 'public/windows.ico',
                    target: ["zip", "nsis"]
                }
            },
            preload: "src/preload.js",
            mainProcessTypeChecking: false,
        }
    }
}

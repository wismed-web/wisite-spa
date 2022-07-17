const webpack = require("webpack");
// const AutoImport = require('unplugin-auto-import/dist/webpack')
// const Components = require('unplugin-vue-components/dist/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/dist/resolvers')
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            }),
            // AutoImport({
            //     resolvers: [ElementPlusResolver()]
            // }),
            // Components({
            //     resolvers: [ElementPlusResolver()]
            // })
        ]
    },
    devServer: {
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        },
    }
}
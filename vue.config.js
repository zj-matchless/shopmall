const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@assets',
                'common': '@common',
                'network': '@network',
                'components': '@components',
                'views': '@views'
            }
        }
    }
})
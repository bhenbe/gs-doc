//const pluginTailwind = require('eleventy-plugin-tailwindcss');
const i18n = require('eleventy-plugin-i18n');

module.exports = (config) => {
    /*config.addPlugin(pluginTailwind, {
        src: 'src/assets/css/*',
        configFile: 'tailwind.config.js'
    });

    config.setDataDeepMerge(true);*/
    config.addPassthroughCopy('./src/assets/css/styles.css');
    config.addPassthroughCopy('src/assets/img/**/*');
    config.addWatchTarget("src/assets/js/");
    config.addPassthroughCopy('./.htaccess');

    config.addPlugin(i18n, {
        translations: {
            User: {
                'fr': 'Utilisateur',
                'en': 'User'
            },
            Administrator: {
                'fr': 'Administrateur',
                'en': 'Administrator'
            },
            Productor: {
                'fr': 'Producteur',
                'en': 'Productor'
            },
            RelatedPosts: {
                'fr': 'À lire aussi',
                'en': 'See also'
            },
            BackToHome: {
                'fr': 'Retour à l\'accueil',
                'en': 'Back to homepage'
            }
        },
        fallbackLocales: {
          '*': 'fr'
        }
    });

    config.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, bs) {
                bs.addMiddleware('*', (req, res) => {
                    if (req.url === '/') {
                        res.writeHead(302, {
                            location: '/fr/'
                        });
                        res.end();
                    }
                });
            }
        }
    });

    // Create the filter function.
    function sortByOrder(values) {
        let vals = [...values]
        return vals.sort((a, b) => Math.sign(a.data.order - b.data.order))
    }

    // Add the filter.
    config.addFilter('sortByOrder', sortByOrder)

    return {
        templateFormats: ["md", "html", "njk"],
        dir: {
            input: 'src'
        }
    }
};
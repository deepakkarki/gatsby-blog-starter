module.exports = {
  siteMetadata: {
    title: 'Portfolio',
  },
  plugins: [
    'gatsby-plugin-react-helmet',


    // plugin-manifest & -offline is for PWA useage, no need right now
    // Need to fix the variables here - name, color and icon
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: 'portfolio',
    //     short_name: 'portfolio',
    //     start_url: '/',
    //     background_color: '#663399',
    //     theme_color: '#663399',
    //     display: 'minimal-ui',
    //     icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
    //   },
    // },
    // 'gatsby-plugin-offline',
  ],
}

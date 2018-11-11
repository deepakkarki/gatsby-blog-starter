# Discover dev site

This is the website for [DiscoverDev](https://discoverdev.io), implemented using GatsbyJS.

This also serves as an example for a feature rich app. Gatsby on it's own is just a content ingestion engine, there is no inherent structure to the system. So I've created a system where there is the site itself (Gatsby default), blogs within the site, and categories and series within the blog. A series can have posts within it and a post can belong to multiple categories. I really like this structure, should turn it into a starter theme at some point.

There is quite a bit of documentation in the `gatsby-node.js` file, inlined with the functions. Copying from there,

### URL schemes

 * `/blog/` --> index page for the blog. (a .js file - auto converted)
    This will have the overall listing of the series, categories, posts, etc.
    This needs the posts & pages, series & categories (with their posts under them)
    Pages are markdown (or .js?)  files which are not posts, i.e. they don’t appear in the feed.
    Posts are... well, blog posts that is supposed to appear in the feed.
    The series variable will hold the series under this sub blog along with the posts belonging to each series.


 * `/blog/posts` --> index page for the blog post listing
    This needs to display all the posts within the sub-blog. Also support pagination.
 * `/blog/posts/2` --> pagination of the blog post listing
 * `/blog/posts/pname` --> a specific blog post


 * `/blog/series` --> index page of all the series in the (sub)blog
    Needs all series and all the posts under each series. Also do pagination.
 * `/blog/series/sname` --> listing of all the posts in this series
 * `/blog/series/sname/2` --> (optional) pagination of the listing in a series
 * `/blog/series/sname/pname` --> a specific blog post


 * `/blog/categories` --> index page for the category 
    Needs all the categories in the sub blog and posts in the categories
 * `/blog/categories/cname` --> listing of all posts in this category
 * `/blog/categories/cname/2` --> pagination of the listing in a category


### MarkDown 

The markdown uses custom element support (at least <a> --> <Link> for internal links)
 - https://using-remark.gatsbyjs.org/custom-components/ (look at the caveats)
 - https://prestonrichey.com/blog/react-in-markdown/ (look at <hidden/>)

 Each markdown page will contain the type and layout.
  * `type` => `page` or `post` or `meta`. Files with `type: post` appear in the blog stream, `type: page` implies it shouldn't appear in the stream. Meta files are `index.md`'s that are used for pagination metadata
  * `layout` => which ever template is to be applied
  * `published` => True or False.


### Page Creation

 So now this should mirror the output of the URLs I expect.

 * all posts - do the standard markdown remark processing for all .md nodes.

 * `/blog/` - create the index page. => auto since it's .js files. (better have js
    files rather than template, as you can customize the UI per sub-blog)
    this will have to do the query for posts, pages, series, collection itself.
 * `/blog/(page)` - like /about, /contact and stuff - this should be done via the
    standard markdown remark rendering I will be doing.

 * `blog/posts/[n]` - this I have to paginate, filter the nodes via query and then
    send them to templates/post-index.js, do this in a loop (posts/2, /3, etc)
    Can I somehow add some specific data to be rendered (at top or whatever?)
 * `blog/posts/pname` - this is should be part of the generic markdown remark processing.

 * `blog/series` - This will be an index.js file just like blog's index.js. Again, 
   just run the query inside the .js file. Or have template/series-index.js?
   Could come in handy for future pagination if required.
 * `blog/series/sname/[n]` - this is again paginated. So again loop and render a template file
    Again worth noting if I can have an index.md file or something that can add specific
    data or context to the page being rendered. (explaining a bit about the series)
    (XXX : actually this isn't required? how many posts can there be in a series anyway)
 * `blog/series/sname/pname` - this should be part of the generic markdown remark processing

 * `/blog/categories` - Again this will be an index.js file, query what it needs.
 * `/blog/categories/cname/[n]` - pagination. Loop and render a template file.
    again, would be good if I can have a little custom data per category. 

  NOTE : In case of custom data for paginated entries, I can't have an index.md file,
  eg. "blog/categories/systems/index.md" as this will be rendered during markdownRemark
  processing. So unless I deal with this somehow during 'onCreateNode', this will be a mess.
  Other alternative is that I can have this in the site metadata.

  Never mind, this "blog/categories/systems/index.md" file just needs to mark 
  "render : false" in it's front-matter. See "MarkDown" section in the top comment.

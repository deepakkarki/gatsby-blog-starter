import React from 'react'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <h1>ABOUT</h1>

    <p>Discover dev was the idea that was conceived after days of brainstorming between a bunch of software engineers and researchers trying to better content creation and discovery. The problem was clear - we have an avalanche of technical articles, but most of them are about how to build the next to-do app or write a hello world application using the latest JS framework. Very few of them go into the innards of the tech stack - how things work and why they're designed as they are. We would like to see more developers and companies talk about the nitty gritties of their at scale infrastructure, software design trade-offs, performance, distribution and security aspects of their applications. While introductory texts are great, most forums are saturated with such content, which makes it hard for real engineering content to stand out from the noise. </p>

    <p>The solution was simple - a website that features just the most insightful engineering content from across the web. Nothing more. Sort of like a "Product Hunt" for engineering blogs. Our bot scours the internet - including 100's of engineering blogs, developer forums (HN, Reddit, Lobsters, etc) and blogging platforms like Medium. All the relevant content ingested into our ML system where it is processed and tagged. The final list before it's out goes through human eyes for a final quality check. A summary is added to each entry so you get to know what the post is about and whether you'd be interested in it! We plan to shortlist on a daily basis about ten to fifteen links that are worth your time.</p>

    <p>We believe that having such a discovery system will not only help end users but also authors of insightful technical articles. Hopefully this will also push the engineering teams some companies to write more and in greater depth. 
    Our team has one person working on this full time and and a few other chipping in part time. This is only our first step small towards creating an ecosystem better content creation and discovery, and we're excited to get this out to you! </p>

    <hr/>
    <p>
    You can reach out to us via email (<a href="mailto:makers@discoverdev.io">makers@discoverdev.io</a>) or on twitter <a href="https://twitter.com/discoverdev_io">@discoverdev_io</a>
    </p>
  </Layout>
)

export default IndexPage

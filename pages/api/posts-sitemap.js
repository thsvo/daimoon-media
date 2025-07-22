import { SitemapStream, streamToPromise } from 'sitemap';

const handler = async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    // List of blogs
    const blogResponse = await fetch(
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL + 'blogs/v1/overview'
    );
    const posts = await blogResponse.json();

    // Create each URL row
    posts.forEach((post) => {
      smStream.write({
        url: `/blogs/${post.slug}`,
        changefreq: 'daily',
        priority: 0.9,
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml',
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
};

export default handler;

import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './BlogPost.module.css';
import SEO from '../../components/SEO/SEO';

// This will be dynamically populated with blog data
interface BlogPostData {
  title: string;
  content: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
}

// Sample blog posts data - in production this would come from markdown files
const blogPosts: { [key: string]: BlogPostData } = {
  'adhd-entrepreneur-life-coach-raleigh': {
    title: 'Finding Your Perfect Life Coach as an ADHD Entrepreneur in Raleigh',
    content: `<div class="blog-content">
      <p><em>Dear beautiful soul, if you're reading this with seventeen browser tabs open while simultaneously planning your next business venture and wondering if you remembered to eat lunch—this one's for you.</em></p>
      
      <h2>You're Not Broken, You're Just Differently Wired</h2>
      <p>Let me start with something I wish someone had told me years ago: <strong>Your ADHD brain isn't a flaw to fix—it's a superpower that needs the right support system.</strong> As an entrepreneur with ADHD, you possess incredible creativity, hyperfocus abilities, and an innovative spirit that can move mountains. But sometimes, that same beautiful brain feels like it's working against you.</p>
      
      <p>If you're here in the Triangle area—whether you're a tech entrepreneur in Research Triangle Park, a creative business owner in Durham, or building something amazing from your Raleigh home office—you're part of a vibrant community of innovators. And like many of us, you might be realizing that traditional business advice doesn't quite fit your unique operating system.</p>
      
      <h2>Why Standard Business Coaching Falls Short for ADHD Entrepreneurs</h2>
      <p>Here's the thing: Most business coaching assumes a neurotypical brain. You know, the kind that can:</p>
      <ul>
        <li>Follow linear action plans without getting distracted by five other brilliant ideas</li>
        <li>Maintain consistent daily routines without feeling suffocated</li>
        <li>Process information the same way every time</li>
        <li>Manage time in neat, predictable blocks</li>
      </ul>
      
      <p>Sound familiar? If you've ever tried traditional coaching and felt like you were trying to fit a square peg into a round hole, you're not alone. Your ADHD brain needs an approach that honors how you actually think and work.</p>
      
      <h2>What to Look for in an ADHD-Friendly Life Coach</h2>
      
      <h3>1. Understanding of Neurodiversity</h3>
      <p>Your coach should speak fluent ADHD. They should understand:</p>
      <ul>
        <li>Why you might have brilliant insights at 2 AM</li>
        <li>How rejection sensitivity can impact your business decisions</li>
        <li>That your "all or nothing" tendencies are actually strengths when channeled properly</li>
        <li>Why traditional time management systems make you want to scream</li>
      </ul>
      
      <h3>2. Flexible, Holistic Approaches</h3>
      <p>Look for coaches who offer:</p>
      <ul>
        <li><strong>Body-based work</strong>: Your nervous system plays a huge role in focus and overwhelm</li>
        <li><strong>Environmental considerations</strong>: How your physical space affects your productivity</li>
        <li><strong>Energy management</strong> over time management</li>
        <li><strong>Customizable systems</strong> that work with your brain, not against it</li>
      </ul>
      
      <h2>Taking the Next Step</h2>
      <p>Beautiful human, your ADHD brain came equipped with incredible gifts. The right coach doesn't try to dim these lights—they help them shine brighter.</p>
      
      <p><em>Ready to explore what holistic, ADHD-friendly coaching might look like for you? I'd love to have a conversation about your dreams, challenges, and the kind of support that would feel most nurturing for your unique journey.</em></p>
    </div>`,
    date: '2026-01-27',
    author: 'Yoana Nin',
    category: 'Coaching',
    tags: ['ADHD', 'Entrepreneurs', 'Raleigh', 'Life Coaching'],
    excerpt: 'Discover what makes a life coach truly effective for ADHD entrepreneurs and how to find the right support in the Triangle area.'
  },
  'expat-community-triangle-area': {
    title: 'Building Your Village: A Guide to Finding Community as an Expat in the Triangle',
    content: `<div class="blog-content">
      <p><em>Sweet soul, if you're reading this while missing the familiar comfort of your homeland, wondering if you'll ever feel truly at home in a new place—I see you, I've been you, and you're going to be okay.</em></p>
      
      <h2>The Expat Heart Knows</h2>
      <p>There's a particular kind of loneliness that comes with being an expat—one that can't be solved by simply being around more people. It's the loneliness of inside jokes no one understands, of holidays that feel different, of explaining your cultural references, and sometimes just wanting someone who <em>gets it</em> without having to translate every part of your experience.</p>
      
      <p>If you've landed in North Carolina's Triangle area—whether through a job opportunity, love, adventure, or life's unexpected turns—you've chosen (or been chosen by) one of the most welcoming regions in the country. But knowing that intellectually doesn't always make the heart feel less homesick, does it?</p>
      
      <h2>Why the Triangle is Special for Expat Community</h2>
      <p>Here's what I've learned about our beautiful Triangle region: <strong>We're a community built by people from everywhere else.</strong> Research Triangle Park alone draws talented individuals from around the globe. Chapel Hill's university culture brings international perspectives. Durham's renaissance has attracted creative souls from far and wide. Raleigh's growth means we're all a little bit "new" here.</p>
      
      <p>This isn't just any American city—this is a place where being "from somewhere else" is actually the norm. And that, dear one, is your first gift.</p>
      
      <h2>The Gentle Art of Building Community</h2>
      
      <h3>Start Where You Are, With What You Have</h3>
      <p><strong>You don't need to transform into an extrovert overnight.</strong> Community building as an expat isn't about networking events and forced connections. It's about finding your people—slowly, authentically, with patience for the process.</p>
      
      <p>The Triangle area has welcomed so many beautiful families and individuals over the years. Your story is just beginning here, and with the right connections and support, this transition can become one of the most beautiful chapters of your life.</p>
      
      <p><em>Looking for support as you navigate building community in the Triangle area? I'd love to support your journey in creating connections that honor both where you've come from and where you're growing.</em></p>
    </div>`,
    date: '2026-01-26',
    author: 'Yoana Nin',
    category: 'Community',
    tags: ['Expat Life', 'Triangle Area', 'Community', 'Connection'],
    excerpt: 'Moving to a new place as an expat can feel isolating. Here\'s your gentle guide to creating meaningful connections in North Carolina\'s Triangle area.'
  },
  'holistic-life-coaching-guide': {
    title: 'What to Expect from Holistic Life Coaching: Your Journey to Wholeness',
    content: `<div class="blog-content">
      <p><em>Beautiful soul, if you've been feeling like traditional self-help approaches only scratch the surface of who you are—if you sense there's a deeper, more integrated way to create the life your heart is calling for—then this conversation is meant for you.</em></p>
      
      <h2>Beyond Band-Aid Solutions</h2>
      <p>You know that feeling when you read another productivity book or try another goal-setting system, and while it might work for a little while, it eventually falls apart because it doesn't address the <em>whole</em> of who you are? That's because <strong>you're not a machine to be optimized—you're a complex, beautiful human being with a mind, body, spirit, and environment that all dance together.</strong></p>
      
      <p>Holistic life coaching recognizes this truth. Instead of trying to fix isolated problems or force you into someone else's success formula, it honors the incredible interconnectedness of your entire being.</p>
      
      <h2>What "Holistic" Really Means</h2>
      <p>When we say "holistic," we're talking about seeing you as a <strong>whole person</strong>, not a collection of separate issues to solve. It means understanding that:</p>
      <ul>
        <li>Your body holds wisdom and memories that affect your decisions</li>
        <li>Your emotional patterns are connected to your physical well-being</li>
        <li>Your environment shapes your energy and possibilities</li>
        <li>Your spiritual connection influences everything else</li>
        <li>Your relationships and community are part of your wellness</li>
      </ul>
      
      <p>This isn't "woo-woo"—it's practical wisdom that's been around for thousands of years and is now backed by modern neuroscience and psychology.</p>
      
      <h2>What Holistic Coaching Creates</h2>
      <p>Holistic life coaching isn't about becoming a different person—it's about becoming more fully yourself. It's about integration, not perfection. It's about creating a life that feels good from the inside out, not just one that looks good on paper.</p>
      
      <p><em>Ready to explore what holistic transformation might look like for your unique journey? I'd love to have a conversation about your dreams, your challenges, and the kind of support that would feel most nurturing for your whole being.</em></p>
    </div>`,
    date: '2026-01-25',
    author: 'Yoana Nin',
    category: 'Coaching',
    tags: ['Holistic Coaching', 'Personal Growth', 'Wellness', 'Transformation'],
    excerpt: 'Curious about holistic life coaching? Let\'s explore what this transformative approach looks like and how it can support your entire being.'
  },
  'real-estate-agent-relocating-families': {
    title: 'Finding a Real Estate Professional Who Truly Understands Relocating Families',
    content: `<div class="blog-content">
      <p><em>Sweet mama, if you're sitting there surrounded by boxes, researching neighborhoods in a city you've never lived in, trying to make one of the biggest decisions of your family's life—I see you. Moving with little ones (or not-so-little ones) is one of life's most beautiful and overwhelming adventures.</em></p>
      
      <h2>When Home is More Than Four Walls</h2>
      <p>Here's what most people don't understand about family relocation: <strong>You're not just buying a house—you're choosing the backdrop for your children's memories, your family's daily rhythms, and your sense of belonging in a new place.</strong> It's about school districts and playgrounds, yes, but it's also about finding a neighborhood where you can picture your daughter riding her bike or your son walking to his best friend's house.</p>
      
      <p>The Triangle area of North Carolina—encompassing Raleigh, Durham, Chapel Hill, and the wonderful communities in between—has become home to thousands of relocating families. But with so many options and so much at stake, how do you find a real estate professional who truly understands what you need?</p>
      
      <h2>What Sets Family-Focused Agents Apart</h2>
      <p>A family-centered real estate professional will want to know:</p>
      <ul>
        <li>What does a typical Tuesday look like for your family?</li>
        <li>How do your kids spend their free time?</li>
        <li>What kind of community connections matter most to you?</li>
        <li>How important is walkability versus yard space?</li>
      </ul>
      
      <p>They understand that the perfect home for your family might not be the one with the best resale value—it's the one that supports how your family actually lives.</p>
      
      <h2>Your Family Deserves This</h2>
      <p>You deserve a real estate experience that honors the magnitude of what you're doing—not just changing addresses, but creating the foundation for your family's next chapter. <strong>The Triangle area is ready to welcome your family home.</strong></p>
      
      <p><em>Looking for support as you navigate family relocation to the Triangle area? Whether you need help processing the emotional aspects of moving or connecting with community resources, I'd love to support your family's transition.</em></p>
    </div>`,
    date: '2026-01-24',
    author: 'Yoana Nin',
    category: 'Real Estate',
    tags: ['Family Relocation', 'Triangle Area', 'Home Buying', 'Real Estate'],
    excerpt: 'Moving with your family is about more than finding a house—it\'s about finding home. Here\'s what to look for in a real estate professional who gets it.'
  }
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !blogPosts[slug]) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Blog Post Not Found</h1>
          <p>Sorry, we couldn't find the blog post you're looking for.</p>
          <a href="/blog" className="btn btn-primary">Back to Blog</a>
        </div>
      </div>
    );
  }
  
  const post = blogPosts[slug];
  
  return (
    <article className={styles.blogPost} data-category={post.category}>
      <SEO 
        title={`${post.title} | Yoana Nin Coaching`}
        description={post.excerpt}
        url={`https://yoananincoaching.com/blog/${slug}`}
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "datePublished": post.date,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://yoananincoaching.com/blog/${slug}`
          },
          "publisher": {
            "@type": "Organization",
            "name": "Yoana Nin Coaching",
            "logo": {
              "@type": "ImageObject",
              "url": "https://yoananincoaching.com/metaOG.png"
            }
          }
        })}
      />
      <div className={styles.container}>
        <header className={styles.postHeader}>
          <div className={styles.postMeta}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.date}>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <div className={styles.postInfo}>
            <span>By {post.author}</span>
            <div className={styles.tags}>
              {post.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </header>
        
        <div className={styles.postContent}>
          {slug === 'adhd-entrepreneur-life-coach-raleigh' && (
            <div>
              <p><em>Dear beautiful soul, if you're reading this with seventeen browser tabs open while simultaneously planning your next business venture and wondering if you remembered to eat lunch—this one's for you.</em></p>
              
              <h2>You're Not Broken, You're Just Differently Wired</h2>
              <p>Let me start with something I wish someone had told me years ago: <strong>Your ADHD brain isn't a flaw to fix—it's a superpower that needs the right support system.</strong> As an entrepreneur with ADHD, you possess incredible creativity, hyperfocus abilities, and an innovative spirit that can move mountains. But sometimes, that same beautiful brain feels like it's working against you.</p>
              
              <p>If you're here in the Triangle area—whether you're a tech entrepreneur in Research Triangle Park, a creative business owner in Durham, or building something amazing from your Raleigh home office—you're part of a vibrant community of innovators. And like many of us, you might be realizing that traditional business advice doesn't quite fit your unique operating system.</p>
              
              <h2>What to Look for in an ADHD-Friendly Life Coach</h2>
              <p>Your coach should speak fluent ADHD and understand how your beautiful brain actually works. Look for coaches who offer flexible, holistic approaches that work with your brain, not against it.</p>
              
              <p><em>Ready to explore what holistic, ADHD-friendly coaching might look like for you? I'd love to have a conversation about your dreams, challenges, and the kind of support that would feel most nurturing for your unique journey.</em></p>
            </div>
          )}
          
          {slug === 'expat-community-triangle-area' && (
            <div>
              <p><em>Sweet soul, if you're reading this while missing the familiar comfort of your homeland, wondering if you'll ever feel truly at home in a new place—I see you, I've been you, and you're going to be okay.</em></p>
              
              <h2>The Expat Heart Knows</h2>
              <p>There's a particular kind of loneliness that comes with being an expat—one that can't be solved by simply being around more people. It's the loneliness of inside jokes no one understands, of holidays that feel different, of explaining your cultural references.</p>
              
              <h2>Why the Triangle is Special for Expat Community</h2>
              <p>Here's what I've learned about our beautiful Triangle region: <strong>We're a community built by people from everywhere else.</strong> Research Triangle Park alone draws talented individuals from around the globe. This isn't just any American city—this is a place where being "from somewhere else" is actually the norm.</p>
              
              <p>The Triangle area has welcomed so many beautiful families and individuals over the years. Your story is just beginning here, and with the right connections and support, this transition can become one of the most beautiful chapters of your life.</p>
            </div>
          )}
          
          {slug === 'holistic-life-coaching-guide' && (
            <div>
              <p><em>Beautiful soul, if you've been feeling like traditional self-help approaches only scratch the surface of who you are—if you sense there's a deeper, more integrated way to create the life your heart is calling for—then this conversation is meant for you.</em></p>
              
              <h2>Beyond Band-Aid Solutions</h2>
              <p>You know that feeling when you read another productivity book or try another goal-setting system, and while it might work for a little while, it eventually falls apart because it doesn't address the <em>whole</em> of who you are? That's because <strong>you're not a machine to be optimized—you're a complex, beautiful human being.</strong></p>
              
              <h2>What "Holistic" Really Means</h2>
              <p>When we say "holistic," we're talking about seeing you as a <strong>whole person</strong>, not a collection of separate issues to solve. Your body holds wisdom, your emotions are connected to your physical well-being, and your environment shapes your possibilities.</p>
              
              <p>Holistic life coaching isn't about becoming a different person—it's about becoming more fully yourself. It's about integration, not perfection.</p>
            </div>
          )}
          
          {slug === 'real-estate-agent-relocating-families' && (
            <div>
              <p><em>Sweet mama, if you're sitting there surrounded by boxes, researching neighborhoods in a city you've never lived in, trying to make one of the biggest decisions of your family's life—I see you.</em></p>
              
              <h2>When Home is More Than Four Walls</h2>
              <p>Here's what most people don't understand about family relocation: <strong>You're not just buying a house—you're choosing the backdrop for your children's memories, your family's daily rhythms, and your sense of belonging in a new place.</strong></p>
              
              <p>The Triangle area of North Carolina has become home to thousands of relocating families. With so many options and so much at stake, how do you find a real estate professional who truly understands what you need?</p>
              
              <h2>What Sets Family-Focused Agents Apart</h2>
              <p>A family-centered real estate professional will want to know about your family's lifestyle, not just your budget. They understand that the perfect home supports how your family actually lives.</p>
              
              <p><strong>The Triangle area is ready to welcome your family home.</strong> With the right support and the right place, this transition can become one of the most beautiful chapters of your family's story.</p>
            </div>
          )}
          
          {!['adhd-entrepreneur-life-coach-raleigh', 'expat-community-triangle-area', 'holistic-life-coaching-guide', 'real-estate-agent-relocating-families'].includes(slug || '') && (
            <div>
              <p>Blog post content coming soon...</p>
            </div>
          )}
        </div>
        
        <footer className={styles.postFooter}>
          <div className={styles.backToBlog}>
            <a href="/blog" className={styles.backLink}>← Back to Insights & Inspiration</a>
          </div>
          
          <div className={styles.callToAction}>
            <h3>Ready to Begin Your Journey?</h3>
            <p>If this resonates with you, I'd love to support you in creating the life your heart is calling for.</p>
            <a href="/contact" className="btn btn-primary">Let's Connect</a>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogPost;
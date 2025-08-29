import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = new User({
      username: 'admin',
      email: 'admin@blogsphere.com',
      password: 'admin123',
      role: 'admin',
      bio: 'Platform administrator and content curator',
      profilePicture: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200'
    });
    await admin.save();
    console.log('Created admin user');

    // Create sample users
    const users = [];
    const sampleUsers = [
      {
        username: 'alexwriter',
        email: 'alex@example.com',
        password: 'password123',
        bio: 'Digital storyteller passionate about technology and human connection',
        profilePicture: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200'
      },
      {
        username: 'mariablog',
        email: 'maria@example.com',
        password: 'password123',
        bio: 'Creative director and lifestyle blogger sharing inspiration daily',
        profilePicture: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=200'
      },
      {
        username: 'davidtech',
        email: 'david@example.com',
        password: 'password123',
        bio: 'Software engineer and entrepreneur building the next generation of apps',
        profilePicture: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200'
      },
      {
        username: 'sophiacreates',
        email: 'sophia@example.com',
        password: 'password123',
        bio: 'UX designer and content creator helping brands tell better stories',
        profilePicture: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=200'
      }
    ];

    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      users.push(user);
    }
    console.log('Created sample users');

    // Create sample posts with new content
    const samplePosts = [
      {
        title: 'The Future of AI-Powered Content Creation',
        body: `Artificial Intelligence is revolutionizing how we create, edit, and distribute content. From automated writing assistants to AI-generated visuals, the landscape of digital content is evolving at breakneck speed.

## The Rise of AI Writing Tools

Modern AI writing tools have moved beyond simple grammar checking. They now offer:

- **Content ideation** - Generate topic ideas based on trending keywords
- **Style adaptation** - Match your brand voice and tone
- **SEO optimization** - Automatically optimize for search engines
- **Multi-language support** - Create content in dozens of languages

## Impact on Creative Industries

The creative industry is experiencing a paradigm shift. Writers, designers, and marketers are learning to collaborate with AI rather than compete against it.

### For Content Creators

AI tools are becoming the new creative partner:
- Faster ideation and brainstorming
- Enhanced research capabilities
- Automated formatting and optimization
- Real-time collaboration features

### For Businesses

Companies are leveraging AI to scale their content operations:
- Personalized content at scale
- Automated social media management
- Dynamic website content
- Customer-specific messaging

## The Human Element

Despite AI's capabilities, human creativity remains irreplaceable. The most successful content combines AI efficiency with human insight, emotion, and authentic storytelling.

The future belongs to creators who embrace AI as a powerful tool while maintaining their unique voice and perspective. Are you ready to join this revolution?`,
        author: users[0]._id,
        tags: ['ai', 'technology', 'content-creation', 'future'],
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'published'
      },
      {
        title: 'Building Authentic Connections in the Digital Age',
        body: `In our hyper-connected world, authentic relationships have become more valuable than ever. Social media promised to bring us closer, but many feel more isolated than before. How do we build genuine connections in the digital space?

## The Authenticity Crisis

Modern social platforms often encourage performative behavior over genuine interaction. Users curate perfect lives, leading to:

- Comparison culture and decreased self-esteem
- Surface-level interactions without depth
- Fear of vulnerability and genuine expression
- Echo chambers that limit diverse perspectives

## Strategies for Authentic Digital Connection

### 1. Share Your Real Story

Don't just share your highlights. Include:
- Challenges you've overcome
- Lessons learned from failures
- Behind-the-scenes moments
- Genuine emotions and thoughts

### 2. Engage Meaningfully

Quality over quantity in interactions:
- Ask thoughtful questions
- Share personal experiences in comments
- Offer genuine support and encouragement
- Listen more than you speak

### 3. Create Safe Spaces

Foster environments where others feel comfortable being authentic:
- Moderate discussions respectfully
- Celebrate diverse perspectives
- Address negativity constructively
- Lead by example with vulnerability

## The Power of Storytelling

Stories connect us on a fundamental human level. When we share our experiences, struggles, and triumphs, we create bridges of understanding that transcend digital barriers.

### Elements of Compelling Stories

- **Vulnerability** - Share what matters to you
- **Relatability** - Connect to universal experiences
- **Growth** - Show transformation and learning
- **Hope** - Inspire others with possibility

## Building Your Digital Community

Creating authentic connections isn't about follower counts—it's about impact. Focus on:

- Consistency in your values and message
- Regular, meaningful engagement
- Supporting others' growth and success
- Being genuinely interested in your audience

The digital age offers unprecedented opportunities for connection. By choosing authenticity over perfection, we can build relationships that enrich our lives and create positive change in the world.`,
        author: users[1]._id,
        tags: ['authenticity', 'digital-connection', 'social-media', 'relationships'],
        image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'published'
      },
      {
        title: 'The Art of Minimalist Design in Modern Web Development',
        body: `Minimalism in web design isn't just about using white space—it's a philosophy that prioritizes user experience through intentional simplicity. Let's explore how minimalist principles can transform your digital products.

## Core Principles of Minimalist Design

### Less is More

Every element on your page should serve a purpose:
- Remove unnecessary decorative elements
- Focus on essential functionality
- Use whitespace strategically
- Prioritize content hierarchy

### Typography as a Design Element

In minimalist design, typography carries more weight:
- Choose fonts that reflect your brand personality
- Use font weights and sizes to create hierarchy
- Ensure excellent readability across devices
- Limit yourself to 2-3 font families maximum

## Color Psychology in Minimal Design

Color choices become more impactful when you use fewer of them:

### Monochromatic Schemes
- Create depth through shades and tints
- Maintain visual cohesion
- Direct attention effectively
- Reduce cognitive load

### Accent Colors
- Use sparingly for calls-to-action
- Choose colors that align with your brand
- Ensure sufficient contrast for accessibility
- Test across different devices and lighting

## User Experience Benefits

Minimalist design directly improves UX:

### Faster Load Times
- Fewer assets to download
- Optimized images and graphics
- Cleaner code structure
- Better performance metrics

### Improved Focus
- Users can find what they need quickly
- Reduced decision fatigue
- Clear navigation paths
- Enhanced conversion rates

### Mobile-First Approach
- Naturally responsive design
- Touch-friendly interfaces
- Readable content on small screens
- Faster mobile performance

## Implementation Strategies

### Start with Content
1. Audit your existing content
2. Identify core messages
3. Remove redundant information
4. Organize by importance

### Design Systems
- Create consistent spacing rules
- Establish color palettes
- Define typography scales
- Build reusable components

### Testing and Iteration
- A/B test different layouts
- Gather user feedback
- Monitor analytics
- Continuously refine

## Common Pitfalls to Avoid

- **Over-simplification** - Don't remove essential functionality
- **Lack of personality** - Minimal doesn't mean boring
- **Poor accessibility** - Ensure your design works for everyone
- **Ignoring context** - Consider your audience and industry

Minimalist design is about making deliberate choices. Every element should enhance the user's journey toward their goal. When done right, minimalism creates elegant, efficient, and memorable digital experiences.

Remember: Simplicity is the ultimate sophistication.`,
        author: users[2]._id,
        tags: ['design', 'minimalism', 'web-development', 'ux'],
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'published'
      },
      {
        title: 'Mastering the Creator Economy: From Passion to Profit',
        body: `The creator economy has exploded into a trillion-dollar industry, offering unprecedented opportunities for individuals to monetize their skills, knowledge, and creativity. Here's your comprehensive guide to thriving as a creator.

## Understanding the Creator Economy

The creator economy encompasses all the tools, platforms, and services that enable content creators to earn money from their work. It includes:

- Content platforms (YouTube, TikTok, Instagram)
- Newsletter platforms (Substack, ConvertKit)
- Course platforms (Teachable, Thinkific)
- Membership sites (Patreon, Circle)
- E-commerce tools (Shopify, Gumroad)

## Finding Your Niche

Success in the creator economy starts with identifying your unique value proposition:

### Assess Your Skills
- What are you naturally good at?
- What do people ask you for advice about?
- What topics can you discuss for hours?
- What problems can you solve for others?

### Market Research
- Study successful creators in your space
- Identify gaps in existing content
- Understand your target audience's pain points
- Analyze trending topics and keywords

## Content Strategy Framework

### The 80/20 Rule
- 80% valuable, educational content
- 20% promotional or personal content

### Content Pillars
Develop 3-5 core themes for your content:
1. **Educational** - Teach your audience new skills
2. **Inspirational** - Share motivational stories
3. **Behind-the-scenes** - Show your process
4. **Community** - Engage with your audience
5. **Industry insights** - Share expert perspectives

## Monetization Strategies

### Direct Monetization
- **Sponsored content** - Partner with brands
- **Product sales** - Create digital or physical products
- **Services** - Offer consulting or freelance work
- **Subscriptions** - Build recurring revenue streams

### Indirect Monetization
- **Lead generation** - Build email lists
- **Brand building** - Increase your market value
- **Network expansion** - Connect with industry leaders
- **Skill development** - Improve your expertise

## Building Your Audience

### Consistency is Key
- Post regularly on your chosen platforms
- Maintain consistent quality standards
- Develop a recognizable style and voice
- Show up even when you don't feel like it

### Engagement Strategies
- Respond to every comment and message
- Ask questions to encourage interaction
- Share user-generated content
- Collaborate with other creators

### Cross-Platform Growth
- Repurpose content across multiple platforms
- Tailor content to each platform's strengths
- Use platform-specific features and trends
- Drive traffic between your different channels

## Tools and Resources

### Content Creation
- **Canva** - Design graphics and visuals
- **Loom** - Record screen and video content
- **Grammarly** - Improve your writing
- **Buffer** - Schedule social media posts

### Analytics and Growth
- **Google Analytics** - Track website performance
- **Social media insights** - Monitor engagement
- **Email marketing tools** - Nurture your audience
- **SEO tools** - Optimize for search

## Long-term Success Strategies

### Diversify Your Income
Never rely on a single revenue stream:
- Multiple platform presence
- Various monetization methods
- Different content formats
- Backup plans for platform changes

### Invest in Yourself
- Continuously learn new skills
- Attend industry conferences
- Network with other creators
- Stay updated on platform changes

### Scale Your Operations
- Hire virtual assistants
- Use automation tools
- Create systems and processes
- Build a team as you grow

The creator economy rewards those who provide genuine value while building authentic relationships with their audience. Start where you are, use what you have, and do what you can. Your unique perspective is your greatest asset.

Remember: Success in the creator economy isn't just about making money—it's about making a meaningful impact while building a sustainable business around your passions.`,
        author: users[3]._id,
        tags: ['creator-economy', 'monetization', 'content-strategy', 'entrepreneurship'],
        image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'published'
      },
      {
        title: 'Sustainable Living: Small Changes, Big Impact',
        body: `Living sustainably doesn't require drastic lifestyle changes. Small, consistent actions can create significant environmental impact while improving your quality of life and saving money.

## Why Sustainable Living Matters

Climate change, resource depletion, and environmental degradation affect us all. Individual actions, when multiplied across millions of people, create powerful collective change.

### Environmental Benefits
- Reduced carbon footprint
- Conservation of natural resources
- Decreased waste production
- Protection of biodiversity

### Personal Benefits
- Lower utility bills and expenses
- Improved health and wellbeing
- Greater connection with nature
- Sense of purpose and contribution

## Easy Swaps for Beginners

### In the Kitchen
- **Reusable water bottles** instead of single-use plastic
- **Cloth shopping bags** for grocery trips
- **Glass containers** for food storage
- **Compost bin** for organic waste

### Energy Efficiency
- **LED light bulbs** - last longer, use less energy
- **Smart thermostats** - optimize heating and cooling
- **Unplug devices** when not in use
- **Air-dry clothes** instead of using the dryer

### Transportation Choices
- **Walk or bike** for short distances
- **Public transportation** for longer trips
- **Carpooling** with friends and colleagues
- **Remote work** when possible

## The 30-Day Sustainability Challenge

Week 1: **Reduce**
- Audit your consumption habits
- Identify areas for reduction
- Start saying no to unnecessary purchases
- Focus on using what you already have

Week 2: **Reuse**
- Find new purposes for old items
- Repair instead of replacing
- Share or borrow items you rarely use
- Get creative with repurposing projects

Week 3: **Recycle**
- Learn your local recycling guidelines
- Set up proper sorting systems
- Find specialized recycling for electronics
- Participate in community recycling events

Week 4: **Reflect and Plan**
- Assess your progress
- Identify what worked best
- Plan long-term sustainable habits
- Share your journey with others

## Building Sustainable Habits

### Start Small
- Choose one area to focus on initially
- Make changes gradually
- Celebrate small victories
- Don't aim for perfection

### Track Your Progress
- Monitor utility bills for savings
- Keep a sustainability journal
- Take photos of your changes
- Share milestones with friends

### Find Your Community
- Join local environmental groups
- Connect with like-minded individuals online
- Participate in community gardens
- Attend sustainability workshops

## Sustainable Technology Use

### Digital Minimalism
- Unsubscribe from unnecessary emails
- Delete unused apps and files
- Use cloud storage efficiently
- Choose energy-efficient devices

### Mindful Consumption
- Research brands' sustainability practices
- Buy quality items that last longer
- Support companies with environmental missions
- Consider the full lifecycle of products

## Making It Stick

### Habit Stacking
Attach new sustainable behaviors to existing habits:
- Turn off lights when leaving a room
- Bring reusable bags when going shopping
- Check for leaks during monthly bill reviews
- Plan sustainable meals during weekly prep

### Financial Motivation
Track the money you save through sustainable practices:
- Lower energy bills
- Reduced shopping expenses
- Savings from growing your own food
- Health benefits reducing medical costs

## Beyond Individual Action

While personal choices matter, systemic change is equally important:
- Vote for environmentally conscious leaders
- Support sustainable businesses
- Advocate for policy changes
- Educate others about sustainability

Remember, sustainable living is a journey, not a destination. Every small action contributes to a larger movement toward environmental responsibility. Start today, start small, but start somewhere.

Your future self—and the planet—will thank you.`,
        author: users[1]._id,
        tags: ['sustainability', 'environment', 'lifestyle', 'green-living'],
        image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'published'
      }
    ];

    const posts = [];
    for (const postData of samplePosts) {
      const post = new Post(postData);
      await post.save();
      posts.push(post);
    }

    // Update users' post counts
    await User.findByIdAndUpdate(users[0]._id, { postsCount: 1 });
    await User.findByIdAndUpdate(users[1]._id, { postsCount: 2 });
    await User.findByIdAndUpdate(users[2]._id, { postsCount: 1 });
    await User.findByIdAndUpdate(users[3]._id, { postsCount: 1 });

    console.log('Created sample posts');

    // Create some follows
    await User.findByIdAndUpdate(users[0]._id, {
      $push: { following: [users[1]._id, users[2]._id] },
      $inc: { followingCount: 2 }
    });
    await User.findByIdAndUpdate(users[1]._id, {
      $push: { followers: users[0]._id, following: [users[2]._id, users[3]._id] },
      $inc: { followersCount: 1, followingCount: 2 }
    });
    await User.findByIdAndUpdate(users[2]._id, {
      $push: { followers: [users[0]._id, users[1]._id] },
      $inc: { followersCount: 2 }
    });
    await User.findByIdAndUpdate(users[3]._id, {
      $push: { followers: users[1]._id },
      $inc: { followersCount: 1 }
    });

    console.log('Created follow relationships');

    // Create some comments
    const sampleComments = [
      {
        body: 'Incredible insights on AI and creativity! This really changed my perspective on how to use these tools effectively.',
        author: users[1]._id,
        post: posts[0]._id
      },
      {
        body: 'As a fellow creator, I can relate to everything you shared here. The authenticity crisis is real, and your solutions are spot-on.',
        author: users[2]._id,
        post: posts[1]._id
      },
      {
        body: 'Love the minimalist approach! Clean design really does improve user experience. Thanks for the practical tips.',
        author: users[0]._id,
        post: posts[2]._id
      },
      {
        body: 'This creator economy guide is pure gold! Bookmarking this for future reference. The monetization strategies are particularly helpful.',
        author: users[1]._id,
        post: posts[3]._id
      },
      {
        body: 'Started implementing these sustainability tips last month and already seeing results! Small changes really do add up.',
        author: users[3]._id,
        post: posts[4]._id
      }
    ];

    for (const commentData of sampleComments) {
      const comment = new Comment(commentData);
      await comment.save();
      
      // Update post comment count
      await Post.findByIdAndUpdate(commentData.post, {
        $inc: { commentsCount: 1 }
      });
    }

    console.log('Created sample comments');

    // Add some likes to posts
    await Post.findByIdAndUpdate(posts[0]._id, {
      $push: { likes: [{ user: users[1]._id }, { user: users[2]._id }, { user: users[3]._id }] },
      likesCount: 3
    });

    await Post.findByIdAndUpdate(posts[1]._id, {
      $push: { likes: [{ user: users[0]._id }, { user: users[2]._id }] },
      likesCount: 2
    });

    await Post.findByIdAndUpdate(posts[2]._id, {
      $push: { likes: [{ user: users[0]._id }, { user: users[1]._id }] },
      likesCount: 2
    });

    await Post.findByIdAndUpdate(posts[3]._id, {
      $push: { likes: [{ user: users[1]._id }] },
      likesCount: 1
    });

    await Post.findByIdAndUpdate(posts[4]._id, {
      $push: { likes: [{ user: users[0]._id }, { user: users[3]._id }] },
      likesCount: 2
    });

    console.log('Added likes to posts');

    console.log('Seed data created successfully!');
    console.log('Sample accounts:');
    console.log('Admin: admin@blogsphere.com / admin123');
    console.log('User 1: alex@example.com / password123');
    console.log('User 2: maria@example.com / password123');
    console.log('User 3: david@example.com / password123');
    console.log('User 4: sophia@example.com / password123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedData();
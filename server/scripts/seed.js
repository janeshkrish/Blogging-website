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
      email: 'admin@blog.com',
      password: 'admin123',
      role: 'admin',
      bio: 'Blog administrator',
      profilePicture: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=200'
    });
    await admin.save();
    console.log('Created admin user');

    // Create sample users
    const users = [];
    const sampleUsers = [
      {
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
        bio: 'Tech enthusiast and blogger',
        profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200'
      },
      {
        username: 'janedoe',
        email: 'jane@example.com',
        password: 'password123',
        bio: 'Designer and creative writer',
        profilePicture: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200'
      },
      {
        username: 'mikebrown',
        email: 'mike@example.com',
        password: 'password123',
        bio: 'Developer and startup founder',
        profilePicture: 'https://images.pexels.com/photos/4164470/pexels-photo-4164470.jpeg?auto=compress&cs=tinysrgb&w=200'
      }
    ];

    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      users.push(user);
    }
    console.log('Created sample users');

    // Create sample posts
    const samplePosts = [
      {
        title: 'Getting Started with React Hooks',
        body: `React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and how they can simplify your code.

## What are React Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 and have since become the standard way of writing React components.

## useState Hook

The useState hook is the most basic hook that allows you to add state to functional components:

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

The useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined.

This is just the beginning of your React Hooks journey. There are many more hooks to explore, and you can even create your own custom hooks!`,
        author: users[0]._id,
        tags: ['react', 'javascript', 'frontend', 'hooks'],
        image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'published'
      },
      {
        title: 'The Art of User Experience Design',
        body: `User Experience (UX) design is more than just making things look pretty. It's about creating meaningful and relevant experiences for users. In this article, we'll explore the fundamental principles of UX design.

## Understanding Your Users

Before you start designing, you need to understand who your users are, what they need, and what problems they're trying to solve. User research is the foundation of good UX design.

### User Personas

Creating user personas helps you understand your target audience better. A persona is a fictional character that represents a segment of your users.

## Design Thinking Process

The design thinking process consists of five stages:

1. **Empathize** - Understand your users
2. **Define** - Frame the problem
3. **Ideate** - Generate solutions
4. **Prototype** - Build and test
5. **Test** - Get feedback and iterate

## Usability Principles

Jakob Nielsen's 10 usability heuristics are still relevant today:
- Visibility of system status
- Match between system and real world
- User control and freedom
- Consistency and standards
- Error prevention

Remember, good UX design is invisible. When users can accomplish their goals without thinking about the interface, you've succeeded.`,
        author: users[1]._id,
        tags: ['ux', 'design', 'user-experience', 'ui'],
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'published'
      },
      {
        title: 'Building Scalable Node.js Applications',
        body: `Node.js has become one of the most popular platforms for building server-side applications. However, building scalable Node.js applications requires careful planning and implementation of best practices.

## Architecture Patterns

When building scalable applications, architecture matters. Here are some patterns to consider:

### Microservices Architecture

Breaking your application into smaller, independent services can improve scalability and maintainability.

### Event-Driven Architecture

Using events to communicate between different parts of your application can help create loosely coupled systems.

## Performance Optimization

Here are key strategies for optimizing Node.js performance:

### Connection Pooling

Always use connection pooling for database connections to avoid the overhead of creating new connections for each request.

### Caching

Implement caching strategies using Redis or Memcached to reduce database load and improve response times.

### Load Balancing

Use load balancers to distribute traffic across multiple instances of your application.

## Monitoring and Logging

Proper monitoring and logging are essential for maintaining scalable applications:

- Use APM tools like New Relic or DataDog
- Implement structured logging
- Set up alerts for critical metrics
- Monitor memory usage and garbage collection

## Security Best Practices

Don't forget about security:
- Always validate and sanitize input
- Use HTTPS everywhere
- Implement rate limiting
- Keep dependencies updated
- Use environment variables for secrets

Building scalable applications is an ongoing process. Always measure, monitor, and optimize based on real-world usage patterns.`,
        author: users[2]._id,
        tags: ['nodejs', 'javascript', 'backend', 'scalability'],
        image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800',
        status: 'published'
      },
      {
        title: 'CSS Grid vs Flexbox: When to Use Which',
        body: `CSS Grid and Flexbox are both powerful layout systems in CSS, but they serve different purposes. Understanding when to use each can dramatically improve your web layouts.

## Flexbox: The One-Dimensional Layout

Flexbox is designed for one-dimensional layouts - either a row or a column. It's perfect for:

- Navigation bars
- Button groups
- Centering content
- Equal-height columns
- Space distribution

### Basic Flexbox Example

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  flex: 1;
}
\`\`\`

## CSS Grid: The Two-Dimensional Layout

CSS Grid is designed for two-dimensional layouts - rows and columns at the same time. It's ideal for:

- Page layouts
- Card layouts
- Complex grids
- Overlapping elements

### Basic Grid Example

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## When to Use Which?

### Use Flexbox When:
- You need to align items in a single direction
- Content size should determine layout
- You need equal spacing between items
- Building components rather than layouts

### Use CSS Grid When:
- You need a two-dimensional layout
- Layout should determine content size
- You need precise placement of items
- Building page layouts

## Can You Use Both?

Absolutely! Grid and Flexbox work great together:

\`\`\`css
.page-layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

.navigation {
  display: flex;
  justify-content: space-between;
}
\`\`\`

The key is understanding that these tools complement each other rather than compete.`,
        author: users[0]._id,
        tags: ['css', 'grid', 'flexbox', 'layout'],
        image: 'https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg?auto=compress&cs=tinysrgb&w=800',
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
    await User.findByIdAndUpdate(users[0]._id, { postsCount: 2 });
    await User.findByIdAndUpdate(users[1]._id, { postsCount: 1 });
    await User.findByIdAndUpdate(users[2]._id, { postsCount: 1 });

    console.log('Created sample posts');

    // Create some follows
    await User.findByIdAndUpdate(users[0]._id, {
      $push: { following: users[1]._id },
      $inc: { followingCount: 1 }
    });
    await User.findByIdAndUpdate(users[1]._id, {
      $push: { followers: users[0]._id },
      $inc: { followersCount: 1 }
    });

    await User.findByIdAndUpdate(users[1]._id, {
      $push: { following: users[2]._id },
      $inc: { followingCount: 1 }
    });
    await User.findByIdAndUpdate(users[2]._id, {
      $push: { followers: users[1]._id },
      $inc: { followersCount: 1 }
    });

    console.log('Created follow relationships');

    // Create some comments
    const sampleComments = [
      {
        body: 'Great article! React hooks have really simplified my components.',
        author: users[1]._id,
        post: posts[0]._id
      },
      {
        body: 'Thanks for sharing this. The useState example was particularly helpful.',
        author: users[2]._id,
        post: posts[0]._id
      },
      {
        body: 'Excellent overview of UX principles. The design thinking process section was spot on!',
        author: users[0]._id,
        post: posts[1]._id
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
      $push: { likes: [{ user: users[1]._id }, { user: users[2]._id }] },
      likesCount: 2
    });

    await Post.findByIdAndUpdate(posts[1]._id, {
      $push: { likes: [{ user: users[0]._id }] },
      likesCount: 1
    });

    console.log('Added likes to posts');

    console.log('Seed data created successfully!');
    console.log('Sample accounts:');
    console.log('Admin: admin@blog.com / admin123');
    console.log('User 1: john@example.com / password123');
    console.log('User 2: jane@example.com / password123');
    console.log('User 3: mike@example.com / password123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedData();
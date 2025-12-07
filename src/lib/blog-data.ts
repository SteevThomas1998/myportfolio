export interface BlogPost {
    slug: string
    title: string
    excerpt: string
    date: string
    tags: string[]
    content: string
}

export const blogPosts: BlogPost[] = [
    {
        slug: "building-scalable-nextjs-apps",
        title: "Building Scalable Next.js Applications",
        excerpt: "Learn how to structure your Next.js projects for maintainability and performance. We discuss folder structure, state management, and more.",
        date: "March 15, 2024",
        tags: ["Next.js", "Architecture", "Performance"],
        content: `
# Building Scalable Next.js Applications

Next.js has become the go-to framework for React development, offering a powerful set of features out of the box. However, as your application grows, maintaining a clean and scalable structure becomes crucial.

## Folder Structure

A well-organized folder structure is the backbone of a scalable application. Here's a recommended structure:

- \`src/app\`: Application routes and pages
- \`src/components\`: Reusable UI components
- \`src/lib\`: Utility functions and helpers
- \`src/hooks\`: Custom React hooks
- \`src/types\`: TypeScript type definitions

## State Management

While React's built-in \`useState\` and \`useContext\` are powerful, complex applications often require more robust solutions. Libraries like **Zustand** or **Redux Toolkit** can help manage global state effectively.

## Performance Optimization

Next.js provides excellent performance defaults, but you can further optimize your app by:

1. **Image Optimization**: utilizing the \`next/image\` component.
2. **Code Splitting**: Dynamic imports for heavy components.
3. **Caching**: Leveraging Next.js caching strategies.

By following these practices, you can ensure your Next.js application remains performant and maintainable as it scales.
        `
    },
    {
        slug: "mastering-tailwind-css",
        title: "Mastering Tailwind CSS: Tips and Tricks",
        excerpt: "A deep dive into advanced Tailwind CSS features and how to use them effectively to build beautiful, responsive designs.",
        date: "February 28, 2024",
        tags: ["CSS", "Tailwind", "Design"],
        content: `
# Mastering Tailwind CSS

Tailwind CSS has revolutionized the way we style web applications. It's a utility-first framework that allows you to build custom designs without leaving your HTML.

## Customizing the Config

The \`tailwind.config.js\` file is where the magic happens. You can extend the default theme to match your brand identity:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#FF5733',
        secondary: '#33FF57',
      },
    },
  },
}
\`\`\`

## Using @apply

While utility classes are great, sometimes you want to reuse a set of styles. The \`@apply\` directive lets you extract common patterns into CSS classes:

\`\`\`css
.btn {
  @apply py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700;
}
\`\`\`

## Dark Mode

Implementing dark mode is seamless with Tailwind. Simply add the \`dark:\` prefix to your classes to define styles for dark mode.

Tailwind provides the flexibility and speed needed for modern web development.
        `
    },
    {
        slug: "react-server-components",
        title: "Understanding React Server Components",
        excerpt: "What are React Server Components and why should you care about them? A comprehensive guide to the future of React.",
        date: "January 10, 2024",
        tags: ["React", "RSC", "Frontend"],
        content: `
# Understanding React Server Components

React Server Components (RSC) represent a paradigm shift in how we build React applications. They allow you to write components that run exclusively on the server.

## Key Benefits

1. **Zero Bundle Size**: Server components don't add to the JavaScript bundle sent to the client.
2. **Direct Backend Access**: You can access your database or file system directly from your components.
3. **Improved Performance**: By doing more work on the server, you reduce the load on the client device.

## How it Works

Traditionally, React apps render on the client (CSR) or strictly pre-render HTML (SSR). RSCs allow a hybrid approach where some components render on the server and stream to the client as specific UI updates, while others remain interactive client components.

This hybrid model offers the best of both worlds: the interactivity of client-side apps and the performance of server-side rendering.
        `
    }
]

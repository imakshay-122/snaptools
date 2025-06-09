import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Link } from 'react-router-dom';
import { Clock, User, Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/components/theme-provider';

const BlogList = () => {
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  const blogPosts = [
    {
      id: 'image-optimization-guide',
      title: 'Advanced Image Optimization Guide',
      description: 'Master the art of image optimization with comprehensive strategies for better web performance.',
      author: 'SnapTools Team',
      date: '2024-01-15',
      tags: ['Image Processing', 'Web Performance', 'Optimization'],
      readTime: '10 min read'
    },
    {
      id: 'pdf-manipulation-techniques',
      title: 'PDF Manipulation Techniques',
      description: 'Learn advanced techniques for manipulating PDF files efficiently and securely.',
      author: 'SnapTools Team',
      date: '2024-01-10',
      tags: ['PDF', 'Document Processing', 'Tutorial'],
      readTime: '8 min read'
    },
    {
      id: 'secure-password-guide',
      title: 'Secure Password Guide',
      description: 'Essential strategies for creating and managing secure passwords in the digital age.',
      author: 'SnapTools Team',
      date: '2024-01-05',
      tags: ['Security', 'Password Management', 'Best Practices'],
      readTime: '12 min read'
    },
    {
      id: 'qr-code-best-practices',
      title: 'QR Code Best Practices',
      description: 'Learn how to create effective QR codes for various purposes and applications.',
      author: 'SnapTools Team',
      date: '2024-01-01',
      tags: ['QR Codes', 'Bar Code', 'Mobile Apps'],
      readTime: '9 min read'
    },
    {
      id: 'unit-conversion-guide',
      title: 'Unit Conversion Guide',
      description: 'Master the art of converting units effortlessly with our comprehensive guide.',
      author: 'SnapTools Team',
      date: '2024-01-05',
      tags: ['Unit Conversion', 'Measurement', 'Tutorial'],
      readTime: '15 min read'
    },
    {
      id: 'developer-tool-kit-guide',
      title: 'Developer Tool Kit Guide',
      description: 'Explore our comprehensive developer tool kit for efficient coding and development.',
      author: 'SnapTools Team',
      date: '2024-01-01',
      tags: ['Developer Tools', 'Coding', 'Tutorial'],
      readTime: '18 min read'
    }
  
  ];

  return (
    <ThemeProvider defaultTheme="light" forcedTheme="light" enableSystem={false}>
      <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-8 pt-20">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Blog</h1>
          <p className="text-xl text-muted-foreground/90 mb-8 leading-relaxed max-w-2xl">
            Discover the latest insights, tutorials, and best practices from the SnapTools team.
          </p>
          
          <div className="relative max-w-2xl mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-3 w-full rounded-xl border-2 focus:border-primary transition-colors bg-background/50 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full transition-all ${!selectedTag ? 'bg-primary text-primary-foreground shadow-md' : 'bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-sm'}`}
            >
              All Posts
            </button>
            {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full transition-colors ${selectedTag === tag ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts
            .filter(post => {
              const matchesTag = !selectedTag || post.tags.includes(selectedTag);
              const matchesSearch = searchQuery.trim() === '' || [
                post.title,
                post.description,
                ...post.tags,
                post.author
              ].some(text =>
                text.toLowerCase().includes(searchQuery.toLowerCase())
              );
              return matchesTag && matchesSearch;
            })
            .map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group p-6 rounded-xl border bg-card hover:shadow-xl transition-all hover:border-primary/20 hover:scale-[1.02] hover:bg-accent/50"
            >
              <Link to={`/blog/posts/${post.id}`} className="block group">
                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors tracking-tight">
                  {post.title}
                </h2>
                <p className="text-muted-foreground/90 mb-4 leading-relaxed">{post.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground/75">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.article>
          ))}
          </div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
    </ThemeProvider>
  );
};

export default BlogList;
import { ReactNode } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

interface BlogLayoutProps {
  children: ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const navigate = useNavigate();

  return (
    <ThemeProvider defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
      <main className="flex-grow container py-8 pt-20">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6 bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Blog
        </button>
        {children}
      </main>
      <Footer />
      </div>
    </ThemeProvider>
  );
};

export default BlogLayout;
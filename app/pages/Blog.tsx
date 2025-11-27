"use client"

// pages/blog.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { getAllPosts, getFeaturedPosts } from '../data/blogContent';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
}

interface BlogProps {
  allPosts: Post[];
  featuredPosts: Post[];
}

const Blog: React.FC<BlogProps> = ({ allPosts, featuredPosts }) => {
  const regularPosts = allPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-slate-50">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">FakerBox Blog</h1>
                <p className="text-xl text-gray-700">
                  Expert insights on test data management, development best practices, and data generation strategies.
                </p>
              </div>

              {/* Featured Articles */}
              {featuredPosts.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredPosts.map(post => (
                      <Card
                        key={post.slug}
                        className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/20"
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                              {post.category}
                            </span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(post.date)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.readTime}
                            </div>
                          </div>
                          <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="text-base">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <Link href={`/blog/${post.slug}`}>
                            <Button variant="ghost" className="p-0 h-auto font-medium group-hover:text-primary">
                              Read more <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* All Articles */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest Articles</h2>
                <div className="space-y-8">
                  {regularPosts.map(post => (
                    <Card
                      key={post.slug}
                      className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/10"
                    >
                      <div className="flex flex-col md:flex-row">
                        <CardContent className="p-6 flex-1">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                              {post.category}
                            </span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(post.date)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.readTime}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>
                          <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                          <Link href={`/blog/${post.slug}`}>
                            <Button variant="ghost" className="p-0 h-auto font-medium group-hover:text-primary">
                              Read full article <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Popular Generators */}
              <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Popular Generators</CardTitle>
                  <CardDescription>Start generating test data for your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  {[
                    { name: 'Person Data', href: '/?generator=person' },
                    { name: 'Company Data', href: '/?generator=company' },
                    { name: 'Financial Data', href: '/?generator=financial' },
                    { name: 'E-commerce Data', href: '/?generator=ecommerce' },
                    { name: 'Custom Generator', href: '/?generator=custom' }
                  ].map(generator => (
                    <Link key={generator.name} href={generator.href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                      {generator.name} →
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Development', 'Database', 'Testing', 'API'].map(category => (
                      <div key={category} className="flex justify-between text-sm">
                        <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">{category}</span>
                        <span className="text-muted-foreground">{allPosts.filter(post => post.category === category).length}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

// For SSG
export const getStaticProps = async () => {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();

  return {
    props: { allPosts, featuredPosts },
  };
};

export default Blog;

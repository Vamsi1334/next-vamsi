"use client"

// pages/blog/[slug].tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ExternalLink, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { getBlogPost, getAllPosts } from '../data/blogContent';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  tags: string[];
  metaDescription: string;
}

interface BlogPostProps {
  post: Post;
  allPosts: Post[];
}

const BlogPost: React.FC<BlogPostProps> = ({ post, allPosts }) => {


  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag)))
    )
    .slice(0, 3);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const extractHeadings = (content: string) => {
    const headings: { text: string; id: string; level: number }[] = [];
    content.split('\n').forEach((line) => {
      const h2Match = line.match(/^## (.+)$/);
      const h3Match = line.match(/^### (.+)$/);
      if (h2Match) {
        const text = h2Match[1].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        headings.push({ text, id, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        headings.push({ text, id, level: 3 });
      }
    });
    return headings;
  };

  const formatContent = (content: string) => {
    let formatted = content
      .replace(/```(\w+)?\s*\n([\s\S]*?)\n```/g, (match, lang, code) => {
        const trimmedCode = code.trim();
        return `<pre class="bg-gray-900 text-gray-100 p-6 rounded-lg my-6 overflow-x-auto border border-gray-300 shadow-sm"><code class="text-sm font-mono whitespace-pre">${trimmedCode}</code></pre>`;
      })
      .replace(/`([^`\n]+)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono border border-gray-200">$1</code>')
      .replace(/^# (.*$)/gm, '<p class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-8 border-b border-gray-200 pb-3">$1</p>')
      .replace(/^## (.*$)/gm, (match, heading) => {
        const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h2 id="${id}" class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">${heading}</h2>`;
      })
      .replace(/^### (.*$)/gm, (match, heading) => {
        const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h3 id="${id}" class="text-xl md:text-2xl font-semibold text-gray-900 mb-3 mt-6">${heading}</h3>`;
      })
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 hover:underline font-medium">$1</a>')
      .replace(/^\- (.*$)/gm, '<li class="ml-6 mb-2 text-gray-700 leading-relaxed">• $1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-6 mb-2 text-gray-700 leading-relaxed">$1. $2</li>')
      .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4 text-lg">');
    return formatted;
  };

  const tableOfContents = extractHeadings(post.content);

  return (
    <>
      <Head>
        <title>{post.title} | FakerBox Blog</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://fakerbox.com/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="FakerBox Team" />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <link rel="canonical" href={`https://fakerbox.com/blog/${post.slug}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-slate-50">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
              </Link>

              {/* Article Header */}
              <header className="mb-8">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">{post.category}</Badge>
                  <div className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(post.date)}</div>
                  <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime}</div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
                <p className="text-xl text-gray-700 leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center gap-2 mt-6">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-2">{post.tags.map(tag => (<Badge key={tag} variant="outline">{tag}</Badge>))}</div>
                </div>
              </header>

              {/* Article Content */}
              <article className="prose prose-gray max-w-none">
                <div className="leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: '<div class="text-gray-700 leading-relaxed mb-4 text-lg">' + formatContent(post.content) + '</div>' }} />
              </article>

              {/* Call to Action */}
              <Card className="my-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Generate Test Data?</h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Put these best practices into action with our comprehensive data generation tools.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                      <Button size="lg" className="w-full sm:w-auto">
                        Start Generating Data <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/blog">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">Read More Articles</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Card key={relatedPost.slug} className="group hover:shadow-xl transition-all duration-300 border-blue-100 bg-gradient-to-br from-white to-blue-50/20">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Badge variant="outline">{relatedPost.category}</Badge>
                            <span>{relatedPost.readTime}</span>
                          </div>
                          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                            <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                          </CardTitle>
                          <CardDescription>{relatedPost.excerpt}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8 sticky top-8">

                {/* Table of Contents */}
                {tableOfContents.length > 0 && (
                  <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/20 shadow-lg">
                    <CardHeader><CardTitle className="text-lg">In This Article</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">{tableOfContents.map((heading, idx) => (
                        <a key={idx} href={`#${heading.id}`} className={`block text-muted-foreground hover:text-primary transition-colors ${heading.level === 3 ? 'ml-4' : ''}`}>{heading.text}</a>
                      ))}</div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Tools */}
                <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Start Tools</CardTitle>
                    <CardDescription>Generate data mentioned in this article</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Link href="/tools/name"><Button variant="outline" size="sm" className="w-full justify-start">Person Data Generator</Button></Link>
                      <Link href="/tools/company"><Button variant="outline" size="sm" className="w-full justify-start">Company Data Generator</Button></Link>
                      <Link href="/tools/finance"><Button variant="outline" size="sm" className="w-full justify-start">Financial Data Generator</Button></Link>
                      <Link href="/?generator=custom"><Button variant="outline" size="sm" className="w-full justify-start">Custom Generator</Button></Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Author Info */}
                <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/20 shadow-lg">
                  <CardHeader><CardTitle className="text-lg">About FakerBox</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      FakerBox provides comprehensive tools for generating realistic test data. Our team shares practical insights to help you build better applications.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Link href="mailto:contact@fakerbox.com" className="flex items-center">
                        Contact Us <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const post = getBlogPost(params.slug);
  const allPosts = getAllPosts();

  if (!post) {
    return { notFound: true };
  }

  return { props: { post, allPosts } };
};

export default BlogPost;

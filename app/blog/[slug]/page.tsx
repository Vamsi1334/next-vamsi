import BlogPost from '../../pages/BlogPost';
import { getAllPosts, getBlogPost } from '../../data/blogContent';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const post = getBlogPost(slug);
  const allPosts = getAllPosts();

  if (!post) {
    return (
      <div className="p-8 text-red-600">
        Blog post not found for slug: {slug}
      </div>
    );
  }

  return <BlogPost post={post} allPosts={allPosts} />;
}

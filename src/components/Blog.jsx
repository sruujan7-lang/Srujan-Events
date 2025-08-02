import React, { useState, useEffect } from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import "../styles/Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample blog posts data
  const samplePosts = [
    {
      id: 1,
      title: "10 Tips for Planning the Perfect Wedding",
      excerpt:
        "Planning your dream wedding? Here are essential tips to make your special day unforgettable and stress-free.",
      content: "Full blog content here...",
      category: "Wedding",
      createdAt: "2024-01-15T10:00:00Z",
      image:
        "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      title: "Corporate Event Trends for 2024",
      excerpt:
        "Discover the latest trends in corporate event planning that will make your next business event stand out.",
      content: "Full blog content here...",
      category: "Corporate",
      createdAt: "2024-01-10T14:30:00Z",
      image:
        "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 3,
      title: "Creating Magical Children's Birthday Parties",
      excerpt:
        "Transform your child's birthday into a magical experience with these creative ideas and themes.",
      content: "Full blog content here...",
      category: "Birthday",
      createdAt: "2024-01-05T09:15:00Z",
      image:
        "https://images.pexels.com/photos/1729654/pexels-photo-1729654.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section id="blog" className="blog section">
        <div className="container">
          <div className="loading">Loading blog posts...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="blog section">
      <div className="container">
        <h2 className="section-title">Latest from Our Blog</h2>
        <p className="section-subtitle">
          Stay updated with the latest trends, tips, and insights from the world
          of event planning.
        </p>

        {posts.length === 0 ? (
          <div className="no-posts">
            <p>
              No blog posts available at the moment. Check back soon for
              exciting content!
            </p>
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                  <div className="blog-category">{post.category}</div>
                </div>

                <div className="blog-content">
                  <div className="blog-meta">
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="meta-item">
                      <User size={16} />
                      <span>Srujan Events</span>
                    </div>
                  </div>

                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>

                  <button className="blog-read-more">
                    Read More
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="blog-cta">
          <h3>Want to Stay Updated?</h3>
          <p>
            Subscribe to our newsletter for the latest event planning tips and
            company updates.
          </p>
          <button
            className="btn btn-primary"
            onClick={() =>
              document
                .querySelector("#contact")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;

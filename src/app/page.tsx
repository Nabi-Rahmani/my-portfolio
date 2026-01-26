'use client';

import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog';

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (target: HTMLElement | string, options?: { offset?: number; immediate?: boolean }) => void;
    };
  }
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleScrollTo = (hash: string) => (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (typeof window === 'undefined') return;

    event.preventDefault();

    const target = document.querySelector(hash) as HTMLElement | null;
    const lenis = window.__lenis;

    if (target && lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(target, { offset: -80 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
  };

  const featuredPosts = blogPosts.slice(0, 3);
  const projectScreenshots = [
    { src: '/assets/projectImage/dev-discipline-01.jpeg', title: 'Screenshot 1' },
    { src: '/assets/projectImage/dev-discipline-02.jpeg', title: 'Screenshot 2' },
    { src: '/assets/projectImage/dev-discipline-03.jpeg', title: 'Screenshot 3' },
    { src: '/assets/projectImage/dev-discipline-04.jpeg', title: 'Screenshot 4' },
    { src: '/assets/projectImage/dev-discipline-05.jpeg', title: 'Screenshot 5' },
    { src: '/assets/projectImage/dev-discipline-06.jpeg', title: 'Screenshot 6' }
  ];

  return (
    <div style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      minHeight: '100vh',
      transition: 'all 0.3s ease',
      paddingBottom: isMobile ? '60px' : '0'
    }}>
      {/* Home / Hero */}
      <section id="home" className="hero-grid">
        <main style={{
          flex: 1,
          padding: '2rem 1.5rem',
          paddingTop: '6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 200px)'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '800px',
            width: '100%'
          }}>
            {/* Hero Section */}
            <div style={{ marginBottom: '4rem' }}>
              <div style={{
                marginBottom: '1.5rem',
                opacity: 0,
                animation: 'fadeInUp 1s ease forwards',
                animationDelay: '0.2s'
              }}>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(252, 180, 176, 1)',
                  margin: '0 0 0.5rem',
                  fontWeight: '500',
                  letterSpacing: '0.5px'
                }}>
                  Hello, I&apos;m
                </p>
              </div>

              <div style={{
                opacity: 0,
                animation: 'fadeInUp 1s ease forwards',
                animationDelay: '0.4s'
              }}>
                <h1 style={{
                  fontSize: isMobile ? '2.5rem' : '4rem',
                  fontWeight: '700',
                  margin: '0 0 1rem',
                  background: 'linear-gradient(135deg, var(--text-primary), rgba(252, 180, 176, 1))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.1
                }}>
                  Nabi Rahmani
                </h1>
              </div>

              <div style={{
                opacity: 0,
                animation: 'fadeInUp 1s ease forwards',
                animationDelay: '0.6s'
              }}>
                <p style={{
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  color: 'var(--text-secondary)',
                  margin: '0 0 2rem',
                  lineHeight: 1.6,
                  fontWeight: '400'
                }}>
                  Flutter Developer crafting beautiful mobile experiences
                  <br />
                  with clean code and intuitive design
                </p>
              </div>

              <div style={{
                opacity: 0,
                animation: 'fadeInUp 1s ease forwards',
                animationDelay: '0.8s',
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Link
                  href="/#projects"
                  onClick={handleScrollTo('#projects')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 2rem',
                    backgroundColor: 'rgba(252, 180, 176, 1)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(252, 180, 176, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(252, 180, 176, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                    (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(252, 180, 176, 0.3)';
                  }}>
                  View My Work
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </Link>

                <Link
                  href="/#about"
                  onClick={handleScrollTo('#about')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 2rem',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    border: `2px solid var(--border-color)`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
                    (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}>
                  About Me
                </Link>
              </div>
            </div>

            {/* Tech Stack */}
            <div style={{
              opacity: 0,
              animation: 'fadeInUp 1s ease forwards',
              animationDelay: '1s'
            }}>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                margin: '0 0 1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: '500'
              }}>
                Technologies I Love
              </p>
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
              {[
                { name: 'Flutter', color: '#0175C2' },
                { name: 'Dart', color: '#00B4AB' },
                { name: 'Firebase', color: '#FFCA28' },
                { name: 'Git', color: '#F05032' },
                { name: 'Supabase', color: '#3ECF8E' },
                { name: 'CI/CD', color: '#f97316' }
              ].map((tech, index) => (
                  <div key={tech.name} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '0.75rem',
                    border: `1px solid var(--border-color)`,
                    transition: 'all 0.3s ease',
                    opacity: 0,
                    animation: 'fadeInUp 1s ease forwards',
                    animationDelay: `${1.2 + index * 0.1}s`,
                    cursor: 'default'
                  }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.transform = 'translateY(-3px)';
                      (e.target as HTMLElement).style.borderColor = tech.color;
                      (e.target as HTMLElement).style.boxShadow = `0 8px 25px ${tech.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.transform = 'translateY(0)';
                      (e.target as HTMLElement).style.borderColor = 'var(--border-color)';
                      (e.target as HTMLElement).style.boxShadow = 'none';
                    }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: tech.color
                    }}></div>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      color: 'var(--text-primary)'
                    }}>
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{
        padding: '5rem 1.5rem 4rem',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.75rem',
              fontWeight: '700',
              margin: '0 0 1rem',
              background: 'linear-gradient(135deg, var(--text-primary), rgba(252, 180, 176, 1))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Selected Projects
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: 1.6
            }}>
              Flutter applications I&apos;ve built with passion and attention to detail.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '1.5rem',
            padding: isMobile ? '2rem' : '3rem',
            border: `1px solid var(--border-color)`,
            transition: 'all 0.3s ease',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '3rem',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(252, 180, 176, 0.1)',
                  color: 'rgba(252, 180, 176, 1)',
                  borderRadius: '2rem',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Featured Project
                </div>

                <h3 style={{
                  fontSize: isMobile ? '1.8rem' : '2.3rem',
                  fontWeight: '700',
                  margin: '0 0 1rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.2
                }}>
                  Dev Discipline
                </h3>

                <p style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                  margin: '0 0 1.75rem',
                  lineHeight: 1.7
                }}>
                  A discipline-focused productivity app built with Flutter to help you stay consistent,
                  build better habits, and track your progress with a clean, motivating UI.
                </p>

                <div style={{ marginBottom: '1.75rem' }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    margin: '0 0 1rem',
                    color: 'var(--text-primary)'
                  }}>
                    Key Features
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {[
                      'Daily routines',
                      'Habit tracking',
                      'Progress insights',
                      'Streak building',
                      'Clean UI/UX',
                      'Built with Flutter'
                    ].map((feature) => (
                      <span key={feature} style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        border: `1px solid var(--border-color)`
                      }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a
                    href="https://github.com/Nabi-Rahmani"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'rgba(252, 180, 176, 1)',
                      color: 'white',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(252, 180, 176, 0.85)';
                      (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(252, 180, 176, 1)';
                      (e.target as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    View Code
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.nabirahmani.dev_discipline"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      border: `2px solid var(--border-color)`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'var(--bg-primary)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    Go Play Store
                  </a>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                {projectScreenshots.map((shot) => (
                  <div
                    key={shot.src}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: isMobile ? '120px' : '150px',
                        height: isMobile ? '220px' : '270px',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        border: `2px solid var(--border-color)`,
                        boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease',
                        transform: 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.transform = 'scale(1.05) translateY(-5px)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.transform = 'scale(1)';
                      }}
                    >
                      <Image
                        src={shot.src}
                        alt={`Dev Discipline ${shot.title}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 120px, 150px"
                      />
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)'
                    }}>
                      {shot.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" style={{
        padding: '5rem 1.5rem 4rem',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.75rem',
              fontWeight: '700',
              margin: '0 0 1rem',
              color: 'var(--text-primary)'
            }}>
              Blog & Insights
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: 1.7
            }}>
              Thoughts, tutorials, and experiences about Flutter development and building great mobile apps.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2rem',
            marginBottom: '2.5rem'
          }}>
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                style={{
                  textDecoration: 'none',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '1.25rem',
                  border: `1px solid var(--border-color)`,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.target as HTMLElement).style.boxShadow = '0 18px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(59,130,246,0.12)',
                      color: '#3b82f6',
                      fontWeight: 500
                    }}>
                      {post.category}
                    </span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    margin: '0 0 0.75rem',
                    color: 'var(--text-primary)'
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    margin: '0 0 1rem',
                    lineHeight: 1.6
                  }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '999px',
                          border: `1px solid var(--border-color)`,
                          color: 'var(--text-secondary)'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.75rem',
                borderRadius: '999px',
                border: `1px solid var(--border-color)`,
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-secondary)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              View all posts
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: '5rem 1.5rem 4rem',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr',
          gap: '3rem',
          alignItems: 'flex-start'
        }}>
          {/* Left Column - Profile Photo */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: isMobile ? 'static' : 'sticky',
            top: isMobile ? 'auto' : '6rem'
          }}>
            <div style={{
              position: 'relative',
              width: isMobile ? '220px' : '280px',
              height: isMobile ? '220px' : '280px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: `4px solid var(--border-color)`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 8px rgba(252, 180, 176, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1.05)';
                (e.target as HTMLElement).style.boxShadow = '0 25px 80px rgba(0,0,0,0.3), 0 0 0 12px rgba(252, 180, 176, 0.2)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'scale(1)';
                (e.target as HTMLElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.25), 0 0 0 8px rgba(252, 180, 176, 0.1)';
              }}>
              <Image
                src="/assets/images/myimage.JPG"
                alt="Nabi Rahman - Flutter Developer"
                fill
                style={{
                  objectFit: 'cover',
                  transition: 'all 0.3s ease'
                }}
                sizes="280px"
                priority
              />
            </div>
          </div>

          <div>
            <div style={{ paddingTop: isMobile ? '2rem' : '0' }}>
              <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: '2.5rem' }}>
                <h2 style={{
                  fontSize: isMobile ? '2rem' : '2.75rem',
                  fontWeight: '700',
                  margin: '0 0 1rem',
                  color: 'var(--text-primary)'
                }}>
                  About Me
                </h2>
                <p style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                  margin: '0 0 1.5rem',
                  lineHeight: 1.7
                }}>
                  I&apos;m a Flutter developer focused on crafting beautiful, high‑quality mobile experiences with clean architecture and delightful UI.
                </p>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  margin: '0 0 1.5rem',
                  lineHeight: 1.7
                }}>
                  I enjoy translating complex problems into simple, intuitive interfaces and writing maintainable code that scales. Most of my time is spent building production‑ready Flutter apps, experimenting with new tools, and sharing what I learn with the community.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(2, minmax(0, 1fr))',
                  gap: '1rem',
                  marginTop: '2rem'
                }}>
                  {[
                    { label: 'Experience', value: '3+ years' },
                    { label: 'Specialty', value: 'Flutter & Dart' },
                    { label: 'Focus', value: 'Clean architecture' },
                    { label: 'Location', value: 'Kabul, Afghanistan' }
                  ].map((item) => (
                    <div key={item.label} style={{
                      padding: '1rem',
                      borderRadius: '0.9rem',
                      border: `1px solid var(--border-color)`,
                      backgroundColor: 'var(--bg-secondary)'
                    }}>
                      <p style={{
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-secondary)',
                        margin: '0 0 0.4rem'
                      }}>
                        {item.label}
                      </p>
                      <p style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        margin: 0,
                        color: 'var(--text-primary)'
                      }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                borderRadius: '1.25rem',
                border: `1px solid var(--border-color)`,
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  margin: '0 0 1rem',
                  color: 'var(--text-primary)'
                }}>
                  What I&apos;m working on
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  margin: '0 0 0.75rem',
                  lineHeight: 1.7
                }}>
                  Building Flutter applications with a focus on:
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)'
                }}>
                  <li>• Clean, maintainable architecture and testable code.</li>
                  <li>• Smooth animations and polished interactions.</li>
                  <li>• Offline‑friendly, performant mobile experiences.</li>
                  <li>• Real‑world apps powered by Firebase and REST APIs.</li>
                </ul>
              </div>

              <div style={{
                padding: '1.5rem',
                borderRadius: '1.25rem',
                border: `1px solid var(--border-color)`,
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  margin: '0 0 1rem',
                  color: 'var(--text-primary)'
                }}>
                  Highlights
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  {[
                    'Production Flutter apps',
                    'Riverpod & Provider',
                    'REST & Firebase',
                    'Animations & Motion',
                    'App architecture',
                    'CI/CD basics'
                  ].map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '999px',
                        border: `1px solid var(--border-color)`,
                        backgroundColor: 'var(--bg-primary)',
                        fontSize: '0.85rem',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '5rem 1.5rem 4rem',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: '700',
              margin: '0 0 1rem',
              color: 'var(--text-primary)'
            }}>
              Let&apos;s Connect
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              margin: 0
            }}>
              I&apos;m always interested in new opportunities and collaborations.
              Feel free to reach out if you&apos;d like to work together or just
              chat about Flutter development.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: '1rem',
            maxWidth: isMobile ? '100%' : '600px',
            margin: isMobile ? '0 auto' : '0'
          }}>
            {/* Email */}
            <a href="mailto:codewithnabi@gmail.com" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem',
              backgroundColor: 'rgba(252, 180, 176, 1)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.75rem',
              fontSize: '0.8rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              textAlign: 'center'
            }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'rgba(252, 180, 176, 0.85)';
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'rgba(252, 180, 176, 1)';
                (e.target as HTMLElement).style.transform = 'translateY(0)';
              }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>Email</span>
            </a>

            {/* GitHub */}
            <a href="https://github.com/Nabi-Rahmani" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '0.75rem',
              fontSize: '0.8rem',
              fontWeight: '500',
              border: `1px solid var(--border-color)`,
              transition: 'all 0.3s ease',
              textAlign: 'center'
            }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#24292e';
                (e.target as HTMLElement).style.color = 'white';
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
                (e.target as HTMLElement).style.color = 'var(--text-primary)';
                (e.target as HTMLElement).style.transform = 'translateY(0)';
              }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/muhammad-nabi-rahmani-%F0%9F%87%B5%F0%9F%87%B8-8945b21ba/" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '0.75rem',
              fontSize: '0.8rem',
              fontWeight: '500',
              border: `1px solid var(--border-color)`,
              transition: 'all 0.3s ease',
              textAlign: 'center'
            }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#0077b5';
                (e.target as HTMLElement).style.color = 'white';
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
                (e.target as HTMLElement).style.color = 'var(--text-primary)';
                (e.target as HTMLElement).style.transform = 'translateY(0)';
              }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* Twitter */}
            <a href="https://x.com/nabirahmani_dev" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '0.75rem',
              fontSize: '0.8rem',
              fontWeight: '500',
              border: `1px solid var(--border-color)`,
              transition: 'all 0.3s ease',
              textAlign: 'center'
            }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#1da1f2';
                (e.target as HTMLElement).style.color = 'white';
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
                (e.target as HTMLElement).style.color = 'var(--text-primary)';
                (e.target as HTMLElement).style.transform = 'translateY(0)';
              }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </section>

      <footer style={{
        padding: '1.5rem',
        paddingTop: 0,
        marginTop: '2rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)'
      }}>
        © 2025 / Mohammad Nabi Rahmani / Built with ❤️ NextJs &amp; Once U
      </footer>

      {/* Floating Elements */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '10%',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(252, 180, 176, 0.1), rgba(252, 180, 176, 0.05))',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite',
        zIndex: -1
      }}></div>

      <div style={{
        position: 'fixed',
        bottom: '20%',
        right: '10%',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(252, 180, 176, 0.08), rgba(252, 180, 176, 0.03))',
        filter: 'blur(30px)',
        animation: 'float 4s ease-in-out infinite reverse',
        zIndex: -1
      }}></div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}

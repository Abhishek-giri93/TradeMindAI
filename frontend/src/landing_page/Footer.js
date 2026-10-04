import React from 'react';

const footerGroups = [
  {
    title: 'Account',
    links: [
      ['Open demat account', '/signup'],
      ['Minor demat account', '#minor-demat'],
      ['NRI demat account', '#nri-demat'],
      ['Fund transfer', '#fund-transfer'],
      ['Dematerialisation', '#dematerialisation'],
    ],
  },
  {
    title: 'Support',
    links: [
      ['Contact us', '/support'],
      ['Support portal', '/support'],
      ['File a complaint', '#complaint-file'],
      ['Complaint status', '#complaint-status'],
      ['Downloads', '#downloads'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About us', '/about'],
      ['Products', '/products'],
      ['Pricing', '/pricing'],
      ['Careers', '#careers'],
      ['Press & media', '#press'],
    ],
  },
];

const socialLinks = [
  ['X', 'fa-brands fa-x-twitter', '#'],
  ['Facebook', 'fa-brands fa-facebook-f', '#'],
  ['Instagram', 'fa-brands fa-instagram', '#'],
  ['LinkedIn', 'fa-brands fa-linkedin-in', '#'],
  ['YouTube', 'fa-brands fa-youtube', '#'],
];

const policyLinks = [
  ['NSE', '#nse'],
  ['BSE', '#bse'],
  ['MCX', '#mcx'],
  ['Terms & conditions', '#terms'],
  ['Privacy policy', '#privacy'],
  ['Investor charter', '#investor-charter'],
  ['Sitemap', '#sitemap'],
];

function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        width: '100%',
        marginTop: '80px',
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
      }}
    >
      <div
        className="site-footer__container"
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          paddingTop: '64px',
          paddingBottom: '28px',
        }}
      >

        {/* =========================
            MAIN FOOTER
        ========================== */}
        <div
          className="site-footer__main"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1.25fr) minmax(500px, 2fr)',
            gap: 'clamp(50px, 8vw, 120px)',
            paddingBottom: '55px',
          }}
        >

          {/* =========================
              BRAND SECTION
          ========================== */}
          <section
            className="site-footer__brand"
            aria-label="TradeMind AI"
          >

            <a
              href="/"
              className="site-footer__logo"
              aria-label="TradeMind AI home"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                marginBottom: '22px',
              }}
            >

              {/* TradeMind AI Logo */}
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  background:
                    'linear-gradient(135deg, #172554 0%, #2563eb 100%)',
                  color: '#ffffff',
                  fontSize: '19px',
                  boxShadow:
                    '0 6px 18px rgba(37, 99, 235, 0.20)',
                }}
              >
                <i
                  className="fa-solid fa-chart-line"
                  aria-hidden="true"
                />
              </span>

              <span
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: '1.1',
                }}
              >
                <span
                  style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#172554',
                    letterSpacing: '-0.5px',
                  }}
                >
                  TradeMind{' '}
                  <span style={{ color: '#2563eb' }}>
                    AI
                  </span>
                </span>

                <small
                  style={{
                    marginTop: '5px',
                    fontSize: '8px',
                    fontWeight: '600',
                    letterSpacing: '1.2px',
                    color: '#64748b',
                  }}
                >
                  SMARTER TRADING
                </small>
              </span>
            </a>

            {/* Intro */}
            <p
              className="site-footer__intro"
              style={{
                maxWidth: '420px',
                margin: '0 0 28px 0',
                color: '#64748b',
                fontSize: '14px',
                lineHeight: '1.8',
              }}
            >
              Invest, trade, and grow your wealth with
              clarity and control.
            </p>

            {/* App Store Links */}
            <div
              className="site-footer__store-links"
              aria-label="Download the app"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '28px',
              }}
            >
              <a
                href="#google-play"
                aria-label="Get it on Google Play"
              >
                <img
                  src="/media/images/google-play-badge-light.svg"
                  alt="Get it on Google Play"
                  style={{
                    height: '40px',
                    width: 'auto',
                  }}
                />
              </a>

              <a
                href="#app-store"
                aria-label="Download on the App Store"
              >
                <img
                  src="/media/images/appstore-badge-light.svg"
                  alt="Download on the App Store"
                  style={{
                    height: '40px',
                    width: 'auto',
                  }}
                />
              </a>
            </div>

            {/* Social Media */}
            <div
              className="site-footer__social"
              aria-label="Follow TradeMind AI"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {socialLinks.map(([label, icon, href]) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Follow TradeMind AI on ${label}`}
                  style={{
                    width: '38px',
                    height: '38px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #e2e8f0',
                    borderRadius: '9px',
                    color: '#64748b',
                    background: '#ffffff',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <i
                    className={icon}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </section>

          {/* =========================
              NAVIGATION
          ========================== */}
          <nav
            className="site-footer__navigation"
            aria-label="Footer navigation"
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(3, minmax(140px, 1fr))',
              gap: '40px',
            }}
          >
            {footerGroups.map((group) => (
              <div
                className="site-footer__link-group"
                key={group.title}
              >
                <h2
                  style={{
                    margin: '0 0 22px 0',
                    color: '#172554',
                    fontSize: '15px',
                    fontWeight: '700',
                  }}
                >
                  {group.title}
                </h2>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {group.links.map(([label, href]) => (
                    <li
                      key={label}
                      style={{
                        marginBottom: '13px',
                      }}
                    >
                      <a
                        href={href}
                        style={{
                          color: '#64748b',
                          fontSize: '14px',
                          lineHeight: '1.6',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* =========================
            DISCLOSURE
        ========================== */}
        <div
          className="site-footer__disclosure"
          style={{
            padding: '28px 0',
            borderTop: '1px solid #e2e8f0',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <details>
            <summary
              style={{
                cursor: 'pointer',
                color: '#475569',
                fontSize: '14px',
                fontWeight: '600',
                padding: '6px 0',
              }}
            >
              Regulatory disclosures and investor information{' '}
              <i
                className="fa-solid fa-chevron-down"
                aria-hidden="true"
                style={{
                  marginLeft: '8px',
                  fontSize: '11px',
                }}
              />
            </summary>

            <div
              className="site-footer__disclosure-copy"
              style={{
                paddingTop: '22px',
                color: '#64748b',
                fontSize: '13px',
                lineHeight: '1.8',
              }}
            >
              <p>
                TradeMind AI provides technology and
                software tools designed to help users
                understand and manage their trading
                activities.
              </p>

              <p>
                Investments in securities markets are
                subject to market risks. Please read all
                related documents carefully before investing.
              </p>

              <p>
                Information provided through TradeMind AI
                should not be considered a guarantee of
                investment returns or personalized financial
                advice.
              </p>

              <p>
                Users should independently evaluate their
                investment decisions and understand the risks
                associated with trading before placing an
                order.
              </p>
            </div>
          </details>
        </div>

        {/* =========================
            BOTTOM FOOTER
        ========================== */}
        <div
          className="site-footer__bottom"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
            paddingTop: '26px',
          }}
        >
          <p
            style={{
              margin: 0,
              color: '#94a3b8',
              fontSize: '13px',
            }}
          >
            © 2010–{new Date().getFullYear()} TradeMind AI.
            All rights reserved.
          </p>

          <nav
            aria-label="Legal links"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
              gap: '18px',
            }}
          >
            {policyLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  color: '#64748b',
                  fontSize: '12px',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* =========================
          RESPONSIVE FOOTER
      ========================== */}
      <style>
        {`
          .site-footer a:hover {
            color: #2563eb !important;
          }

          .site-footer__social a:hover {
            background: #eff6ff !important;
            border-color: #bfdbfe !important;
            color: #2563eb !important;
            transform: translateY(-2px);
          }

          @media (max-width: 991.98px) {
            .site-footer__main {
              grid-template-columns: 1fr !important;
              gap: 50px !important;
            }

            .site-footer__navigation {
              grid-template-columns:
                repeat(3, minmax(120px, 1fr)) !important;
              gap: 30px !important;
            }
          }

          @media (max-width: 767.98px) {
            .site-footer {
              margin-top: 55px !important;
            }

            .site-footer__container {
              padding-top: 48px !important;
              padding-bottom: 24px !important;
            }

            .site-footer__navigation {
              grid-template-columns:
                repeat(2, minmax(130px, 1fr)) !important;
              gap: 35px 25px !important;
            }

            .site-footer__bottom {
              align-items: flex-start !important;
              flex-direction: column !important;
            }

            .site-footer__bottom nav {
              justify-content: flex-start !important;
            }
          }

          @media (max-width: 480px) {
            .site-footer__navigation {
              grid-template-columns: 1fr 1fr !important;
            }

            .site-footer__bottom nav {
              gap: 12px !important;
            }

            .site-footer__store-links img {
              height: 36px !important;
            }
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
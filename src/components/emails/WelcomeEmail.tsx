import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  email: string;
  referralCode: string;
  rank: number;
  totalCount: number;
}

export function WelcomeEmail({
  email: _email,
  referralCode,
  rank,
  totalCount,
}: WelcomeEmailProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://alevelmentor.com";
  const referralUrl = `${appUrl}/?ref=${referralCode}`;

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="dark light" />
        <meta name="supported-color-schemes" content="dark light" />
        <style>{`
          /* Base dark mode (default) */
          :root { color-scheme: dark light; }

          /* Responsive */
          @media only screen and (max-width: 480px) {
            .email-container { width: 100% !important; border-radius: 0 !important; }
            .email-padding { padding-left: 20px !important; padding-right: 20px !important; }
            .hero-heading { font-size: 24px !important; }
            .rank-number { font-size: 36px !important; }
            .cta-button { display: block !important; text-align: center !important; width: 100% !important; box-sizing: border-box !important; }
            .referral-url { font-size: 11px !important; }
            .stats-table { width: 100% !important; }
            .stat-cell { display: block !important; width: 100% !important; padding-bottom: 12px !important; }
          }

          /* Light mode overrides for supporting clients (Apple Mail, iOS) */
          @media (prefers-color-scheme: light) {
            .email-body { background-color: #f4f4f5 !important; }
            .email-container { background-color: #ffffff !important; border-color: #e4e4e7 !important; }
            .header-bg { background-color: #fafafa !important; border-color: #e4e4e7 !important; }
            .footer-bg { background-color: #fafafa !important; }
            .text-primary { color: #09090b !important; }
            .text-secondary { color: #52525b !important; }
            .text-muted { color: #71717a !important; }
            .brand-text { color: #09090b !important; }
            .rank-card { background-color: rgba(90,53,248,0.06) !important; border-color: rgba(90,53,248,0.15) !important; }
            .link-box { background-color: #f4f4f5 !important; border-color: #e4e4e7 !important; }
            .cta-button { background-color: #09090b !important; color: #ffffff !important; }
            .divider { border-color: #e4e4e7 !important; }
          }
        `}</style>
      </Head>
      <Preview>
        You&apos;re #{rank.toString()} on the A Level Mentor waitlist — share
        your link to move up
      </Preview>
      <Body style={main} className="email-body">
        <Section style={outerWrapper}>
          <Container style={container} className="email-container">
            {/* ── Header ──────────────────────────────────────────── */}
            <Section style={headerStyle} className="header-bg">
              <table
                cellPadding={0}
                cellSpacing={0}
                role="presentation"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <tr>
                  <td style={{ textAlign: "center" as const }}>
                    <Text style={logoText} className="brand-text">
                      a<span style={logoIcon}>l</span>m
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>

            {/* ── Hero ────────────────────────────────────────────── */}
            <Section style={hero} className="email-padding">
              <Text style={eyebrow}>EARLY ACCESS CONFIRMED</Text>
              <Heading style={h1} className="hero-heading text-primary">
                You&apos;re on the list. 🚀
              </Heading>
              <Text style={heroBody} className="text-secondary">
                Welcome to the inner circle. You&apos;ve secured your spot among
                the first{" "}
                <span style={{ fontWeight: 700 }} className="text-primary">
                  {totalCount}
                </span>{" "}
                students to revolutionize their revision.
              </Text>
            </Section>

            {/* ── Rank Card ───────────────────────────────────────── */}
            <Section style={rankCard} className="rank-card email-padding">
              <Text style={rankTitle} className="text-muted">
                YOUR CURRENT POSITION
              </Text>
              <Heading style={rankNumber} className="rank-number text-primary">
                #{rank}
              </Heading>
              <Text style={rankSubtitle} className="text-muted">
                You are ahead of{" "}
                <span style={{ color: "#3ed6ff", fontWeight: 600 }}>
                  {totalCount - rank}
                </span>{" "}
                others
              </Text>
            </Section>

            {/* ── Referral ────────────────────────────────────────── */}
            <Section style={referralSection} className="email-padding">
              <Heading style={h2} className="text-primary">
                Skip the queue
              </Heading>
              <Text style={bodyText} className="text-secondary">
                Want to get access sooner? Share your unique link below. Every
                friend who joins bumps you up the list.
              </Text>

              <Section style={linkBox} className="link-box">
                <Text style={linkText} className="referral-url">
                  {referralUrl}
                </Text>
              </Section>

              <table
                cellPadding={0}
                cellSpacing={0}
                role="presentation"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <tr>
                  <td style={{ textAlign: "center" as const }}>
                    <Button style={ctaButton} href={referralUrl} className="cta-button">
                      Share Referral Link →
                    </Button>
                  </td>
                </tr>
              </table>
            </Section>

            <Hr style={divider} className="divider" />

            {/* ── Footer ──────────────────────────────────────────── */}
            <Section style={footerStyle} className="footer-bg email-padding">
              <Text style={footerBrand} className="brand-text">
                a<span style={footerBrandAccent}>l</span>m
              </Text>
              <Text style={footerText} className="text-muted">
                You received this email because you joined the waitlist at{" "}
                <Link href={appUrl} style={footerLink}>
                  alevelmentor.com
                </Link>
                .
              </Text>
              <Text style={footerCopyright} className="text-muted">
                © {new Date().getFullYear()} A Level Mentor. All rights
                reserved.
              </Text>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;

/* ─── Styles ──────────────────────────────────────────────────────────────── */

const fontStack =
  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const main: React.CSSProperties = {
  backgroundColor: "#000000",
  fontFamily: fontStack,
  margin: 0,
  padding: 0,
};

const outerWrapper: React.CSSProperties = {
  backgroundColor: "#000000",
  width: "100%",
  padding: "32px 16px",
};

const container: React.CSSProperties = {
  maxWidth: "480px",
  width: "100%",
  margin: "0 auto",
  backgroundColor: "#121214",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.1)",
  overflow: "hidden",
};

/* Header */
const headerStyle: React.CSSProperties = {
  padding: "28px 24px",
  textAlign: "center" as const,
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  backgroundColor: "#0c0c0e",
};

const logoText: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "800",
  color: "#fafafa",
  letterSpacing: "-0.04em",
  margin: 0,
  fontFamily: fontStack,
};

const logoIcon: React.CSSProperties = {
  color: "#533fec",
  fontWeight: "800",
};

/* Hero */
const hero: React.CSSProperties = {
  padding: "32px 32px 16px",
  textAlign: "center" as const,
};

const eyebrow: React.CSSProperties = {
  color: "#533fec",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  marginBottom: "12px",
  marginTop: 0,
};

const h1: React.CSSProperties = {
  color: "#fafafa",
  fontSize: "28px",
  fontWeight: "800",
  letterSpacing: "-0.02em",
  margin: "0 0 16px",
  lineHeight: "1.2",
};

const heroBody: React.CSSProperties = {
  color: "#a1a1aa",
  fontSize: "14px",
  lineHeight: "1.7",
  margin: 0,
};

/* Rank card */
const rankCard: React.CSSProperties = {
  margin: "16px 32px 32px",
  padding: "24px",
  backgroundColor: "rgba(90,53,248,0.08)",
  borderRadius: "12px",
  border: "1px solid rgba(90,53,248,0.2)",
  textAlign: "center" as const,
};

const rankTitle: React.CSSProperties = {
  color: "#a1a1aa",
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  margin: "0 0 8px",
};

const rankNumber: React.CSSProperties = {
  color: "#fafafa",
  fontSize: "42px",
  fontWeight: "800",
  letterSpacing: "-0.03em",
  margin: "0 0 8px",
  lineHeight: "1",
};

const rankSubtitle: React.CSSProperties = {
  color: "#a1a1aa",
  fontSize: "12px",
  margin: 0,
  lineHeight: "1.5",
};

/* Referral */
const referralSection: React.CSSProperties = {
  padding: "0 32px 32px",
  textAlign: "center" as const,
};

const h2: React.CSSProperties = {
  color: "#fafafa",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0 0 8px",
  letterSpacing: "-0.01em",
};

const bodyText: React.CSSProperties = {
  color: "#a1a1aa",
  fontSize: "14px",
  lineHeight: "1.7",
  marginBottom: "20px",
  marginTop: 0,
};

const linkBox: React.CSSProperties = {
  backgroundColor: "#000000",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  padding: "14px",
  marginBottom: "20px",
};

const linkText: React.CSSProperties = {
  color: "#533fec",
  fontSize: "12px",
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  margin: 0,
  wordBreak: "break-all" as const,
  lineHeight: "1.5",
};

const ctaButton: React.CSSProperties = {
  backgroundColor: "#fafafa",
  color: "#09090b",
  fontSize: "14px",
  fontWeight: "600",
  padding: "14px 32px",
  borderRadius: "50px",
  textDecoration: "none",
  display: "inline-block",
};

const divider: React.CSSProperties = {
  borderColor: "rgba(255,255,255,0.08)",
  margin: 0,
};

/* Footer */
const footerStyle: React.CSSProperties = {
  backgroundColor: "#0c0c0e",
  padding: "28px 32px",
  textAlign: "center" as const,
};

const footerBrand: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "800",
  color: "#fafafa",
  letterSpacing: "-0.04em",
  margin: "0 0 16px",
  fontFamily: fontStack,
};

const footerBrandAccent: React.CSSProperties = {
  color: "#533fec",
};

const footerText: React.CSSProperties = {
  color: "#52525b",
  fontSize: "12px",
  lineHeight: "1.6",
  margin: "0 0 8px",
};

const footerLink: React.CSSProperties = {
  color: "#71717a",
  textDecoration: "underline",
};

const footerCopyright: React.CSSProperties = {
  color: "#3f3f46",
  fontSize: "11px",
  margin: 0,
};

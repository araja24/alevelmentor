import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
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
  email,
  referralCode,
  rank,
  totalCount,
}: WelcomeEmailProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://alevelmentor.com";
  const referralUrl = `${appUrl}/?ref=${referralCode}`;

  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </Head>
      <Preview>
        You&apos;re #{rank.toString()} on the alevelmentor waitlist — share your link to
        move up
      </Preview>
      <Body style={main}>
        {/* Outer wrapper to enforce dark background on all clients */}
        <Section style={outerWrapper}>
          <Container style={cardsWrapper}>
            {/* ── Header ─────────────────────────────────────────────────── */}
            <Section style={header}>
              <Img
                src={`${appUrl}/logo_large_light.svg`}
                alt="A Level Mentor"
                width={140}
                height={20}
                style={{ display: "block", margin: "0 auto" }}
              />
            </Section>

            {/* ── Hero ─────────────────────────────────────────────────── */}
            <Section style={hero}>
              <Text style={eyebrow}>EARLY ACCESS CONFIRMED</Text>
              <Heading style={h1}>You&apos;re on the list. 🚀</Heading>
              <Text style={heroBody}>
                Welcome to the inner circle. You&apos;ve secured your spot among the first{" "}
                <span style={{ color: "#fafafa", fontWeight: 600 }}>{totalCount}</span>{" "}
                students to revolutionize their revision.
              </Text>
            </Section>

            {/* ── Rank Card ────────────────────────────────────────────── */}
            <Section style={rankCard}>
              <Text style={rankTitle}>YOUR CURRENT POSITION</Text>
              <Heading style={rankNumber}>#{rank}</Heading>
              <Text style={rankSubtitle}>
                You are ahead of <span style={{ color: "#3ed6ff" }}>{totalCount - rank}</span> others
              </Text>
            </Section>

            {/* ── Referral ─────────────────────────────────────────────── */}
            <Section style={referralSection}>
              <Heading style={h2}>Skip the queue</Heading>
              <Text style={bodyText}>
                Want to get access sooner? Use your unique link below. Every friend who joins bumps you up the list.
              </Text>

              <Section style={linkContainer}>
                <Text style={linkText}>{referralUrl}</Text>
              </Section>

              <Button style={ctaButton} href={referralUrl}>
                Share Referral Link →
              </Button>
            </Section>

            <Hr style={divider} />

            {/* ── Footer ───────────────────────────────────────────────── */}
            <Section style={footer}>
              <Img
                src={`${appUrl}/logo_small.svg`}
                alt="ALM"
                width={24}
                height={24}
                style={{ display: "block", margin: "0 auto 24px" }}
              />
              <Text style={footerText}>
                You received this email because you joined the waitlist at{" "}
                <Link href={appUrl} style={footerLink}>
                  alevelmentor.com
                </Link>
                .
              </Text>
              <Text style={footerCopyright}>
                © {new Date().getFullYear()} A Level Mentor. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;

// ─── Styles ─────────────────────────────────────────────────────────────────

const main: React.CSSProperties = {
  backgroundColor: "#000000",
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const outerWrapper: React.CSSProperties = {
  backgroundColor: "#000000",
  width: "100%",
  padding: "40px 0",
};

const cardsWrapper: React.CSSProperties = {
  maxWidth: "480px",
  margin: "0 auto",
  backgroundColor: "#121214",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.1)",
  overflow: "hidden",
};

const header: React.CSSProperties = {
  padding: "32px 0 24px",
  textAlign: "center" as const,
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  backgroundColor: "#0c0c0e",
};

const hero: React.CSSProperties = {
  padding: "32px 32px 16px",
  textAlign: "center" as const,
};

const eyebrow: React.CSSProperties = {
  color: "#5a35f8",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.1em",
  marginBottom: "12px",
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
  lineHeight: "1.6",
  margin: 0,
};

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
  letterSpacing: "0.1em",
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
};

const referralSection: React.CSSProperties = {
  padding: "0 32px 32px",
  textAlign: "center" as const,
};

const h2: React.CSSProperties = {
  color: "#fafafa",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0 0 8px",
};

const bodyText: React.CSSProperties = {
  color: "#a1a1aa",
  fontSize: "14px",
  lineHeight: "1.6",
  marginBottom: "20px",
};

const linkContainer: React.CSSProperties = {
  backgroundColor: "#000000",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  padding: "12px",
  marginBottom: "20px",
};

const linkText: React.CSSProperties = {
  color: "#8b6cf9",
  fontSize: "12px",
  fontFamily: "monospace",
  margin: 0,
  wordBreak: "break-all" as const,
};

const ctaButton: React.CSSProperties = {
  backgroundColor: "#fafafa",
  color: "#000000",
  fontSize: "14px",
  fontWeight: "600",
  padding: "14px 28px",
  borderRadius: "50px",
  textDecoration: "none",
};

const divider: React.CSSProperties = {
  borderColor: "rgba(255,255,255,0.08)",
  marginTop: "0",
  marginBottom: "0",
};

const footer: React.CSSProperties = {
  backgroundColor: "#0c0c0e",
  padding: "32px",
  textAlign: "center" as const,
};

const footerText: React.CSSProperties = {
  color: "#52525b",
  fontSize: "12px",
  lineHeight: "1.5",
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

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
        {/* ── Header bar ─────────────────────────────────────────────── */}
        <Container style={wrapper}>
          <Section style={header}>
            <Img
              src={`${appUrl}/logo_large_light.svg`}
              alt="alevelmentor"
              width={140}
              height={20}
              style={{ display: "block" }}
            />
          </Section>

          {/* ── Hero ─────────────────────────────────────────────────── */}
          <Section style={hero}>
            <Text style={eyebrow}>Early Access Waitlist</Text>
            <Heading style={h1}>You&apos;re in. 🎉</Heading>
            <Text style={heroBody}>
              Welcome aboard. You&apos;re currently{" "}
              <span style={accentText}>
                #{rank} of {totalCount}
              </span>{" "}
              students on the waitlist. We&apos;re rolling out access in waves —
              you&apos;ll hear from us the moment your spot is ready.
            </Text>
          </Section>

          {/* ── Rank pill ────────────────────────────────────────────── */}
          <Section style={rankSection}>
            <table
              cellPadding={0}
              cellSpacing={0}
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <tr>
                <td style={rankCell}>
                  <Text style={rankLabel}>Your position</Text>
                  <Text style={rankNumber}>#{rank}</Text>
                  <Text style={rankSub}>out of {totalCount} students</Text>
                </td>
              </tr>
            </table>
          </Section>

          {/* ── Referral ─────────────────────────────────────────────── */}
          <Section style={referralSection}>
            <Text style={sectionHeading}>Move up the list faster</Text>
            <Text style={sectionBody}>
              Every friend who joins using your link bumps you up one spot.
              Share it anywhere.
            </Text>

            {/* Link box */}
            <table
              cellPadding={0}
              cellSpacing={0}
              style={{ width: "100%", marginBottom: "16px" }}
            >
              <tr>
                <td style={linkBox}>
                  <Text style={linkText}>{referralUrl}</Text>
                </td>
              </tr>
            </table>

            <Button style={ctaButton} href={referralUrl}>
              Share my referral link →
            </Button>
          </Section>

          <Hr style={divider} />

          {/* ── What to expect ───────────────────────────────────────── */}
          <Section style={featuresSection}>
            <Text style={sectionHeading}>What you&apos;ll get access to</Text>

            <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
              <tr>
                <td style={featureIcon}>🗺️</td>
                <td style={featureCopy}>
                  <Text style={featureTitle}>Smart Roadmap</Text>
                  <Text style={featureDesc}>
                    Every topic across every subject, scheduled around your exam
                    dates.
                  </Text>
                </td>
              </tr>
              <tr>
                <td style={featureIcon}>🧠</td>
                <td style={featureCopy}>
                  <Text style={featureTitle}>AI Mentor</Text>
                  <Text style={featureDesc}>
                    Ask any A-Level question and get exam-board specific
                    explanations instantly.
                  </Text>
                </td>
              </tr>
              <tr>
                <td style={featureIcon}>📈</td>
                <td style={featureCopy}>
                  <Text style={featureTitle}>Grade Predictor</Text>
                  <Text style={featureDesc}>
                    See your predicted grade update live with every task you
                    complete.
                  </Text>
                </td>
              </tr>
              <tr>
                <td style={featureIcon}>📄</td>
                <td style={featureCopy}>
                  <Text style={featureTitle}>Past Paper Engine</Text>
                  <Text style={featureDesc}>
                    Targeted practice on your exact weak spots, not random
                    papers.
                  </Text>
                </td>
              </tr>
            </table>
          </Section>

          <Hr style={divider} />

          {/* ── Footer ───────────────────────────────────────────────── */}
          <Section style={footer}>
            <Text style={footerText}>
              You received this because you signed up at{" "}
              <Link href={appUrl} style={footerLink}>
                alevelmentor.com
              </Link>{" "}
              with {email}.
            </Text>
            <Text style={{ ...footerText, marginTop: "4px" }}>
              © {new Date().getFullYear()} alevelmentor · All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;

// ─── Styles ─────────────────────────────────────────────────────────────────

const main: React.CSSProperties = {
  backgroundColor: "#09090b",
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  margin: 0,
  padding: "40px 0",
};

const wrapper: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  backgroundColor: "#121214",
  borderRadius: "18px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 4px 32px rgba(90,53,248,0.12)",
};

const header: React.CSSProperties = {
  backgroundColor: "#5a35f8",
  padding: "22px 32px",
};

const hero: React.CSSProperties = {
  padding: "36px 32px 28px",
  backgroundColor: "#121214",
};

const eyebrow: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#3ed6ff",
  margin: "0 0 10px",
};

const h1: React.CSSProperties = {
  fontSize: "30px",
  fontWeight: "800",
  color: "#fafafa",
  letterSpacing: "-0.03em",
  lineHeight: "1.15",
  margin: "0 0 14px",
};

const heroBody: React.CSSProperties = {
  fontSize: "15px",
  color: "#a1a1aa",
  lineHeight: "1.65",
  margin: 0,
};

const accentText: React.CSSProperties = {
  color: "#8b6cf9",
  fontWeight: "700",
};

// Rank card
const rankSection: React.CSSProperties = {
  padding: "0 32px 28px",
};

const rankCell: React.CSSProperties = {
  backgroundColor: "#5a35f8",
  borderRadius: "14px",
  padding: "22px 24px",
  textAlign: "center",
  border: "1px solid rgba(255,255,255,0.15)",
};

const rankLabel: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "rgba(255,255,255,0.55)",
  margin: "0 0 4px",
};

const rankNumber: React.CSSProperties = {
  fontSize: "52px",
  fontWeight: "900",
  color: "#ffffff",
  margin: "0",
  lineHeight: "1",
  letterSpacing: "-0.05em",
};

const rankSub: React.CSSProperties = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.55)",
  margin: "6px 0 0",
};

// Referral
const referralSection: React.CSSProperties = {
  padding: "0 32px 28px",
};

const sectionHeading: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#fafafa",
  margin: "0 0 6px",
  letterSpacing: "-0.01em",
};

const sectionBody: React.CSSProperties = {
  fontSize: "14px",
  color: "#a1a1aa",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const linkBox: React.CSSProperties = {
  backgroundColor: "#18181b",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  padding: "11px 16px",
};

const linkText: React.CSSProperties = {
  fontSize: "12px",
  color: "#8b6cf9",
  fontFamily: '"Courier New", Courier, monospace',
  wordBreak: "break-all",
  margin: 0,
};

const ctaButton: React.CSSProperties = {
  backgroundColor: "#5a35f8",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  padding: "13px 26px",
  borderRadius: "10px",
  textDecoration: "none",
  display: "inline-block",
  letterSpacing: "-0.01em",
};

// Features
const featuresSection: React.CSSProperties = {
  padding: "24px 32px 28px",
};

const featureIcon: React.CSSProperties = {
  width: "32px",
  fontSize: "18px",
  paddingTop: "14px",
  verticalAlign: "top",
};

const featureCopy: React.CSSProperties = {
  paddingTop: "14px",
  paddingBottom: "2px",
};

const featureTitle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#fafafa",
  margin: "0 0 2px",
};

const featureDesc: React.CSSProperties = {
  fontSize: "13px",
  color: "#a1a1aa",
  lineHeight: "1.55",
  margin: 0,
};

// Divider
const divider: React.CSSProperties = {
  borderColor: "rgba(255,255,255,0.06)",
  margin: "0 32px",
};

// Footer
const footer: React.CSSProperties = {
  padding: "18px 32px 24px",
  backgroundColor: "#0c0c0e",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "#71717a",
  lineHeight: "1.5",
  margin: 0,
};

const footerLink: React.CSSProperties = {
  color: "#8b6cf9",
  textDecoration: "none",
};

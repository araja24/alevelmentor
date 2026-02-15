import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AdminNotificationEmailProps {
  newUserEmail: string;
  rank: number;
  totalCount: number;
  referredBy: string | null;
}

export function AdminNotificationEmail({
  newUserEmail,
  rank,
  totalCount,
  referredBy,
}: AdminNotificationEmailProps) {
  const timestamp = new Date().toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/London",
  });

  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </Head>
      <Preview>
        New signup: {newUserEmail} — #{rank.toString()} of {totalCount.toString()}
      </Preview>
      <Body style={main}>
        <Container style={wrapper}>
          {/* ── Header ─────────────────────────────────────────────── */}
          <Section style={header}>
            <table
              cellPadding={0}
              cellSpacing={0}
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <tr>
                <td>
                  <Text style={brandName}>
                    alevel<span style={brandAccent}>mentor</span>
                  </Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text style={badge}>Admin</Text>
                </td>
              </tr>
            </table>
          </Section>

          {/* ── Body ───────────────────────────────────────────────── */}
          <Section style={body}>
            <Heading style={h2}>New waitlist signup</Heading>
            <Text style={subtitle}>{timestamp}</Text>

            {/* Data rows */}
            <Section style={dataCard}>
              <DataRow label="Email" value={newUserEmail} highlight />
              <Hr style={rowDivider} />
              <DataRow label="Position" value={`#${rank}`} />
              <Hr style={rowDivider} />
              <DataRow label="Total signups" value={String(totalCount)} />
              <Hr style={rowDivider} />
              <DataRow
                label="Referred by"
                value={referredBy ?? "Organic"}
                muted={!referredBy}
              />
            </Section>

            {/* Milestone callout */}
            {totalCount % 50 === 0 && (
              <Section style={milestone}>
                <Text style={milestoneText}>
                  🎉 Milestone: {totalCount} people have joined the waitlist!
                </Text>
              </Section>
            )}
          </Section>

          {/* ── Footer ─────────────────────────────────────────────── */}
          <Hr style={footerDivider} />
          <Section style={footer}>
            <Text style={footerText}>
              Sent automatically · alevelmentor waitlist system
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function DataRow({
  label,
  value,
  highlight,
  muted,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      style={{ width: "100%", borderCollapse: "collapse" }}
    >
      <tr>
        <td style={rowLeft}>
          <Text style={rowLabel}>{label}</Text>
        </td>
        <td style={rowRight}>
          <Text
            style={{
              ...rowValue,
              color: highlight ? "#8b6cf9" : muted ? "#52525b" : "#fafafa",
            }}
          >
            {value}
          </Text>
        </td>
      </tr>
    </table>
  );
}

export default AdminNotificationEmail;

// ─── Styles ─────────────────────────────────────────────────────────────────

const main: React.CSSProperties = {
  backgroundColor: "#09090b",
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  margin: 0,
  padding: "40px 0",
};

const wrapper: React.CSSProperties = {
  maxWidth: "480px",
  margin: "0 auto",
  backgroundColor: "#121214",
  borderRadius: "14px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 2px 16px rgba(90,53,248,0.1)",
};

const header: React.CSSProperties = {
  backgroundColor: "#09090b",
  padding: "18px 24px",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const brandName: React.CSSProperties = {
  fontSize: "17px",
  fontWeight: "800",
  color: "#ffffff",
  letterSpacing: "-0.03em",
  margin: 0,
};

const brandAccent: React.CSSProperties = {
  color: "#a78bfa",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "rgba(167,139,250,0.15)",
  color: "#a78bfa",
  fontSize: "10px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  padding: "3px 10px",
  borderRadius: "999px",
  border: "1px solid rgba(167,139,250,0.25)",
  margin: 0,
};

const body: React.CSSProperties = {
  padding: "24px 24px 20px",
};

const h2: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "800",
  color: "#fafafa",
  letterSpacing: "-0.03em",
  margin: "0 0 4px",
};

const subtitle: React.CSSProperties = {
  fontSize: "12px",
  color: "#71717a",
  margin: "0 0 20px",
};

// Data card
const dataCard: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  overflow: "hidden",
};

const rowLeft: React.CSSProperties = {
  padding: "11px 14px",
  width: "40%",
  verticalAlign: "middle",
};

const rowRight: React.CSSProperties = {
  padding: "11px 14px",
  textAlign: "right",
  verticalAlign: "middle",
};

const rowLabel: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "500",
  color: "#a1a1aa",
  margin: 0,
};

const rowValue: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "600",
  margin: 0,
};

const rowDivider: React.CSSProperties = {
  borderColor: "rgba(255,255,255,0.06)",
  margin: 0,
};

// Milestone banner
const milestone: React.CSSProperties = {
  marginTop: "16px",
  backgroundColor: "rgba(90,53,248,0.1)",
  border: "1px solid rgba(90,53,248,0.25)",
  borderRadius: "10px",
  padding: "12px 16px",
};

const milestoneText: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#8b6cf9",
  margin: 0,
};

// Footer
const footerDivider: React.CSSProperties = {
  borderColor: "rgba(255,255,255,0.06)",
  margin: 0,
};

const footer: React.CSSProperties = {
  padding: "12px 24px 16px",
  backgroundColor: "#0c0c0e",
};

const footerText: React.CSSProperties = {
  fontSize: "11px",
  color: "#71717a",
  margin: 0,
};

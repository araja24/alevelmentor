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
    <Html lang="en" dir="ltr">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="dark light" />
        <meta name="supported-color-schemes" content="dark light" />
        <style>{`
          :root { color-scheme: dark light; }

          @media only screen and (max-width: 480px) {
            .email-container { width: 100% !important; border-radius: 0 !important; }
            .email-padding { padding-left: 16px !important; padding-right: 16px !important; }
            .data-label { font-size: 11px !important; }
            .data-value { font-size: 12px !important; }
          }

          @media (prefers-color-scheme: light) {
            .email-body { background-color: #f4f4f5 !important; }
            .email-container { background-color: #ffffff !important; border-color: #e4e4e7 !important; box-shadow: 0 2px 16px rgba(0,0,0,0.06) !important; }
            .header-bg { background-color: #fafafa !important; border-color: #e4e4e7 !important; }
            .footer-bg { background-color: #fafafa !important; }
            .text-primary { color: #09090b !important; }
            .text-secondary { color: #52525b !important; }
            .text-muted { color: #71717a !important; }
            .brand-text { color: #09090b !important; }
            .data-card { border-color: #e4e4e7 !important; }
            .row-divider { border-color: #f4f4f5 !important; }
            .milestone-box { background-color: rgba(90,53,248,0.06) !important; border-color: rgba(90,53,248,0.15) !important; }
            .divider { border-color: #e4e4e7 !important; }
          }
        `}</style>
      </Head>
      <Preview>
        New signup: {newUserEmail} — #{rank.toString()} of{" "}
        {totalCount.toString()}
      </Preview>
      <Body style={main} className="email-body">
        <Section style={outerWrapper}>
          <Container style={container} className="email-container">
            {/* ── Header ────────────────────────────────────────── */}
            <Section style={headerStyle} className="header-bg">
              <table
                cellPadding={0}
                cellSpacing={0}
                role="presentation"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <tr>
                  <td>
                    <Text style={brandName} className="brand-text">
                      a<span style={brandAccent}>l</span>m
                    </Text>
                  </td>
                  <td style={{ textAlign: "right" as const }}>
                    <Text style={badge}>Admin</Text>
                  </td>
                </tr>
              </table>
            </Section>

            {/* ── Body ──────────────────────────────────────────── */}
            <Section style={bodySection} className="email-padding">
              <Heading style={h2} className="text-primary">
                New waitlist signup
              </Heading>
              <Text style={subtitle} className="text-muted">
                {timestamp}
              </Text>

              <Section style={dataCard} className="data-card">
                <DataRow label="Email" value={newUserEmail} highlight />
                <Hr style={rowDivider} className="row-divider" />
                <DataRow label="Position" value={`#${rank}`} />
                <Hr style={rowDivider} className="row-divider" />
                <DataRow
                  label="Total signups"
                  value={String(totalCount)}
                />
                <Hr style={rowDivider} className="row-divider" />
                <DataRow
                  label="Referred by"
                  value={referredBy ?? "Organic"}
                  muted={!referredBy}
                />
              </Section>

              {totalCount % 50 === 0 && (
                <Section style={milestone} className="milestone-box">
                  <Text style={milestoneText}>
                    🎉 Milestone: {totalCount} people have joined the waitlist!
                  </Text>
                </Section>
              )}
            </Section>

            {/* ── Footer ────────────────────────────────────────── */}
            <Hr style={footerDivider} className="divider" />
            <Section style={footerStyle} className="footer-bg email-padding">
              <Text style={footerText} className="text-muted">
                Sent automatically · A Level Mentor waitlist system
              </Text>
            </Section>
          </Container>
        </Section>
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
      role="presentation"
      style={{ width: "100%", borderCollapse: "collapse" }}
    >
      <tr>
        <td style={rowLeft}>
          <Text style={rowLabel} className="text-muted data-label">
            {label}
          </Text>
        </td>
        <td style={rowRight}>
          <Text
            className="data-value"
            style={{
              ...rowValue,
              color: highlight ? "#533fec" : muted ? "#52525b" : "#fafafa",
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

/* ─── Styles ──────────────────────────────────────────────────────────────── */

const fontStack =
  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const main: React.CSSProperties = {
  backgroundColor: "#09090b",
  fontFamily: fontStack,
  margin: 0,
  padding: 0,
};

const outerWrapper: React.CSSProperties = {
  backgroundColor: "#09090b",
  width: "100%",
  padding: "32px 16px",
};

const container: React.CSSProperties = {
  maxWidth: "480px",
  width: "100%",
  margin: "0 auto",
  backgroundColor: "#121214",
  borderRadius: "14px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 2px 16px rgba(90,53,248,0.1)",
};

/* Header */
const headerStyle: React.CSSProperties = {
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
  fontFamily: fontStack,
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
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  padding: "3px 10px",
  borderRadius: "999px",
  border: "1px solid rgba(167,139,250,0.25)",
  margin: 0,
};

/* Body */
const bodySection: React.CSSProperties = {
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

/* Data card */
const dataCard: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  overflow: "hidden",
};

const rowLeft: React.CSSProperties = {
  padding: "12px 14px",
  width: "40%",
  verticalAlign: "middle" as const,
};

const rowRight: React.CSSProperties = {
  padding: "12px 14px",
  textAlign: "right" as const,
  verticalAlign: "middle" as const,
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

/* Milestone */
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
  color: "#533fec",
  margin: 0,
};

/* Footer */
const footerDivider: React.CSSProperties = {
  borderColor: "rgba(255,255,255,0.06)",
  margin: 0,
};

const footerStyle: React.CSSProperties = {
  padding: "14px 24px 18px",
  backgroundColor: "#0c0c0e",
};

const footerText: React.CSSProperties = {
  fontSize: "11px",
  color: "#71717a",
  margin: 0,
};

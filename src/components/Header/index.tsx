import React from "react";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Profile", href: "/profile" },
];

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <div style={brandStyle}>
        <img src="/images/logo.png" alt="App logo" style={logoStyle} />
        <div>
          <div style={titleStyle}>IoT Dashboard</div>
          <div style={subtitleStyle}>User logs available</div>
        </div>
      </div>

      <nav style={navStyle}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} style={linkStyle}>
            {link.title}
          </a>
        ))}
      </nav>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 24px",
  background: "#0f172a",
  color: "#f8fafc",
  borderBottom: "1px solid #334155",
  width: "100%",
};

const brandStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

const linkStyle: React.CSSProperties = {
  color: "#e2e8f0",
  textDecoration: "none",
  fontWeight: 500,
};

const userStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const logoStyle: React.CSSProperties = {
  width: "38px",
  height: "38px",
  objectFit: "cover",
  borderRadius: "8px",
};

const avatarStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid #475569",
};

const titleStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#94a3b8",
};

const userNameStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 600,
};

const userLogStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#cbd5e1",
};

export default Header;

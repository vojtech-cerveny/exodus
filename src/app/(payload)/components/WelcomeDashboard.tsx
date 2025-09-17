export default function WelcomeDashboard() {
  return (
    <div
      className="welcome-dashboard"
      // style={{
      //   padding: "20px",
      //   margin: "20px 0",
      //   backgroundColor: "#f8f9fa",
      //   border: "1px solid #e9ecef",
      //   borderRadius: "8px",
      //   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      // }}
    >
      <h2
        style={{
          margin: "0 0 16px 0",
          color: "#495057",
          fontSize: "24px",
          fontWeight: "600",
        }}
      >
        EXODUS90 ADMIN PANEL
      </h2>
      <p
        style={{
          margin: "0 0 12px 0",
          color: "#6c757d",
          fontSize: "16px",
          lineHeight: "1.5",
        }}
      >
        Vítej v admin panelu Exodus90. Zde můžeš spravovat všechny části aplikace.
      </p>

      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Left Column - New Exercise */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #ddd",
            borderRadius: "8px",
            // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 16px 0",
              color: "#495057",
              fontSize: "18px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "20px" }}>🏋️</span>
            Nové cvičení
          </h3>
          <ol
            style={{
              margin: "0",
              paddingLeft: "20px",
              color: "#424242",
              fontSize: "14px",
              lineHeight: "1.7",
            }}
          >
            <li style={{ marginBottom: "10px" }}>
              <strong>Cvičení:</strong> Vytvoř obecné cvičení bez dat na{" "}
              <a
                href="/admin/collections/exercises?limit=10"
                style={{
                  color: "#495057",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "2px 4px",
                  backgroundColor: "rgba(73, 80, 87, 0.1)",
                  borderRadius: "3px",
                }}
              >
                /admin/collections/exercises
              </a>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Verze:</strong> Vytvoř verzi podle aktuálního roku na{" "}
              <a
                href="/admin/collections/versions?limit=10"
                style={{
                  color: "#495057",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "2px 4px",
                  backgroundColor: "rgba(73, 80, 87, 0.1)",
                  borderRadius: "3px",
                }}
              >
                /admin/collections/versions
              </a>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Dny:</strong> Přidej konkrétní dny na{" "}
              <a
                href="/admin/collections/days"
                style={{
                  color: "#495057",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "2px 4px",
                  backgroundColor: "rgba(73, 80, 87, 0.1)",
                  borderRadius: "3px",
                }}
              >
                /admin/collections/days
              </a>
            </li>
            <li>
              <strong>Průvodce:</strong> Pokud potřebuješ průvodce, vytvoř ho na{" "}
              <a
                href="/admin/collections/guide?limit=10"
                style={{
                  color: "#495057",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "2px 4px",
                  backgroundColor: "rgba(73, 80, 87, 0.1)",
                  borderRadius: "3px",
                }}
              >
                /admin/collections/guide
              </a>
            </li>
          </ol>
        </div>

        {/* Right Column - Exercise Version */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #ddd",
            borderRadius: "8px",
            // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 16px 0",
              color: "#495057",
              fontSize: "18px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "20px" }}>📅</span>
            Nový ročník cvičení
          </h3>
          <ol
            style={{
              margin: "0",
              paddingLeft: "20px",
              color: "#424242",
              fontSize: "14px",
              lineHeight: "1.7",
            }}
          >
            <li style={{ marginBottom: "10px" }}>
              <strong>Verze:</strong> Vytvoř verzi podle aktuálního roku na{" "}
              <a
                href="/admin/collections/versions?limit=10"
                style={{
                  color: "#495057",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "2px 4px",
                  backgroundColor: "rgba(73, 80, 87, 0.1)",
                  borderRadius: "3px",
                }}
              >
                /admin/collections/versions
              </a>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Dny:</strong> Přidej konkrétní dny na{" "}
              <a
                href="/admin/collections/days"
                style={{
                  color: "#495057",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "2px 4px",
                  backgroundColor: "rgba(73, 80, 87, 0.1)",
                  borderRadius: "3px",
                }}
              >
                /admin/collections/days
              </a>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Průvodce:</strong> Pokud potřebuješ průvodce, vytvoř ho na{" "}
              <a
                href="/admin/collections/guide?limit=10"
                style={{
                  color: "#495057",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "2px 4px",
                  backgroundColor: "rgba(73, 80, 87, 0.1)",
                  borderRadius: "3px",
                }}
              >
                /admin/collections/guide
              </a>
            </li>
            <li>
              <strong>Úkoly:</strong> Pokud potřebuješ přidat úkoly, vytvoř je na{" "}
              <a
                href="/admin/collections/tasks?limit=10"
                style={{
                  color: "#495057",
                  textDecoration: "none",
                  fontWeight: "500",
                  padding: "2px 4px",
                  backgroundColor: "rgba(73, 80, 87, 0.1)",
                  borderRadius: "3px",
                }}
              >
                /admin/collections/tasks
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

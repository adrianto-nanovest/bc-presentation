import { LucideIcon } from "../LucideIcon";

interface SettingsPanelProps {
  highlighted?: string[];
}

export function SettingsPanel(_props: SettingsPanelProps) {
  return (
    <div
      data-testid="settings-panel"
      role="tabpanel"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <LucideIcon name="Settings" size={40} color="var(--copper-400)" />
      <div
        style={{
          marginTop: 14,
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: 13,
          color: "var(--neutral-400)",
        }}
      >
        System settings · coming soon.
      </div>
    </div>
  );
}

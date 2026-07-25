import React from "react";
import { Card, Badge, Button } from "../DesignSystem";
import { ShieldCheck, Smartphone, Laptop, Key, RefreshCw, Trash2, CheckCircle2 } from "lucide-react";
import { ConnectedDevice } from "../../types/settingsTypes";

interface SecurityCardProps {
  twoFactorEnabled: boolean;
  twoFactorMethod: string;
  onToggleTwoFactor: () => void;
  devices: ConnectedDevice[];
  onRevokeDevice: (id: string) => void;
  onChangePassword: () => void;
  onExportData: () => void;
}

export const SecurityCard: React.FC<SecurityCardProps> = ({
  twoFactorEnabled,
  twoFactorMethod,
  onToggleTwoFactor,
  devices,
  onRevokeDevice,
  onChangePassword,
  onExportData,
}) => {
  return (
    <div className="space-y-6">
      {/* 2FA Configuration Card */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--success)] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
                  Two-Factor Authentication (2FA)
                </h3>
                <Badge variant={twoFactorEnabled ? "success" : "neutral"}>
                  {twoFactorEnabled ? "Enabled & Active" : "Disabled"}
                </Badge>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Require an authentication code via mobile app (TOTP) when logging in from unrecognized devices.
              </p>
            </div>
          </div>

          <Button
            variant={twoFactorEnabled ? "outline" : "accent"}
            size="sm"
            onClick={onToggleTwoFactor}
          >
            {twoFactorEnabled ? "Configure / Disable 2FA" : "Enable 2FA Protection"}
          </Button>
        </div>

        {twoFactorEnabled && (
          <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
              Method: <strong className="text-[var(--text-primary)] font-mono">{twoFactorMethod}</strong>
            </span>
            <span className="font-mono text-[11px] text-[var(--accent)]">3 Recovery Codes Remaining</span>
          </div>
        )}
      </Card>

      {/* Password & Credential Management */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--accent)] shrink-0">
              <Key className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
                Password & Security Credentials
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Last updated 14 days ago. Strong password policies recommended for candidate account isolation.
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={onChangePassword}>
            Update Password
          </Button>
        </div>
      </Card>

      {/* Connected Devices & Active Login Sessions */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div>
            <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
              Connected Devices & Active Sessions ({devices.length})
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Manage machines and mobile browsers currently authorized with your token session.
            </p>
          </div>
          <Badge variant="accent">{devices.length} Active</Badge>
        </div>

        <div className="space-y-3">
          {devices.map((dev) => (
            <div
              key={dev.id}
              className="p-3.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] shrink-0 mt-0.5">
                  {dev.deviceType === "MacBook" || dev.deviceType === "Linux Workstation" || dev.deviceType === "Windows PC" ? (
                    <Laptop className="w-4 h-4 text-[var(--accent)]" />
                  ) : (
                    <Smartphone className="w-4 h-4 text-[var(--secondary-accent)]" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[var(--text-primary)] font-mono">{dev.name}</span>
                    {dev.isCurrent && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono bg-[var(--success)]/20 text-[var(--success)] rounded font-semibold">
                        This Device
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] font-mono pt-0.5">
                    {dev.location} • IP: {dev.ipAddress}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                  {dev.lastActive}
                </span>
                {!dev.isCurrent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[var(--error)] hover:bg-[var(--error)]/10"
                    onClick={() => onRevokeDevice(dev.id)}
                  >
                    Revoke
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

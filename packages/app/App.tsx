import React, { useState } from 'react';
import { Alert } from '../components/Alert';
import { Box } from '@mui/material';
import { PALETTE_COLORS } from '../components/theme/constants';

const Section = ({ label }: { label: string }) => (
  <Box
    component="h2"
    sx={{
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: PALETTE_COLORS.NEUTRAL_GRAY[600],
      mb: 2,
      mt: 5,
      '&:first-of-type': { mt: 0 },
    }}
  >
    {label}
  </Box>
);

export default function App() {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});

  const dismiss = (key: string) =>
    setDismissed((prev) => ({ ...prev, [key]: true }));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f4f6f7',
        px: 4,
        py: 5,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          mb: 6,
          pb: 3,
          borderBottom: `1px solid ${PALETTE_COLORS.NEUTRAL_GRAY[200]}`,
        }}
      >
        <Box
          component="h1"
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: 28,
            fontWeight: 700,
            color: PALETTE_COLORS.NOBLE_BLUE[500],
          }}
        >
          Alert Component
        </Box>
        <Box
          component="p"
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: 14,
            color: PALETTE_COLORS.NEUTRAL_GRAY[600],
            mt: 1,
          }}
        >
          All variants from the Design Language System · Figma node 113-7244
        </Box>
      </Box>

      {/* Subtle — Cards */}
      <Section label="Emphasis: Subtle — Cards" />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 2, mb: 2 }}>
        {(['success', 'error', 'warning', 'info'] as const).map((state) => (
          <Alert
            key={state}
            state={state}
            emphasis="subtle"
            title="Alert Title"
            message="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries."
            showTitle
            showActions
            actionLabel="Button"
            linkLabel="Link"
            showDismiss
            onDismiss={() => {}}
          />
        ))}
      </Box>

      {/* Subtler — Cards */}
      <Section label="Emphasis: Subtler — Cards" />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 2 }}>
        {(['success', 'error', 'warning', 'info'] as const).map((state) => (
          <Alert
            key={state}
            state={state}
            emphasis="subtler"
            title="Alert Title"
            message="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries."
            showTitle
          />
        ))}
      </Box>

      {/* Subtle — Flag banners */}
      <Section label="Emphasis: Subtle — Flag Banners (isFlag)" />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {(['success', 'error', 'warning', 'info'] as const).map((state) => (
          !dismissed[`flag-${state}`] && (
            <Alert
              key={state}
              state={state}
              emphasis="subtle"
              isFlag
              title="Alert Title"
              message="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries."
              showTitle
              showActions
              actionLabel="Button"
              linkLabel="Link"
              showDismiss
              onDismiss={() => dismiss(`flag-${state}`)}
            />
          )
        ))}
      </Box>

      {/* No title */}
      <Section label="No Title (message only)" />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 2 }}>
        {(['success', 'error', 'warning', 'info'] as const).map((state) => (
          <Alert
            key={state}
            state={state}
            emphasis="subtle"
            showTitle={false}
            message="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries."
          />
        ))}
      </Box>
    </Box>
  );
}

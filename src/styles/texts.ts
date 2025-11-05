export const Fonts: { [key in any]: React.CSSProperties } = {
    LabelSmall: {
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "20px",
    },
    LabelMedium: {
        fontSize: "16px",
        fontWeight: 500,
        lineHeight: "24px",
    },
    LabelLarge: {
        fontSize: "18px",
        fontWeight: 500,
        lineHeight: "24px",
    },
    BodyTiny: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "20px",
    },
    BodySmall: {
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "24px",
    },
    BodyMedium: {
        fontSize: "18px",
        fontWeight: 400,
        lineHeight: "24px",
    },
    BodyLarge: {
        fontSize: "20px",
        fontWeight: 400,
        lineHeight: "32px",
    },
    TitleTiny: {
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "24px",
        letterSpacing: "-2.5%",
    },
    TitleSmall: {
        fontSize: "24px",
        fontWeight: 600,
        lineHeight: "32px",
        letterSpacing: "-2.5%",
    },
    TitleMedium: {
        fontSize: "36px",
        fontWeight: 600,
        lineHeight: "48px",
        letterSpacing: "-2.5%",
    },
    TitleLarge: {
        fontSize: "48px",
        fontWeight: 600,
        lineHeight: "64px",
        letterSpacing: "-2.5%",
    },
} as const

export type fontsKeyOfType = keyof typeof Fonts

"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
  Svg,
  Path,
} from "@react-pdf/renderer";
import rawtypedResumeDataZH from "@/app/contents/resume-pdf-zh.yml";

interface Job {
  name: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  techStack?: string;
}

interface Education {
  name: string;
  location: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  thesis: string;
}

interface IconProps {
  path: string;
  size?: number;
  color?: string;
  viewBox?: string;
}

interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

interface typedResumeDataZH {
  basics: {
    name: string;
    label: string;
    label2: string;
    location: {
      city: string;
      country: string;
    };
    email: string;
    phone: string;
    github?: string;
    website?: string;
  };
  work: Job[];
  education: Education[];
  skills: Skill[];
  interests: string[];
}

const typedResumeDataZH = rawtypedResumeDataZH as unknown as typedResumeDataZH;

// Register fonts
Font.register({
  family: "FZLanTing",
  src: "/fonts/FZLanTing.ttf",
});
Font.register({
  family: "NotoSansSC",
  src: "/fonts/NotoSansSC-Regular.ttf",
});
Font.register({
  family: "NotoSansSC",
  src: "/fonts/NotoSansSC-Bold.ttf",
  fontWeight: 700,
});
Font.register({
  family: "NotoSansSC",
  src: "/fonts/NotoSansSC-SemiBold.ttf",
  fontWeight: 600,
});

Font.registerHyphenationCallback((word) => {
  // If word contains CJK characters → split each char individually
  if (/[\u4E00-\u9FFF]/.test(word)) {
    return word.split(""); // break by character
  }
  // Otherwise → split by normal letters (so English wraps by spaces)
  return [word];
});

const colors = {
  text: {
    primary: "#1c4ed8",
    black: "#141b28",
    secondary: "#2a3644",
    light: "#6c7682",
  },
  border: {
    light: "#1c4ed8",
  },
  background: {
    white: "#ffffff",
  },
};

// Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background.white,
    padding: "30px 26px 22px 20px",
    fontFamily: "NotoSansSC",
    boxSizing: "border-box",
  },
  leftCol: {
    width: "72%",
    flexDirection: "column",
    flex: 1,
  },
  rightCol: {
    width: "31%",
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 2,
    fontFamily: "FZLanTing",
    color: colors.text.primary,
    lineHeight: 1.3,
  },
  label: {
    fontSize: 9,
    color: colors.text.light,
    maxWidth: "70%",
    lineHeight: 1.4,
    flexWrap: "wrap", // ✅ allow Chinese wrapping
  },
  contact: {
    backgroundColor: colors.text.primary,
    color: colors.background.white,
    padding: "10px 10px",
    fontSize: 9,
    marginBottom: 15,
    lineHeight: 1.4,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "flex-start",
  },
  section: {
    paddingTop: 10,
    borderTop: `1px solid ${colors.border.light}`,
    marginBottom: 10,
    color: colors.text.black,
    fontSize: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 10,
    fontFamily: "FZLanTing",
    color: colors.text.primary,
    lineHeight: 1.3,
  },
  jobTitle: {
    fontSize: 11,
    lineHeight: 1.3,
  },
  jobLocation: {
    fontSize: 9,
    color: colors.text.light,
    fontWeight: 100,
  },
  jobDescription: {
    fontSize: 9,
    color: colors.text.secondary,
    lineHeight: 1.4,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  jobHighlights: {
    maxWidth: "100%",
    lineHeight: 1.4,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2,
  },

  bulletSymbol: {
    width: 10, // keeps bullet area fixed
    fontSize: 9,
    lineHeight: 1.4,
    textAlign: "center",
    color: colors.text.secondary,
  },

  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
    color: colors.text.secondary,
    width: "100%",
    flexWrap: "nowrap",
  },
  jobTechStack: {
    fontSize: 8,
    fontWeight: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  jobDuration: {
    fontSize: 8,
    color: colors.text.light,
    lineHeight: 1.3,
    paddingTop: 2,
    fontWeight: 400,
  },
  bold: {
    fontWeight: 700,
  },
  semibold: {
    fontWeight: 600,
  },
  paragraph: {
    marginBottom: 4,
  },
  block: {
    marginBottom: 6,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillTitle: {
    fontSize: 10,
    marginBottom: 2,
    fontWeight: 700,
  },
  educationTitle: {
    fontSize: 10,
    fontWeight: 700,
  },
  bulletPoint: {
    marginLeft: 10,
  },
  twoColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    alignItems: "flex-start",
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    alignItems: "flex-end",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
});

// Icon component
const Icon = ({
  path,
  size = 12,
  color = colors.text.black,
  viewBox = "0 0 24 24",
}: IconProps) => (
  <Svg width={size} height={size} viewBox={viewBox}>
    <Path d={path} fill={color} />
  </Svg>
);

// Icon paths
const icons = {
  github:
    "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  email:
    "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  phone:
    "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  location:
    "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  gearCode:
    "M474.84,320.8l-43.3-39.4c1.1-8.3,1.7-16.8,1.7-25.4s-.6-17.1-1.7-25.4l43.3-39.4c6.9-6.2,9.6-15.9,6.4-24.6l.1-.1c-4.4-11.9-9.7-23.3-15.8-34.3l-4.7-8.1c-6.6-11-14-21.4-22.1-31.2-5.9-7.1-15.7-9.6-24.5-6.8l-55.7,17.7c-13.4-10.3-28.2-18.9-44-25.4l-12.5-57.1c-2-9.1-9-16.3-18.2-17.8-13.8-2.3-28-3.5-42.5-3.5s-28.7,1.2-42.5,3.6c-9.2,1.5-16.2,8.7-18.2,17.8l-12.5,57.1c-15.8,6.5-30.6,15.1-44,25.4l-55.7-17.7c-8.8-2.8-18.6-.4-24.5,6.8-8.1,9.8-15.5,20.2-22.1,31.2l-4.7,8.1c-6.1,11-11.4,22.4-15.8,34.3-3.2,8.7-.5,18.4,6.4,24.6l43.3,39.4c-1.1,8.3-1.7,16.8-1.7,25.4s.6,17.1,1.7,25.5l-43.3,39.4c-6.9,6.2-9.6,15.9-6.4,24.6,4.4,11.9,9.7,23.3,15.8,34.3l4.7,8.1c6.6,11,14,21.4,22.1,31.2,5.9,7.1,15.7,9.6,24.5,6.8l55.6-17.8c13.4,10.3,28.2,18.9,44,25.4l12.5,57.1c2,9.1,9,16.3,18.2,17.8,13.8,2.3,28,3.5,42.5,3.5s28.7-1.2,42.5-3.5c9.2,1.5,16.2,8.7,18.2-17.8l12.5-57.1c15.8-6.5,30.6-15.1,44-25.4l55.7,17.7c8.8,2.8,18.6.4,24.5-6.8,8.1-9.8,15.5-20.2,22.1-31.2l4.7-8.1c6.1-11,11.4-22.4,15.8-34.3,3.2-8.7.5-18.4-6.4-24.6Z",
  website:
    "M12,0C5.375,0,0,5.375,0,12s5.375,12,12,12s12-5.375,12-12S18.625,0,12,0z M19.625,6.84h-2.2 c-0.253-1.054-0.58-2.025-0.969-2.884c0.744,0.411,1.437,0.928,2.056,1.548C18.858,6.053,19.229,6.429,19.625,6.84z M21.188,12 c0,0.803-0.103,1.588-0.301,2.345h-3.004c0.075-0.759,0.115-1.543,0.115-2.345s-0.04-1.586-0.115-2.345h3.004 C21.085,10.412,21.188,11.197,21.188,12z M12,21.188c-0.243,0-0.984-0.478-1.724-1.956c-0.306-0.612-0.57-1.309-0.785-2.066h5.033 c-0.215,0.757-0.479,1.454-0.785,2.066C12.984,20.71,12.243,21.188,12,21.188z M8.96,14.344 c-0.087-0.76-0.133-1.545-0.133-2.344s0.046-1.584,0.133-2.344h6.08c0.086,0.76,0.133,1.545,0.133,2.344 s-0.047,1.584-0.133,2.344H8.96z M2.813,12c0-0.803,0.103-1.588,0.301-2.345h3.004c-0.075,0.759-0.115,1.543-0.115,2.345 s0.04,1.586,0.115,2.345H3.113C2.915,13.588,2.813,12.803,2.813,12z M12,2.813c0.243,0,0.984,0.478,1.724,1.956 c0.306,0.612,0.57,1.309,0.785,2.066h-5.033c0.215-0.757,0.479-1.454,0.785-2.066C11.016,3.29,11.757,2.813,12,2.813z M7.554,4.054 c-0.388,0.859-0.715,1.83-0.969,2.884H4.385c0.325-0.477,0.697-0.926,1.113-1.342C6.024,4.99,6.709,4.465,7.554,4.054z M4.385,17.16 h2.2c0.253,1.054,0.58,2.025,0.969,2.884c-0.744-0.411-1.437-0.928-2.056-1.548C5.142,17.947,4.771,17.571,4.385,17.16z M16.446,19.946 c0.388-0.859,0.715-1.83,0.969-2.884h2.2c-0.325,0.477-0.697,0.926-1.113,1.342C17.976,19.01,17.291,19.535,16.446,19.946z",
};

interface MultilineTextProps {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
}

const MultilineText = ({ text, style }: MultilineTextProps) => {
  return (
    <View style={style} wrap={false}>
      {text?.split("br").map((line, i) => (
        <Text key={i}>{line}</Text>
      ))}
    </View>
  );
};

// Main document
const ResumePDF = () => (
  <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{typedResumeDataZH.basics.name}</Text>
          <Text style={styles.label}>{typedResumeDataZH.basics.label}</Text>
          <Text style={styles.label}>{typedResumeDataZH.basics.label2}</Text>
        </View>

        <View style={styles.body}>
          {/* Left Column */}
          <View style={styles.leftCol}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                工作经历 ｜ Work Experience
              </Text>
              {typedResumeDataZH.work.map((job, index) => (
                <View key={index} style={styles.block}>
                  <View style={styles.twoColumn}>
                    <View style={styles.leftColumn}>
                      <Text style={styles.jobTitle}>
                        <Text style={styles.semibold}>{job.position}</Text>
                        {job.name && (
                          <Text style={styles.bold}>{" · " + job.name}</Text>
                        )}
                      </Text>
                      <Text style={styles.jobLocation}>{job.location}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                      <Text style={styles.jobDuration}>
                        {`${job.startDate} — ${job.endDate}`}
                      </Text>
                    </View>
                  </View>

                  <MultilineText
                    text={job.summary}
                    style={[styles.jobDescription, styles.paragraph]}
                  />

                  {job.highlights && (
                    <View style={[styles.paragraph, styles.jobHighlights]}>
                      {job.highlights.map((highlight: string, idx: number) => (
                        <View key={idx} style={styles.bulletRow}>
                          <View style={styles.bulletSymbol}>
                            <Text>•</Text>
                          </View>
                          <MultilineText
                            text={highlight}
                            style={styles.bulletText}
                          />
                        </View>
                      ))}
                    </View>
                  )}

                  {job.techStack && (
                    <View style={[styles.jobTechStack, styles.paragraph]}>
                      <Icon
                        path={icons.gearCode}
                        size={9}
                        viewBox="0 0 482.58 511.9"
                      />
                      <Text>{job.techStack}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
          <View style={styles.rightCol}>
            {/* Contact */}
            <View style={styles.contact}>
              <View style={styles.contactItem}>
                <Icon
                  color={colors.background.white}
                  path={icons.location}
                  size={10}
                />
                <Text>
                  {typedResumeDataZH.basics.location.city},{" "}
                  {typedResumeDataZH.basics.location.country}
                </Text>
              </View>
              <View style={styles.contactItem}>
                <Icon
                  color={colors.background.white}
                  path={icons.email}
                  size={10}
                />
                <Text>{typedResumeDataZH.basics.email}</Text>
              </View>
              <View style={styles.contactItem}>
                <Icon
                  color={colors.background.white}
                  path={icons.phone}
                  size={10}
                />
                <Text>{typedResumeDataZH.basics.phone}</Text>
              </View>
              <View style={styles.contactItem}>
                <Icon
                  color={colors.background.white}
                  path={icons.github}
                  size={10}
                />
                <Text>{typedResumeDataZH.basics.github}</Text>
              </View>
              <View style={styles.contactItem}>
                <Icon
                  color={colors.background.white}
                  path={icons.website}
                  size={10}
                />
                <Text>{typedResumeDataZH.basics.website}</Text>
              </View>
            </View>
            {/* Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>技能 ｜ Skills</Text>
              <View style={styles.skillsContainer}>
                {typedResumeDataZH.skills.map((skill: Skill, index: number) => (
                  <View
                    key={index}
                    style={[styles.paragraph, styles.jobDescription]}
                  >
                    <Text style={styles.skillTitle}>{skill.name}</Text>
                    <Text style={styles.jobDescription}>
                      {skill.keywords.join(", ")}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            {/* Education */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>教育 ｜ Education</Text>
              {typedResumeDataZH.education.map(
                (edu: Education, index: number) => (
                  <View key={index}>
                    <View style={styles.paragraph}>
                      <Text style={styles.educationTitle}>{edu.name}</Text>
                      <Text style={styles.jobDuration}>
                        {`${edu.startDate} — ${edu.endDate}`}
                      </Text>
                    </View>

                    <Text style={styles.jobDescription}>{edu.studyType}</Text>
                    <Text style={styles.jobDescription}>{edu.score}</Text>
                    <View>
                      <Text style={styles.jobDescription}>
                        论文：{edu.thesis}
                      </Text>
                    </View>
                  </View>
                )
              )}
            </View>

            {/* Interests */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>兴趣爱好 ｜ Interests</Text>
              <Text style={styles.jobDescription}>
                {typedResumeDataZH.interests.join(", ")}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default ResumePDF;

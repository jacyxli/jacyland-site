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
import rawResumeData from "@/app/contents/resume-pdf.yml";

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

interface ResumeData {
  basics: {
    name: string;
    label: string;
    location: {
      city: string;
      country: string;
    };
    email: string;
    phone: string;
    github?: string;
  };
  work: Job[];
  education: Education[];
  skills: Skill[];
  interests: string[];
}

// Type assertion to ensure resumeData has the correct structure
const typedResumeData = rawResumeData as unknown as ResumeData;

// Register fonts
Font.register({
  family: "FZLanTing",
  src: "/fonts/FZLanTing.ttf",
});

Font.register({
  family: "Inter",
  src: "/fonts/Inter-Regular.ttf",
});

Font.register({
  family: "Inter",
  src: "/fonts/Inter-Bold.ttf",
  fontWeight: 700,
});

Font.register({
  family: "Inter",
  src: "/fonts/Inter-SemiBold.ttf",
  fontWeight: 600,
});

Font.register({
  family: "Inter",
  src: "/fonts/Inter-Italic.ttf",
  fontStyle: "italic",
});

// Create styles
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

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background.white,
    padding: "45px 26px 22px 26px",
    fontFamily: "Inter",
    boxSizing: "border-box",
  },
  leftCol: {
    width: "69%",
    flexDirection: "column",
    flex: 1,
  },
  rightCol: {
    width: "31%",
  },
  header: {
    marginBottom: 40,
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
    maxWidth: "60%",
    lineHeight: 1.3,
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
  italic: {
    fontStyle: "italic",
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
    fontStyle: "italic",
  },
  jobDescription: {
    fontSize: 9,
    color: colors.text.secondary,
  },
  jobTechStack: {
    fontSize: 8,
    fontStyle: "italic",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  jobDuration: {
    fontSize: 8,
    color: colors.text.light,
    lineHeight: 1.3,
    paddingTop: 2,
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
    marginBottom: 10,
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
    "M474.84,320.8l-43.3-39.4c1.1-8.3,1.7-16.8,1.7-25.4s-.6-17.1-1.7-25.4l43.3-39.4c6.9-6.2,9.6-15.9,6.4-24.6l.1-.1c-4.4-11.9-9.7-23.3-15.8-34.3l-4.7-8.1c-6.6-11-14-21.4-22.1-31.2-5.9-7.1-15.7-9.6-24.5-6.8l-55.7,17.7c-13.4-10.3-28.2-18.9-44-25.4l-12.5-57.1c-2-9.1-9-16.3-18.2-17.8-13.8-2.3-28-3.5-42.5-3.5s-28.7,1.2-42.5,3.6c-9.2,1.5-16.2,8.7-18.2,17.8l-12.5,57.1c-15.8,6.5-30.6,15.1-44,25.4l-55.7-17.7c-8.8-2.8-18.6-.4-24.5,6.8-8.1,9.8-15.5,20.2-22.1,31.2l-4.7,8.1c-6.1,11-11.4,22.4-15.8,34.3-3.2,8.7-.5,18.4,6.4,24.6l43.3,39.4c-1.1,8.3-1.7,16.8-1.7,25.4s.6,17.1,1.7,25.5l-43.3,39.4c-6.9,6.2-9.6,15.9-6.4,24.6,4.4,11.9,9.7,23.3,15.8,34.3l4.7,8.1c6.6,11,14,21.4,22.1,31.2,5.9,7.1,15.7,9.6,24.5,6.8l55.6-17.8c13.4,10.3,28.2,18.9,44,25.4l12.5,57.1c2,9.1,9,16.3,18.2,17.8,13.8,2.3,28,3.5,42.5,3.5s28.7-1.2,42.5-3.5c9.2-1.5,16.2-8.7,18.2-17.8l12.5-57.1c15.8-6.5,30.6-15.1,44-25.4l55.7,17.7c8.8,2.8,18.6.4,24.5-6.8,8.1-9.8,15.5-20.2,22.1-31.2l4.7-8.1c6.1-11,11.4-22.4,15.8-34.3,3.2-8.7.5-18.4-6.4-24.6ZM173.74,295.3c5.51,5.51,5.51,14.45,0,19.96s-14.45,5.51-19.96,0l-49.35-49.35c-5.51-5.51-5.51-14.45,0-19.96l49.35-49.35c5.51-5.51,14.45-5.51,19.96,0,5.51,5.51,5.51,14.45,0,19.96l-39.39,39.39,39.39,39.35ZM283.06,161.13l-56.4,197.4c-2.16,7.49-9.96,11.85-17.45,9.69-7.49-2.16-11.85-9.96-9.69-17.45l56.4-197.4c2.16-7.49,9.96-11.85,17.45-9.69,7.49,2.16,11.85,9.96,9.69,17.45ZM378.14,265.95l-49.35,49.35c-5.51,5.51-14.45,5.51-19.96,0s-5.51-14.45,0-19.96l39.39-39.39-39.35-39.39c-5.5-5.5-5.51-14.43-.02-19.94,0,0-.02.01-.02.02l.04-.04s-.01.02-.02.02c5.51-5.49,14.44-5.48,19.94.02l49.35,49.35c5.51,5.51,5.51,14.45,0,19.96Z",
};

// Create Document Component
const ResumePDF = () => (
  <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{typedResumeData.basics.name}</Text>
          <Text style={styles.label}>{typedResumeData.basics.label}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.leftCol}>
            {/* Work Experience */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {typedResumeData.work.map((job: Job, index: number) => (
                <View key={index} style={styles.block}>
                  <View style={[styles.twoColumn]}>
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

                  <Text style={[styles.jobDescription, styles.paragraph]}>
                    {job.summary}
                  </Text>

                  {job.highlights && (
                    <View style={styles.paragraph}>
                      {job.highlights.map((highlight: string, idx: number) => (
                        <View key={idx} style={styles.bulletPoint}>
                          <Text style={styles.jobDescription}>
                            • {highlight}
                          </Text>
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
                  {typedResumeData.basics.location.city},{" "}
                  {typedResumeData.basics.location.country}
                </Text>
              </View>
              <View style={styles.contactItem}>
                <Icon
                  color={colors.background.white}
                  path={icons.email}
                  size={10}
                />
                <Text>{typedResumeData.basics.email}</Text>
              </View>
              <View style={styles.contactItem}>
                <Icon
                  color={colors.background.white}
                  path={icons.phone}
                  size={10}
                />
                <Text>{typedResumeData.basics.phone}</Text>
              </View>
              <View style={styles.contactItem}>
                <Icon
                  color={colors.background.white}
                  path={icons.github}
                  size={10}
                />
                <Text>{typedResumeData.basics.github}</Text>
              </View>
            </View>
            {/* Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {typedResumeData.skills.map((skill: Skill, index: number) => (
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
              <Text style={styles.sectionTitle}>Education</Text>
              {typedResumeData.education.map(
                (edu: Education, index: number) => (
                  <View key={index}>
                    <View style={styles.twoColumn}>
                      <Text style={styles.skillTitle}>{edu.name}</Text>
                      <Text style={styles.jobDuration}>
                        {`${edu.startDate} — ${edu.endDate}`}
                      </Text>
                    </View>
                    <Text style={styles.jobDescription}>{edu.studyType}</Text>
                    <Text style={styles.jobDescription}>{edu.score}</Text>
                    <View>
                      <Text style={styles.jobDescription}>
                        <Text>Thesis: </Text>
                        {edu.thesis}
                      </Text>
                    </View>
                  </View>
                )
              )}
            </View>

            {/* Interests */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <Text style={styles.jobDescription}>
                {typedResumeData.interests.join(", ")}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default ResumePDF;

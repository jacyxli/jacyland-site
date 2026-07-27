/* Temporary script: renders both resume PDFs headlessly and reports page counts. */
import { createElement as h } from "react";
import path from "node:path";
import fs from "node:fs";
import yaml from "js-yaml";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Svg,
  Path,
  renderToBuffer,
} from "@react-pdf/renderer";

const root = process.cwd();
const fontsDir = path.join(root, "public", "fonts");

Font.register({ family: "FZLanTing", src: path.join(fontsDir, "FZLanTing.ttf") });
Font.register({ family: "Inter", src: path.join(fontsDir, "Inter-Regular.ttf") });
Font.register({ family: "Inter", src: path.join(fontsDir, "Inter-Bold.ttf"), fontWeight: 700 });
Font.register({ family: "Inter", src: path.join(fontsDir, "Inter-SemiBold.ttf"), fontWeight: 600 });
Font.register({ family: "Inter", src: path.join(fontsDir, "Inter-Italic.ttf"), fontStyle: "italic" });
Font.register({ family: "NotoSansSC", src: path.join(fontsDir, "NotoSansSC-Regular.ttf") });
Font.register({ family: "NotoSansSC", src: path.join(fontsDir, "NotoSansSC-Bold.ttf"), fontWeight: 700 });
Font.register({ family: "NotoSansSC", src: path.join(fontsDir, "NotoSansSC-SemiBold.ttf"), fontWeight: 600 });

Font.registerHyphenationCallback((word) => {
  if (/[\u4E00-\u9FFF]/.test(word)) return word.split("");
  return [word];
});

const colors = {
  text: { primary: "#1c4ed8", black: "#141b28", secondary: "#2a3644", light: "#6c7682" },
  border: { light: "#1c4ed8" },
  background: { white: "#ffffff" },
};

const icons = {
  github: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  email: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  gearCode: "M474.84,320.8l-43.3-39.4c1.1-8.3,1.7-16.8,1.7-25.4s-.6-17.1-1.7-25.4l43.3-39.4c6.9-6.2,9.6-15.9,6.4-24.6l.1-.1c-4.4-11.9-9.7-23.3-15.8-34.3l-4.7-8.1c-6.6-11-14-21.4-22.1-31.2-5.9-7.1-15.7-9.6-24.5-6.8l-55.7,17.7c-13.4-10.3-28.2-18.9-44-25.4l-12.5-57.1c-2-9.1-9-16.3-18.2-17.8-13.8-2.3-28-3.5-42.5-3.5s-28.7,1.2-42.5,3.6c-9.2,1.5-16.2,8.7-18.2,17.8l-12.5,57.1c-15.8,6.5-30.6,15.1-44,25.4l-55.7-17.7c-8.8-2.8-18.6-.4-24.5,6.8-8.1,9.8-15.5,20.2-22.1,31.2l-4.7,8.1c-6.1,11-11.4,22.4-15.8,34.3-3.2,8.7-.5,18.4,6.4,24.6l43.3,39.4c-1.1,8.3-1.7,16.8-1.7,25.4s.6,17.1,1.7,25.5l-43.3,39.4c-6.9,6.2-9.6,15.9-6.4,24.6,4.4,11.9,9.7,23.3,15.8,34.3l4.7,8.1c6.6,11,14,21.4,22.1,31.2,5.9,7.1,15.7,9.6,24.5,6.8l55.6-17.8c13.4,10.3,28.2,18.9,44,25.4l12.5,57.1c2,9.1,9,16.3,18.2,17.8,13.8,2.3,28,3.5,42.5,3.5s28.7-1.2,42.5-3.5c9.2,1.5,16.2,8.7,18.2-17.8l12.5-57.1c15.8-6.5,30.6-15.1,44-25.4l55.7,17.7c8.8,2.8,18.6.4,24.5-6.8,8.1-9.8,15.5-20.2,22.1-31.2l4.7-8.1c6.1-11,11.4-22.4,15.8-34.3,3.2-8.7.5-18.4-6.4-24.6Z",
  website: "M12,0C5.375,0,0,5.375,0,12s5.375,12,12,12s12-5.375,12-12S18.625,0,12,0z",
};

const Icon = ({ path: p, size = 12, color = colors.text.black, viewBox = "0 0 24 24" }) =>
  h(Svg, { width: size, height: size, viewBox }, h(Path, { d: p, fill: color }));

// ---------- English document (mirrors ResumePDF.tsx) ----------
const enStyles = StyleSheet.create({
  page: { backgroundColor: colors.background.white, padding: "30px 26px 22px 20px", fontFamily: "Inter", boxSizing: "border-box" },
  leftCol: { width: "72%", flexDirection: "column", flex: 1 },
  rightCol: { width: "31%" },
  header: { marginBottom: 20 },
  name: { fontSize: 28, fontWeight: 700, marginBottom: 2, fontFamily: "FZLanTing", color: colors.text.primary, lineHeight: 1.3 },
  label: { fontSize: 9, color: colors.text.light, maxWidth: "60%", lineHeight: 1.3 },
  contact: { backgroundColor: colors.text.primary, color: colors.background.white, padding: "10px 10px", fontSize: 9, marginBottom: 15, lineHeight: 1.4 },
  body: { flexDirection: "row", justifyContent: "space-between", gap: 20, alignItems: "flex-start" },
  section: { paddingTop: 10, borderTop: `1px solid ${colors.border.light}`, marginBottom: 10, color: colors.text.black, fontSize: 10 },
  sectionTitle: { fontSize: 13, fontWeight: 700, marginBottom: 10, fontFamily: "FZLanTing", color: colors.text.primary, lineHeight: 1.3 },
  jobTitle: { fontSize: 11, lineHeight: 1.3 },
  jobLocation: { fontSize: 9, color: colors.text.light, fontStyle: "italic" },
  jobDescription: { fontSize: 9, color: colors.text.secondary },
  jobTechStack: { fontSize: 8, fontStyle: "italic", flexDirection: "row", alignItems: "center", gap: 2 },
  jobDuration: { fontSize: 8, color: colors.text.light, lineHeight: 1.3, paddingTop: 2 },
  bold: { fontWeight: 700 },
  semibold: { fontWeight: 600 },
  paragraph: { marginBottom: 4 },
  block: { marginBottom: 6 },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap" },
  skillTitle: { fontSize: 10, marginBottom: 2, fontWeight: 700 },
  bulletPoint: { marginLeft: 10 },
  twoColumn: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6, alignItems: "flex-start" },
  leftColumn: { flex: 1 },
  rightColumn: { alignItems: "flex-end" },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
});

function enDoc(data) {
  const s = enStyles;
  return h(
    Document,
    null,
    h(
      Page,
      { size: "A4", style: s.page },
      h(View, { style: s.header },
        h(Text, { style: s.name }, data.basics.name),
        h(Text, { style: s.label }, data.basics.label)
      ),
      h(View, { style: s.body },
        h(View, { style: s.leftCol },
          h(View, { style: s.section },
            h(Text, { style: s.sectionTitle }, "Work Experience"),
            ...data.work.map((job, i) =>
              h(View, { key: i, style: s.block },
                h(View, { style: [s.twoColumn] },
                  h(View, { style: s.leftColumn },
                    h(Text, { style: s.jobTitle },
                      h(Text, { style: s.semibold }, job.position),
                      job.name ? h(Text, { style: s.bold }, " · " + job.name) : null
                    ),
                    h(Text, { style: s.jobLocation }, job.location)
                  ),
                  h(View, { style: s.rightColumn },
                    h(Text, { style: s.jobDuration }, `${job.startDate} — ${job.endDate}`)
                  )
                ),
                h(Text, { style: [s.jobDescription, s.paragraph] }, job.summary),
                job.highlights
                  ? h(View, { style: s.paragraph },
                      ...job.highlights.map((hl, idx) =>
                        h(View, { key: idx, style: s.bulletPoint },
                          h(Text, { style: s.jobDescription }, `\u2022 ${hl}`)
                        )
                      )
                    )
                  : null,
                job.techStack
                  ? h(View, { style: [s.jobTechStack, s.paragraph] },
                      h(Icon, { path: icons.gearCode, size: 9, viewBox: "0 0 482.58 511.9" }),
                      h(Text, null, job.techStack)
                    )
                  : null
              )
            )
          )
        ),
        h(View, { style: s.rightCol },
          h(View, { style: s.contact },
            ...[
              [icons.location, `${data.basics.location.city}, ${data.basics.location.country}`],
              [icons.email, data.basics.email],
              [icons.phone, data.basics.phone],
              [icons.github, data.basics.github],
              [icons.website, data.basics.website],
            ].map(([p, t], i) =>
              h(View, { key: i, style: s.contactItem },
                h(Icon, { color: colors.background.white, path: p, size: 10 }),
                h(Text, null, t)
              )
            )
          ),
          h(View, { style: s.section },
            h(Text, { style: s.sectionTitle }, "Skills"),
            h(View, { style: s.skillsContainer },
              ...data.skills.map((skill, i) =>
                h(View, { key: i, style: [s.paragraph, s.jobDescription] },
                  h(Text, { style: s.skillTitle }, skill.name),
                  h(Text, { style: s.jobDescription }, skill.keywords.join(", "))
                )
              )
            )
          ),
          h(View, { style: s.section },
            h(Text, { style: s.sectionTitle }, "Education"),
            ...data.education.map((edu, i) =>
              h(View, { key: i },
                h(View, { style: s.twoColumn },
                  h(Text, { style: s.skillTitle }, edu.name),
                  h(Text, { style: s.jobDuration }, `${edu.startDate} — ${edu.endDate}`)
                ),
                h(Text, { style: s.jobDescription }, edu.studyType),
                h(Text, { style: s.jobDescription }, edu.score),
                h(View, null, h(Text, { style: s.jobDescription }, `Thesis: ${edu.thesis}`))
              )
            )
          ),
          h(View, { style: s.section },
            h(Text, { style: s.sectionTitle }, "Interests"),
            h(Text, { style: s.jobDescription }, data.interests.join(", "))
          )
        )
      )
    )
  );
}

// ---------- Chinese document (mirrors ResumePDFZH.tsx) ----------
const zhStyles = StyleSheet.create({
  page: { backgroundColor: colors.background.white, padding: "30px 26px 22px 20px", fontFamily: "NotoSansSC", boxSizing: "border-box" },
  leftCol: { width: "72%", flexDirection: "column", flex: 1 },
  rightCol: { width: "31%" },
  header: { marginBottom: 20 },
  name: { fontSize: 28, fontWeight: 700, marginBottom: 2, fontFamily: "FZLanTing", color: colors.text.primary, lineHeight: 1.3 },
  label: { fontSize: 9, color: colors.text.light, maxWidth: "70%", lineHeight: 1.4, flexWrap: "wrap" },
  contact: { backgroundColor: colors.text.primary, color: colors.background.white, padding: "10px 10px", fontSize: 9, marginBottom: 15, lineHeight: 1.4 },
  body: { flexDirection: "row", justifyContent: "space-between", gap: 20, alignItems: "flex-start" },
  section: { paddingTop: 10, borderTop: `1px solid ${colors.border.light}`, marginBottom: 10, color: colors.text.black, fontSize: 10 },
  sectionTitle: { fontSize: 13, fontWeight: 700, marginBottom: 10, fontFamily: "FZLanTing", color: colors.text.primary, lineHeight: 1.3 },
  jobTitle: { fontSize: 11, lineHeight: 1.3 },
  jobLocation: { fontSize: 9, color: colors.text.light, fontWeight: 100 },
  jobDescription: { fontSize: 9, color: colors.text.secondary, lineHeight: 1.4, flexWrap: "wrap", flexShrink: 1 },
  jobHighlights: { maxWidth: "100%", lineHeight: 1.4 },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 2 },
  bulletSymbol: { width: 10, fontSize: 9, lineHeight: 1.4, textAlign: "center", color: colors.text.secondary },
  bulletText: { flex: 1, fontSize: 9, lineHeight: 1.4, color: colors.text.secondary, width: "100%", flexWrap: "nowrap" },
  jobTechStack: { fontSize: 8, fontWeight: 100, flexDirection: "row", alignItems: "center", gap: 2 },
  jobDuration: { fontSize: 8, color: colors.text.light, lineHeight: 1.3, paddingTop: 2, fontWeight: 400 },
  bold: { fontWeight: 700 },
  semibold: { fontWeight: 600 },
  paragraph: { marginBottom: 4 },
  block: { marginBottom: 6 },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap" },
  skillTitle: { fontSize: 10, marginBottom: 2, fontWeight: 700 },
  educationTitle: { fontSize: 10, fontWeight: 700 },
  bulletPoint: { marginLeft: 10 },
  twoColumn: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6, alignItems: "flex-start" },
  leftColumn: { flex: 1 },
  rightColumn: { alignItems: "flex-end" },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
});

const MultilineText = ({ text, style }) =>
  h(View, { style, wrap: false }, ...(text ? text.split("br") : [""]).map((line, i) => h(Text, { key: i }, line)));

function zhDoc(data) {
  const s = zhStyles;
  return h(
    Document,
    null,
    h(
      Page,
      { size: "A4", style: s.page },
      h(View, { style: s.header },
        h(Text, { style: s.name }, data.basics.name),
        h(Text, { style: s.label }, data.basics.label),
        h(Text, { style: s.label }, data.basics.label2)
      ),
      h(View, { style: s.body },
        h(View, { style: s.leftCol },
          h(View, { style: s.section },
            h(Text, { style: s.sectionTitle }, "工作经历 ｜ Work Experience"),
            ...data.work.map((job, i) =>
              h(View, { key: i, style: s.block },
                h(View, { style: s.twoColumn },
                  h(View, { style: s.leftColumn },
                    h(Text, { style: s.jobTitle },
                      h(Text, { style: s.semibold }, job.position),
                      job.name ? h(Text, { style: s.bold }, " · " + job.name) : null
                    ),
                    h(Text, { style: s.jobLocation }, job.location)
                  ),
                  h(View, { style: s.rightColumn },
                    h(Text, { style: s.jobDuration }, `${job.startDate} — ${job.endDate}`)
                  )
                ),
                h(MultilineText, { text: job.summary, style: [s.jobDescription, s.paragraph] }),
                job.highlights
                  ? h(View, { style: [s.paragraph, s.jobHighlights] },
                      ...job.highlights.map((hl, idx) =>
                        h(View, { key: idx, style: s.bulletRow },
                          h(View, { style: s.bulletSymbol }, h(Text, null, "\u2022")),
                          h(MultilineText, { text: hl, style: s.bulletText })
                        )
                      )
                    )
                  : null,
                job.techStack
                  ? h(View, { style: [s.jobTechStack, s.paragraph] },
                      h(Icon, { path: icons.gearCode, size: 9, viewBox: "0 0 482.58 511.9" }),
                      h(Text, null, job.techStack)
                    )
                  : null
              )
            )
          )
        ),
        h(View, { style: s.rightCol },
          h(View, { style: s.contact },
            ...[
              [icons.location, `${data.basics.location.city}, ${data.basics.location.country}`],
              [icons.email, data.basics.email],
              [icons.phone, data.basics.phone],
              [icons.github, data.basics.github],
              [icons.website, data.basics.website],
            ].map(([p, t], i) =>
              h(View, { key: i, style: s.contactItem },
                h(Icon, { color: colors.background.white, path: p, size: 10 }),
                h(Text, null, t)
              )
            )
          ),
          h(View, { style: s.section },
            h(Text, { style: s.sectionTitle }, "技能 ｜ Skills"),
            h(View, { style: s.skillsContainer },
              ...data.skills.map((skill, i) =>
                h(View, { key: i, style: [s.paragraph, s.jobDescription] },
                  h(Text, { style: s.skillTitle }, skill.name),
                  h(Text, { style: s.jobDescription }, skill.keywords.join(", "))
                )
              )
            )
          ),
          h(View, { style: s.section },
            h(Text, { style: s.sectionTitle }, "教育 ｜ Education"),
            ...data.education.map((edu, i) =>
              h(View, { key: i },
                h(View, { style: s.paragraph },
                  h(Text, { style: s.educationTitle }, edu.name),
                  h(Text, { style: s.jobDuration }, `${edu.startDate} — ${edu.endDate}`)
                ),
                h(Text, { style: s.jobDescription }, edu.studyType),
                h(Text, { style: s.jobDescription }, edu.score),
                h(View, null, h(Text, { style: s.jobDescription }, `论文：${edu.thesis}`))
              )
            )
          ),
          h(View, { style: s.section },
            h(Text, { style: s.sectionTitle }, "兴趣爱好 ｜ Interests"),
            h(Text, { style: s.jobDescription }, data.interests.join(", "))
          )
        )
      )
    )
  );
}

function countPages(buffer) {
  const text = buffer.toString("latin1");
  const matches = text.match(/\/Type\s*\/Page[^s]/g);
  return matches ? matches.length : 0;
}

const outDir = path.join(root, ".resume-verify");
fs.mkdirSync(outDir, { recursive: true });

const enData = yaml.load(fs.readFileSync(path.join(root, "src/app/contents/resume-pdf.yml"), "utf8"));
const zhData = yaml.load(fs.readFileSync(path.join(root, "src/app/contents/resume-pdf-zh.yml"), "utf8"));

const enBuf = await renderToBuffer(enDoc(enData));
fs.writeFileSync(path.join(outDir, "resume-en.pdf"), enBuf);
console.log(`EN pages: ${countPages(enBuf)}`);

const zhBuf = await renderToBuffer(zhDoc(zhData));
fs.writeFileSync(path.join(outDir, "resume-zh.pdf"), zhBuf);
console.log(`ZH pages: ${countPages(zhBuf)}`);

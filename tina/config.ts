import { defineConfig } from "tinacms";
import { adminThemeCSS, adminFontLinkHref } from "./admin-theme";

// Your Tina Cloud project's Client ID and a Read Only token.
// Generate these at https://app.tina.io after connecting this repo.
// Locally, `tinacms dev` runs with local auth if these are left empty.
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  cmsCallback: (cms) => {
    if (typeof document !== "undefined" && !document.getElementById("portfolio-admin-theme")) {
      const fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = adminFontLinkHref;
      document.head.appendChild(fontLink);

      const style = document.createElement("style");
      style.id = "portfolio-admin-theme";
      style.textContent = adminThemeCSS;
      document.head.appendChild(style);
    }
    return cms;
  },

  build: {
    publicFolder: "public", // The public asset folder for Astro
    outputFolder: "admin", // within the public folder -> public/admin
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        label: "Home Page",
        name: "home",
        path: "content/home",
        format: "json",
        ui: {
          // Single-document collection: skip the list view, go straight to the doc.
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              { type: "string", name: "title", label: "Page title" },
              { type: "string", name: "description", label: "Meta description", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "nav",
            label: "Navigation",
            fields: [
              { type: "string", name: "logoInitials", label: "Logo initials" },
              { type: "string", name: "name", label: "Displayed name" },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow (location)" },
              { type: "string", name: "headlineLine1", label: "Headline — line 1" },
              { type: "string", name: "headlineLine2", label: "Headline — line 2" },
              { type: "string", name: "headlineLine3", label: "Headline — accent line" },
              { type: "string", name: "lede", label: "Lede paragraph", ui: { component: "textarea" } },
              { type: "string", name: "openNote", label: "Availability note" },
              { type: "string", name: "badgeWorkText", label: "Badge: open to work" },
              { type: "string", name: "badgeProjectsText", label: "Badge: view projects" },
              { type: "string", name: "ctaPrimaryText", label: "Primary button text" },
              { type: "string", name: "ctaSecondaryText", label: "Secondary button text" },
              { type: "image", name: "robotImage", label: "Hero background illustration" },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About",
            fields: [
              { type: "string", name: "paragraph", label: "About paragraph", ui: { component: "textarea" } },
              { type: "string", name: "topSkillsLabel", label: "Top skills label" },
              { type: "string", name: "topSkillsText", label: "Top skills list" },
              { type: "string", name: "pillRole", label: "Pill: role" },
              { type: "string", name: "pillLocation", label: "Pill: location" },
              { type: "string", name: "pillConnections", label: "Pill: connections" },
            ],
          },
          {
            type: "object",
            name: "experience",
            label: "Experience",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Experience item" }),
            },
            fields: [
              { type: "image", name: "logo", label: "Company logo" },
              { type: "string", name: "title", label: "Role title" },
              { type: "string", name: "org", label: "Organization / location / type" },
              { type: "string", name: "dates", label: "Dates" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "tags", label: "Tags", list: true },
            ],
          },
          {
            type: "object",
            name: "education",
            label: "Education",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Education item" }),
            },
            fields: [
              { type: "image", name: "logo", label: "Institution logo" },
              { type: "string", name: "title", label: "Degree / program" },
              { type: "string", name: "institution", label: "Institution" },
              { type: "string", name: "dates", label: "Dates" },
              { type: "string", name: "detail", label: "Detail line" },
            ],
          },
          {
            type: "string",
            name: "skills",
            label: "Skills",
            list: true,
          },
          {
            type: "object",
            name: "certifications",
            label: "Certifications",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "Certification" }),
            },
            fields: [
              { type: "image", name: "logo", label: "Issuer logo (optional)" },
              { type: "string", name: "name", label: "Certification name" },
              { type: "string", name: "meta", label: "Issuer · date" },
            ],
          },
          {
            type: "object",
            name: "projects",
            label: "Projects",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Project" }),
            },
            fields: [
              { type: "string", name: "period", label: "Period (optional)" },
              { type: "string", name: "title", label: "Project title" },
              { type: "image", name: "affilLogo", label: "Affiliation logo" },
              { type: "string", name: "affilText", label: "Affiliation text" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "tags", label: "Tags", list: true },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contact",
            fields: [
              { type: "string", name: "linkedinUrl", label: "LinkedIn URL" },
              { type: "string", name: "email", label: "Email address" },
              { type: "string", name: "footerName", label: "Footer name" },
              { type: "string", name: "footerNote", label: "Footer note" },
            ],
          },
        ],
      },
    ],
  },
});

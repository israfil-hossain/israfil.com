import { defineField } from "sanity";
import {UserIcon} from '@sanity/icons'

const profile = {
  name: "profile",
  title: "Profile",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "In one short sentence, what do you do?",
      validation: (Rule) => Rule.required().min(10).max(50),
    }),
    {
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      description: "Upload a profile picture",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      rows: 4,
    },
    {
      name: "email",
      title: "Email Address",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "fullBio",
      title: "Full Bio",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "resumeURL",
      title: "Upload Resume",
      type: "file",
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      description: "Add your social media links with icons:",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "href",
              title: "URL",
              type: "url",
              initialValue: "",
            },
            {
              name: "label",
              title: "Label",
              type: "string",
              initialValue: "",
            },
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Twitter", value: "IconBrandTwitter" },
                  { title: "LinkedIn", value: "IconBrandLinkedin" },
                  { title: "YouTube", value: "IconBrandYoutube" },
                  { title: "GitHub", value: "IconBrandGithub" },
                  { title: "Instagram", value: "IconBrandInstagram" },
                  { title: "Facebook", value: "IconBrandFacebook" },
                  { title: "Medium" , value: "IconBrandMedium"}
                 
                ],
              },
            },
          ],
        },
      ],
      options: {
        collapsed: false,
        collapsible: true,
        columns: 2,
      },
    },    
    {
      name: "skills",
      title: "Skills",
      type: "array",
      description: "Add a list of skills",
      of: [{ type: "string" }],
    },
  ],
};

export default profile;
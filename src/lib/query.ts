import { groq } from "next-sanity";
import { client } from "./sanity";


export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"]{
      _id,
      fullName,
      headline,
      profileImage {
        alt, 
        "image": asset->url
      },
      shortBio,
      location,
      fullBio,
      email,
      "resumeURL": resumeURL.asset->url,
      socialLinks,
      skills
    }`
  );
}

export async function getJob() {
  return client.fetch(
    groq`*[_type == "job"]{
      _id,
      name,
      jobTitle,
      "logo": logo.asset->url,
      url,
      description,
      startDate,
      endDate,
    }`
  );
}

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"]{
      _id, 
      title, 
      description,
      href, 
      thumbnail{
        asset->{
        id,
        url
      }
      },
      images[]{
        asset->{
          _id,
          url
        }
      },
      stack,
      slug,
      content
    }`
  );  
}

export async function getSingleProject(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id, 
      title, 
      description,
      href, 
      thumbnail{
        asset->{
          id,
          url
        }
      },
      images[]{
        asset->{
          _id,
          url
        }
      },
      stack,
      slug,
      content
    }`,
    { slug }
  );
}

export async function getPosts() {
  return client.fetch(
    groq`*[_type == "post"]{
      _id,
      title,
      slug,
      "author": author->name,
      mainImage {
        asset->{
          url
        },
        alt
      },
      categories[]->{
        title
      },
      publishedAt,
      body
    }`
  );
}

export async function getSinglePost(slug: string) {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      "author": author->name,
      mainImage {
        asset->{
          url
        },
        alt
      },
      categories[]->{
        title
      },
      publishedAt,
      body
    }`,
    { slug }
  );
}

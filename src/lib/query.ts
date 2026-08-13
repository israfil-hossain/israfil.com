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
      phone,
      fullBio,
      email,
      "resumeURL": resumeURL.asset->url,
      socialLinks
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
    groq`*[_type in ["project", "flowentechProject", "clientProject"]]{
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
      content, 
      isRunning, 
      showFlowentech, 
      showPortfolio,
      needInvestment,
      isFeatured

    }`
  );  
}

export async function getFeaturedProjects() {
  return client.fetch(
    groq`*[_type in ["project", "flowentechProject", "clientProject"] && isFeatured == true]{
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
      content, 
      isRunning, 
      showFlowentech, 
      showPortfolio,
      needInvestment,
      isFeatured

    }`
  );  
}

export async function getSingleProject(slug: string) {
  return client.fetch(
    groq`*[_type in ["project", "flowentechProject", "clientProject"] && slug.current == $slug][0]{
      _id, 
      title, 
      description,
      href, 
      thumbnail{
        asset->{
          _id,
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
      content,
      isRunning,
      showPortfolio,
      needInvestment,
      isFeatured,
      "testimonials": *[_type == "testimonial" && references(^._id) && status == "approved"] | order(createdAt desc) {
        _id,
        authorName,
        authorEmail,
        authorAvatar,
        rating,
        content,
        createdAt
      },
      "averageRating": round(*[_type == "testimonial" && references(^._id) && status == "approved"].rating)
    }`,
    { slug }
  );
}

export async function getProjectTestimonials(projectId: string) {
  return client.fetch(
    groq`*[_type == "testimonial" && project._ref == $projectId && status == "approved"] | order(createdAt desc) {
      _id,
      authorName,
      authorEmail,
      authorAvatar,
      rating,
      content,
      createdAt
    }`,
    { projectId }
  );
}

// Admin queries - fetch all including unpublished
export async function getAllCoursesForAdmin() {
  return client.fetch(
    groq`*[_type == "course"] | order(order asc) {
      _id,
      title,
      slug,
      category,
      isPublished,
      order,
      publishedAt,
      "topicCount": count(*[_type == "courseTopic" && course._ref == ^._id])
    }`
  );
}

export async function getSingleCourseForAdmin(courseId: string) {
  return client.fetch(
    groq`*[_type == "course" && _id == $courseId][0]{
      _id,
      title,
      slug,
      description,
      category,
      isPublished,
      order,
      publishedAt
    }`,
    { courseId }
  );
}

export async function getTopicsByCourse(courseId: string) {
  return client.fetch(
    groq`*[_type == "courseTopic" && course._ref == $courseId] | order(order asc) {
      _id,
      title,
      slug,
      order,
      isPublished,
      "questionCount": count(*[_type == "questionAnswer" && topic._ref == ^._id])
    }`,
    { courseId }
  );
}

export async function getQuestionsByTopic(topicId: string) {
  return client.fetch(
    groq`*[_type == "questionAnswer" && topic._ref == $topicId] | order(order asc) {
      _id,
      question,
      answer,
      order,
      isPublished
    }`,
    { topicId }
  );
}


export async function getTemplates() {
  return client.fetch(
    groq`*[_type == "template"] | order(publishedAt desc) {
      _id,
      name,
      slug,
      description,
      price,
      currency,
      thumbnail {
        asset->{
          url
        },
        alt
      },
      previewImages[] {
        asset->{
          url
        },
        alt
      },
      previewUrl,
      demoUrl,
      isFeatured,
      category,
      technologies,
      features,
      publishedAt,
      impressionCount
    }`
  );
}

export async function getSingleTemplate(slug: string) {
  return client.fetch(
    groq`*[_type == "template" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      description,
      price,
      currency,
      thumbnail {
        asset->{
          url
        },
        alt
      },
      previewImages[] {
        asset->{
          url
        },
        alt
      },
      previewUrl,
      demoUrl,
      isFeatured,
      category,
      technologies,
      features,
      demoCredentials,
      licenseType,
      includes,
      downloadUrl,
      templateFile {
        asset->{
          url
        }
      },
      publishedAt,
      impressionCount
    }`,
    { slug }
  );
}

export async function getSkillCategories() {
  return client.fetch(
    groq`*[_type == "skillCategory"] | order(order asc) {
      _id,
      title,
      order
    }`
  );
}

export async function getSkills() {
  return client.fetch(
    groq`*[_type == "skill"] | order(order asc) {
      _id,
      name,
      order,
      "icon": icon.asset->url,
      category->{ _id, title, order }
    }`
  );
}

export async function getPosts() {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
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

export async function getCourses() {
  return client.fetch(
    groq`*[_type == "course" && isPublished == true] | order(order asc) {
      _id,
      title,
      slug,
      description,
      thumbnail {
        asset->{
          url
        }
      },
      category,
      publishedAt,
      order,
      "topicCount": count(*[_type == "courseTopic" && course._ref == ^._id && isPublished == true])
    }`
  );
}

export async function getSingleCourse(slug: string) {
  return client.fetch(
    groq`*[_type == "course" && slug.current == $slug && isPublished == true][0]{
      _id,
      title,
      slug,
      description,
      thumbnail {
        asset->{
          url
        }
      },
      category,
      publishedAt,
      "topics": *[_type == "courseTopic" && course._ref == ^._id && isPublished == true] | order(order asc) {
        _id,
        title,
        slug,
        order,
        "questions": *[_type == "questionAnswer" && topic._ref == ^._id && isPublished == true] | order(order asc) {
          _id,
          question,
          answer,
          order
        }
      }
    }`,
    { slug }
  );
}

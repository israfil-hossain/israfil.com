
export type Product = {
  title: string;
  description: string;
  thumbnail: any;
  images: any;
  href: string;
  slug?: any;
  stack?: string[];
  content?: React.ReactNode | string;
};
// types/project.ts
export interface Project {
  _id: string;
  title: string;
  description: string;
  href: string;
  thumbnail: {
    asset: {
      id: string;
      url: string;
    };
  };
  images: {
    asset: {
      _id: string;
      url: string;
    };
  }[];
  stack: string[];
  slug: string;
  content: string;
}

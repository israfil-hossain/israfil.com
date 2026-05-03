export interface QuestionAnswer {
  _id: string
  question: string
  answer: any
  topic: {
    _ref: string
  }
  order: number
  isPublished: boolean
}

export interface CourseTopic {
  _id: string
  title: string
  slug: {
    current: string
  }
  course: {
    _ref: string
  }
  order: number
  isPublished: boolean
  questions?: QuestionAnswer[]
}

export interface Course {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: any
  thumbnail: {
    asset: {
      _ref: string
      url: string
    }
  }
  category: string
  isPublished: boolean
  publishedAt: string
  order: number
  topics?: CourseTopic[]
}

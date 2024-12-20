type JobPost = {
    id: string
    companyName: string
    role: string
    date: Date
    applicants: number
   // status: "pending" | "processing" | "success" | "failed"
  }
  
  export const jobPosts: JobPost[] = [
    {
      id: "728ed52f",
      companyName: "Google",
      role: "Software Engineer",
      date: new Date("2024-12-25"),
      applicants: 100
    },
    {
      id: "2428ed52f",
      companyName: "Amazon",
      role: "Frontend Developer",
      date: new Date("2024-12-25"),
      applicants: 50
    }
  ]
  
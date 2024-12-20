type JobPost = {
    id: string
    companyName: string
    role: string
    date: Date
    status: "Pending" | "Processing" | "Called for an Interview" | "Accepted" | "Rejected"
  }
  
  export const jobPosts: JobPost[] = [
    {
      id: "728ed52f",
      companyName: "Google",
      role: "Software Engineer",
      date: new Date("2024-12-25"),
      status: "Pending"
    },
    {
      id: "2428ed52f",
      companyName: "Amazon",
      role: "Frontend Developer",
      date: new Date("2024-12-25"),
      status: "Accepted"
    }
  ]
  
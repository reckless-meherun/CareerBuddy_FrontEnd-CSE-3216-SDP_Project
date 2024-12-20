type Applicant = {
    id: string
    name: string
    role: string
    date: Date
    status: "Pending" | "Processing" | "Called for an Interview" | "Accepted" | "Rejected"
  }
  
  export const applicants: Applicant[] = [
    {
      id: "728ed52f",
      name: "Meherun Farzana",
      role: "Software Engineer",
      date: new Date("2024-12-25"),
      status: "Rejected"
    },
    {
      id: "2428ed52f",
      name: "Aniket Joarder",
      role: "Frontend Developer",
      date: new Date("2024-12-25"),
      status: "Rejected"
    }
  ]
  
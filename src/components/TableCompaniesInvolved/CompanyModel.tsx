type Company = {
    id: string
    companyName: string
    role: string
    date: Date
    status: "Active" | "Inactive" 
  }
  
  export const companies: Company[] = [
    {
      id: "728ed52f",
      companyName: "Google",
      role: "Software Engineer",
      date: new Date("2024-12-25"),
      status: "Active"
    },
    {
      id: "2428ed52f",
      companyName: "Amazon",
      role: "Frontend Developer",
      date: new Date("2024-12-25"),
      status: "Inactive"
    }
  ]
  
// Customize your profile and add descriptions and technologies for each project.
// Set isPrivate for organizational projects; otherwise set demoUrl and sourceUrl to show links.
window.portfolio = {
  name: "Pamela Rose",
  username: "Pammyrose",
  email: "emalasan37@gmail.com",
  initials: "PR",
  bio: "Building practical web applications that connect people, information, and everyday workflows.",
  location: "Somewhere on the internet",
  toolkit: ["PHP", "Laravel", "Vue", "TypeScript", "JavaScript", "Tailwind CSS"],
  projects: [
    {
      name: "ETAMS", subtitle: "A clearer view of every asset.",
      workflow: [
        { title: "Open the inventory workspace", description: "An authorized user signs in to access inventory records and administrative tools." },
        { title: "Maintain asset and employee records", description: "Create or update asset details and maintain the employee and office information used by the inventory team." },
        { title: "Identify and review assets", description: "Open an asset record, print its inventory tag, and access reports for inventory review." },
        { title: "Manage the record lifecycle", description: "Archive records when needed and restore them through the administrative workflow." }
      ],
      screenshot: "./assets/etams.png", screenshotAlt: "ETAMS inventory dashboard with asset totals, location and purchase charts, and assignment records.",
      description: "A DENR inventory application that brings asset records, printable tags, employee information, and reporting into one workspace.",
      purpose: "Support inventory administration with dedicated workflows for maintaining records, printing asset tags, and accessing reports.",
      highlights: ["Inventory records and asset tags", "Archiving and restoration", "Employee records and reporting"],
      features: [
        "Inventory records: create, view, and update asset information.",
        "Asset tags: print inventory tags and open individual asset tag pages.",
        "Archiving: archive inventory records and restore them when needed.",
        "Employee records: maintain employee details, positions, and office assignments.",
        "Excel import: import employee information from spreadsheets.",
        "User administration: create, update, archive, and restore user accounts.",
        "Reporting: access the administrative reporting module.",
        "Access control: authenticated workflows with administrative access restrictions."
      ],
      language: "Vue", category: "Inventory management", artwork: "inventory", tags: ["Laravel", "Vue 3", "TypeScript", "Tailwind CSS"], featured: true, example: false, demoUrl: "", isPrivate: true, sourceUrl: ""
    },
    {
      name: "CARPIS", subtitle: "People and positions, connected.",
      workflow: [
        { title: "Access office records", description: "Users sign in and work with personnel information according to their role and assigned office." },
        { title: "Build employee profiles", description: "Maintain personal and employment details or import employee information from Excel workbooks." },
        { title: "Track staffing and appointments", description: "Review plantilla positions, vacancies, office assignments, and employee position history." },
        { title: "Find and report information", description: "Filter personnel records, review staffing dashboards, and export the relevant records to Excel." }
      ],
      screenshot: "./assets/carpis.png", screenshotAlt: "CARPIS staffing dashboard with employee and position totals, division distribution, and gender charts.",
      description: "The CAR Personnel Information System organizes employee records, office assignments, and plantilla positions for DENR-CAR.",
      purpose: "Centralize personnel information across regional, provincial, and community offices while providing access according to each administrator's office scope.",
      highlights: ["Employee profiles and office assignments", "Plantilla positions and staffing dashboards", "Excel import and export"],
      features: [
        "Personnel profiles: manage personal details, employment information, education, eligibility, and appointments.",
        "Search and filters: find employees by name, assignment, organizational unit, status, and position.",
        "Plantilla positions: track item codes, salary grades, vacancies, and assigned employees.",
        "Position history: record changes in employee position assignments.",
        "Staffing dashboards: review filled and vacant positions and personnel charts.",
        "Excel workflows: import employee workbooks with batch progress and download filtered records.",
        "Archiving: archive and restore employee and user records.",
        "Office-scoped access: support User, Admin, and Super Admin roles across regional, provincial, and community offices.",
        "Account settings: manage profiles, passwords, and appearance preferences."
      ],
      language: "Vue", category: "Personnel management", artwork: "personnel", tags: ["Laravel", "Vue 3", "TypeScript", "Tailwind CSS"], featured: true, example: false, demoUrl: "", isPrivate: true, sourceUrl: ""
    },
    {
      name: "PMS", subtitle: "From plans to a fuller picture.",
      workflow: [
        { title: "Sign in and select the reporting context", description: "Complete password and emailed-code verification, then work within the assigned office and reporting period." },
        { title: "Maintain targets and accomplishments", description: "Record physical and financial targets and their accomplishments across monthly, quarterly, and annual views." },
        { title: "Review progress and corrections", description: "Compare results in dashboards. Changes to accomplishments in locked periods go through a correction request and approval workflow." },
        { title: "Prepare reports and follow decisions", description: "Export Work and Financial Plan reports, review edit history, and receive correction approval decisions through notifications." }
      ],
      screenshot: "./assets/pms.png", screenshotAlt: "PMS performance dashboard showing overall progress, indicators, financial utilization, targets, and accomplishments.",
      description: "The DENR-CAR Performance Management System connects physical and financial targets with accomplishments and WFP reporting.",
      purpose: "Give authorized teams a shared workspace for reviewing plans, recording accomplishments, and monitoring performance across reporting periods and offices.",
      highlights: ["Physical and financial performance tracking", "Correction reviews and approvals", "WFP reports and edit history"],
      features: [
        "Physical performance: record targets and accomplishments in monthly, quarterly, and annual views.",
        "Financial performance: maintain financial targets and accomplishment records.",
        "Dashboards: compare targets with accomplishments and review delay trends.",
        "WFP spreadsheets: preview Excel imports and export Work and Financial Plan reports.",
        "Correction approvals: review requests to change accomplishments in locked reporting periods.",
        "Notifications: receive approval decisions for submitted requests.",
        "Edit history: retain audit records for tracked changes.",
        "Office-scoped access: manage users and permissions according to roles and assigned offices.",
        "Sign-in verification: authenticate with a password followed by an emailed one-time code."
      ],
      language: "Blade", category: "Performance management", artwork: "performance", tags: ["Laravel", "PHP", "Bootstrap", "JavaScript"], featured: true, example: false, demoUrl: "", isPrivate: true, sourceUrl: ""
    },
    {
      name: "Queuing System", subtitle: "Keep the line moving.",
      workflow: [
        { title: "Add released orders", description: "Staff work with the Released Take Out list and use manual entry when an order needs to be added through the interface." },
        { title: "Show orders to customers", description: "The customer display presents now-serving order numbers and refreshes periodically alongside a live clock and video content." },
        { title: "Handle an order claim", description: "Staff select a released order and use Claim to move it into the claim workflow." },
        { title: "Maintain the queue", description: "Remove selected released entries with Delete and clear the claimed-order list when needed." }
      ],
      screenshot: "./assets/queuing.png", screenshotAlt: "Queuing System interface with Released Take Out and Claim Order panels and claim, delete, manual-entry, and clear controls.",
      description: "A restaurant order queue application with released takeout orders, claim handling, and a customer-facing now-serving display.",
      purpose: "Help staff organize released orders and claims while giving customers a visible order-number display.",
      highlights: ["Released orders and claim handling", "Manual queue entry and clearing", "Customer display with clock and video"],
      features: [
        "Order queues: display released takeout orders and claimed orders in separate lists.",
        "Claim handling: select released orders and move them into the claim workflow.",
        "Manual entry: add queue entries through the manual-entry interface.",
        "Queue maintenance: remove selected released entries and clear the claimed-order list.",
        "Customer display: present now-serving order numbers with periodic page refreshes.",
        "Display content: show a live clock alongside looping video content."
      ],
      language: "PHP", category: "Order queue management", artwork: "queue", tags: ["PHP", "JavaScript", "Tailwind CSS", "Microsoft Access"], featured: false, example: false, demoUrl: "", isPrivate: true, sourceUrl: ""
    },
    {
      name: "Time Monitoring", subtitle: "Every check-in, in view.",
      workflow: [
        { title: "View daily attendance", description: "Open the daily monitoring screen to see employee attendance records with dates, times, and in/out statuses." },
        { title: "Review HR details", description: "Use the HR view to review employee IDs and device numbers alongside attendance entries." },
        { title: "Narrow the records", description: "Search by employee name and choose a start and end date to focus on the attendance records needed." },
        { title: "Return to the daily overview", description: "Clear filters to broaden the review; the daily display refreshes automatically to keep the overview current." }
      ],
      screenshot: "./assets/Time monitoring.png", screenshotAlt: "Daily Time Monitoring table showing employee IDs, names, dates, attendance times, statuses, and device numbers.",
      description: "A daily time-monitoring application that displays employee attendance records and provides HR views with name and date-range filters.",
      purpose: "Make timechecker records easier to review through a daily display and dedicated HR search screens.",
      highlights: ["Daily attendance display", "Employee and date-range filtering", "HR records with device information"],
      features: [
        "Daily monitoring: display employee names, dates, attendance times, and statuses.",
        "HR overview: review employee IDs and device numbers alongside attendance records.",
        "Employee search: filter attendance records by employee name.",
        "Date filtering: narrow records to a selected start and end date, with a clear-filters action.",
        "Live display: refresh the daily monitoring screen automatically and show a live clock.",
        "Database variants: maintain separate MariaDB and SQL Server implementations."
      ],
      language: "PHP", category: "Attendance monitoring", artwork: "attendance", tags: ["PHP", "JavaScript", "MariaDB", "SQL Server"], featured: false, example: false, demoUrl: "", isPrivate: true, sourceUrl: ""
    },
    {
      name: "IT Inventory", subtitle: "IT equipment, at a glance.",
      workflow: [
        { title: "Review the equipment overview", description: "Start at the dashboard to see the displayed equipment totals by category." },
        { title: "Locate the relevant category", description: "Identify the equipment group: printers, computers, laptops, robots, mobile devices, POS equipment, peripherals, or tools." },
        { title: "Open the relevant workspace", description: "Use the navigation to reach the Asset, Archive, or User section for the area being reviewed." }
      ],
      screenshot: "./assets/it_inventory.png", screenshotAlt: "GT_IT Inventory dashboard with category totals for printers, computers, laptops, robots, mobile devices, POS equipment, peripherals, and tools.",
      description: "An IT inventory application for Restaurant with a dashboard that organizes equipment totals by category.",
      purpose: "Give the IT team a central overview of equipment across the restaurant's inventory categories.",
      highlights: ["Equipment totals by category", "Eight IT inventory categories", "Asset, archive, and user sections"],
      features: [
        "Dashboard: view equipment totals in category cards.",
        "Equipment categories: printers, computers, laptops, robots, mobile devices, POS equipment, peripherals, and tools.",
        "Navigation: access dedicated asset, archive, and user sections."
      ],
      language: "PHP", category: "IT inventory management", artwork: "inventory", tags: ["PHP", "Bootstrap", "Tailwind CSS", "JavaScript"], featured: false, example: false, demoUrl: "", isPrivate: true, sourceUrl: ""
    }
  ]
};

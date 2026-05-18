// lib/noc-data.ts
// Official IRCC NOC 2021 duty data. Each entry mirrors the "main duties"
// of the canonical Government of Canada page for that code (see sourceUrl).
// All 12 entries verified against noc.esdc.gc.ca / statcan.gc.ca source text.
// Last verified: 2026-05-18.

export interface NocEntry {
  code: string;
  title: string;
  teer: 0 | 1 | 2 | 3 | 4 | 5;
  description: string;
  mainDuties: string[];
  sourceUrl: string;
  expressEntryEligible: boolean;
}

export const NOC_CATALOG: Record<string, NocEntry> = {
  "41220": {
    code: "41220",
    title: "Secondary school teachers",
    teer: 1,
    description: "Secondary school teachers prepare and teach academic, technical, vocational or specialized subjects at public and private secondary schools.",
    mainDuties: [
      "Teach students using a systematic plan of lectures, discussions, audio-visual presentations, and laboratory, shop and field studies",
      "Prepare subject material for presentation to students according to an approved curriculum",
      "Assign and correct homework",
      "Prepare, administer and correct tests",
      "Evaluate progress, determine individual needs of students and discuss results with parents and school officials",
      "Prepare and implement remedial programs for students requiring extra help",
      "Participate in staff meetings, educational conferences and teacher training workshops",
      "May advise students on course selection and on vocational and personal matters",
      "May supervise student teachers",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=41220&version=2021.0",
    expressEntryEligible: true,
  },

  "41221": {
    code: "41221",
    title: "Elementary school and kindergarten teachers",
    teer: 1,
    description: "Elementary school and kindergarten teachers teach basic subjects such as reading, writing and arithmetic or specialized subjects at public and private elementary schools.",
    mainDuties: [
      "Prepare courses for presentation to students according to an approved curriculum",
      "Teach students using a systematic plan of lessons, discussions, audio-visual presentations and field trips",
      "Lead students in activities to promote their physical, mental and social development and their school readiness",
      "Assign and correct homework",
      "Prepare, administer and correct tests",
      "Evaluate the progress of students and discuss results with parents and school officials",
      "Identify children's individual learning needs and may refer students for specialized services",
      "Participate in staff meetings, educational conferences and teacher training workshops",
      "May supervise teachers' aides and student teachers",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=41221&version=2021.0",
    expressEntryEligible: true,
  },

  "31301": {
    code: "31301",
    title: "Registered nurses and registered psychiatric nurses",
    teer: 1,
    description: "Registered nurses and registered psychiatric nurses provide direct nursing care to patients, deliver health education programs and provide consultative services regarding the practice of nursing.",
    mainDuties: [
      "Assess patients to identify appropriate nursing interventions",
      "Collaborate with members of an interdisciplinary health team to plan, implement, coordinate and evaluate patient care in consultation with patients and their families",
      "Administer medications and treatments as prescribed by a physician or according to established policies and protocols",
      "Monitor, assess, address, document and report symptoms and changes in patients' conditions",
      "Operate or monitor medical apparatus or equipment",
      "Assist in surgery and other medical procedures",
      "May supervise licensed practical nurses and other nursing staff",
      "May develop and implement discharge planning processes on admission of patients",
      "May teach and counsel patients and their families on health-related issues",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=31301&version=2021.0",
    expressEntryEligible: true,
  },

  "31102": {
    code: "31102",
    title: "General practitioners and family physicians",
    teer: 1,
    description: "General practitioners and family physicians diagnose and treat the diseases, physiological disorders and injuries of patients, providing primary contact and continuous care.",
    mainDuties: [
      "Examine patients and take their histories, order laboratory tests, X-rays and other diagnostic procedures and consult with other medical practitioners to evaluate patients' physical and mental health",
      "Prescribe and administer medications and treatments",
      "Inoculate and vaccinate patients to prevent and treat diseases",
      "Advise patients and their families on health care including health promotion, disease, illness and accident prevention",
      "Provide counselling and support to patients and their families on a wide range of health and lifestyle issues",
      "Provide acute care to hospital inpatients",
      "Report births, deaths, and contagious and other diseases to government authorities",
      "May deliver babies and provide obstetrical care",
      "May perform minor surgery",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=31102&version=2021.0",
    expressEntryEligible: true,
  },

  "32101": {
    code: "32101",
    title: "Licensed practical nurses",
    teer: 2,
    description: "Licensed practical nurses provide nursing care usually under the direction of medical practitioners, registered nurses or other health team members.",
    mainDuties: [
      "Provide nursing services, within defined scope of practice, to patients based on patient assessment and care planning procedures",
      "Perform nursing interventions such as taking vital signs, applying aseptic techniques including sterile dressing, ensuring infection control, monitoring nutritional intake and conducting specimen collection",
      "Administer medication and observe and document therapeutic effects",
      "Provide pre-operative and post-operative personal and comfort care",
      "Monitor established respiratory therapy and intravenous therapy",
      "Monitor patients' progress, evaluate and document effectiveness of nursing interventions and collaborate with appropriate members of the health care team",
      "Provide safety and health education to individuals and their families",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=32101&version=2021.0",
    expressEntryEligible: true,
  },

  "21231": {
    code: "21231",
    title: "Software engineers and designers",
    teer: 1,
    description: "Software engineers and designers research, design, evaluate, integrate and maintain software applications, technical environments, operating systems, embedded software, information warehouses and telecommunications software.",
    mainDuties: [
      "Collect and document users' requirements and develop logical and physical specifications",
      "Research, evaluate and synthesize technical information to design, develop and test computer-based systems including mobile applications",
      "Develop data, process and network models to optimize architecture and to evaluate the performance and reliability of designs",
      "Plan, design and coordinate the development, installation, integration and operation of computer-based systems including mobile applications",
      "Assess, test, troubleshoot, document, upgrade and develop maintenance procedures for operating systems, communications environments and applications software",
      "May lead and coordinate teams of information systems professionals in the development of software and integrated information systems, process control software and other embedded software control systems",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=21231&version=2021.0",
    expressEntryEligible: true,
  },

  "21232": {
    code: "21232",
    title: "Software developers and programmers",
    teer: 1,
    description: "Software developers and programmers design, write, and test code for new systems and software to ensure efficiency. They create the foundations for operative systems and run diagnostic programs to certify effectiveness.",
    mainDuties: [
      "Design, write, read, test, and correct code for new software",
      "Analyze information to recommend and plan the installation of new systems or modifications of an existing system",
      "Evaluate simple interrelationships between programs such as whether a contemplated change in one part of a program would cause unwanted results in a related part",
      "Program animation software to predefined specifications for interactive video games, Internet and mobile applications",
      "Write, modify, integrate and test software code for e-commerce, Internet and mobile applications",
      "Develop, implement, modify and maintain gameplay features that integrate effectively into existing software",
      "Write documentation for new and updated software",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=21232&version=2021.0",
    expressEntryEligible: true,
  },

  "21234": {
    code: "21234",
    title: "Web developers and programmers",
    teer: 2,
    description: "Web developers and programmers use a variety of programming languages to design, create and modify websites. They analyze users' needs to implement content, graphics, performance, and website capacity.",
    mainDuties: [
      "Develop, write, modify, integrate and test website-related code and web application interfaces",
      "Conduct tests and analyze data to monitor quality, security, user interface experiences and to identify areas for improvement",
      "Develop and implement procedures for ongoing website revision",
      "Research and evaluate a variety of interactive media software products",
      "Source, select and organize information for inclusion and design the appearance, layout and flow of websites",
      "Create and optimize content for websites using a variety of graphics, database, animation and other software",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=21234&version=2021.0",
    expressEntryEligible: true,
  },

  "21300": {
    code: "21300",
    title: "Civil engineers",
    teer: 1,
    description: "Civil engineers plan, design, develop and manage projects for the construction or repair of buildings, roads, bridges, dams, tunnels, ports and systems related to transportation, water distribution and sanitation.",
    mainDuties: [
      "Confer with clients and other members of the engineering team and conduct research to determine project requirements",
      "Plan and design major civil projects such as buildings, roads, bridges, dams, water and waste management systems and structural steel fabrications",
      "Develop construction specifications and procedures",
      "Evaluate and recommend appropriate building and construction materials",
      "Interpret, review and approve survey and civil design work",
      "Conduct field services for civil works",
      "Ensure construction plans meet guidelines and specifications of building codes and other regulations",
      "Establish and monitor construction work schedules",
      "Conduct feasibility studies, economic analyses, traffic studies, environmental impact studies and other investigations",
      "Prepare contract documents and review and evaluate tenders for construction projects",
      "Supervise technicians, technologists and other engineers and review and approve designs, calculations and cost estimates",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=21300&version=2021.0",
    expressEntryEligible: true,
  },

  "21310": {
    code: "21310",
    title: "Electrical and electronics engineers",
    teer: 1,
    description: "Electrical and electronics engineers design, plan, research, evaluate and test electrical and electronic equipment and systems.",
    mainDuties: [
      "Conduct research into the feasibility, design, operation and performance of electrical generation and distribution networks, electrical machinery and components and electronic communications, instrumentation and control systems, equipment and components",
      "Prepare material cost and timing estimates, reports and design specifications for electrical and electronic systems and equipment",
      "Design electrical and electronic circuits, components, systems and equipment",
      "Conduct micro or nanodevices simulations, characterization, process modeling and integration in the development of new electronic devices and products",
      "Supervise and inspect the installation, modification, testing and operation of electrical and electronic systems and equipment",
      "Develop maintenance and operating standards for electrical and electronic systems and equipment",
      "Investigate electrical or electronic failures",
      "Prepare contract documents and evaluate tenders for construction or maintenance",
      "Supervise technicians, technologists, programmers, analysts and other engineers",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=21310&version=2021.0",
    expressEntryEligible: true,
  },

  "11100": {
    code: "11100",
    title: "Financial auditors and accountants",
    teer: 1,
    description: "Financial auditors examine and analyze the accounting and financial records of individuals and establishments. Accountants plan, organize and administer accounting systems for individuals and establishments.",
    mainDuties: [
      "Examine and analyze journal and ledger entries, bank statements, inventories, expenditures, tax returns and other accounting and financial records to ensure financial recording accuracy and compliance with established accounting standards, procedures and internal controls",
      "Prepare detailed reports on audit findings and make recommendations to improve accounting and management practices",
      "Conduct field audits of businesses to ensure compliance with provisions of the Income Tax Act, Canada Business Corporations Act or other statutory requirements",
      "Plan, set up and administer accounting systems and prepare financial information for individuals, departments, businesses and other establishments",
      "Examine accounting records and prepare financial statements and reports",
      "Develop and maintain cost-finding, reporting and internal control procedures",
      "Examine financial accounts and records and prepare income tax returns from accounting records",
      "Analyze financial statements and reports and provide financial, business and tax advice",
      "May supervise other auditors or professionals in charge of accounting",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=11100&version=2021.0",
    expressEntryEligible: true,
  },

  "12101": {
    code: "12101",
    title: "Human resources and recruitment officers",
    teer: 2,
    description: "Human resources and recruitment officers identify and advertise job vacancies, recruit candidates, and assist in the selection and reassignment of employees.",
    mainDuties: [
      "Identify current and prospective staffing requirements, prepare and post notices and advertisements, and collect and screen applications",
      "Advise job applicants on employment requirements and on terms and conditions of employment",
      "Review candidate inventories and contact potential applicants to arrange interviews and transfers, redeployment and placement of personnel",
      "Recruit graduates of colleges, universities and other educational institutions",
      "Coordinate and participate in selection and examination boards to evaluate candidates",
      "Notify applicants of results of selection process and prepare job offers",
      "Advise managers and employees on staffing policies and procedures",
      "Organize and administer staff consultation and grievance procedures",
      "Determine eligibility to entitlements, arrange staff training and provide information or services such as employee assistance, counselling and recognition programs",
      "May supervise personnel clerks performing filing and record-keeping duties",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=12101&version=2021.0",
    expressEntryEligible: true,
  },
};

export function getNocByCode(code: string): NocEntry | null {
  return NOC_CATALOG[code] ?? null;
}

export function listAvailableNocCodes(): Array<{
  code: string;
  title: string;
  teer: number;
}> {
  return Object.values(NOC_CATALOG).map(({ code, title, teer }) => ({
    code,
    title,
    teer,
  }));
}

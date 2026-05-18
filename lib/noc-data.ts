// lib/noc-data.ts
// Official IRCC NOC 2021 duty data.
// Each entry mirrors the "main duties" of the canonical Government of Canada
// page for that code (see sourceUrl). Catalog covers 12 common Express Entry
// occupations across education, health, engineering, IT, finance and HR.

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
      "Teach students using a systematic plan of lessons, discussions, audio-visual presentations and field trips",
      "Lead students in activities to promote their physical, mental and social development and their school readiness",
      "Prepare courses for presentation to students according to an approved curriculum",
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
      "Collaborate with members of an interdisciplinary health team to plan, implement, coordinate and evaluate patient care",
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
      "Examine patients and take their histories, order laboratory tests, X-rays and other diagnostic procedures",
      "Consult with other medical practitioners to evaluate patients' physical and mental health",
      "Prescribe and administer medications and treatments",
      "Inoculate and vaccinate patients to prevent and treat diseases",
      "Advise patients and their families on health care including health promotion, disease and accident prevention",
      "Provide counselling and support to patients and their families on a wide range of health and lifestyle issues",
      "Provide acute care to hospital inpatients",
      "Report births, deaths, and contagious and other diseases to government authorities",
      "May deliver babies, provide obstetrical care and perform minor surgery",
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
      "Perform nursing interventions such as taking vital signs, applying aseptic techniques including sterile dressing, and ensuring infection control",
      "Monitor nutritional intake and conduct specimen collection",
      "Administer medication and observe and document therapeutic effects",
      "Provide pre-operative and post-operative personal and comfort care",
      "Monitor established respiratory therapy and intravenous therapy",
      "Monitor patients' progress, evaluate and document effectiveness of nursing interventions",
      "Collaborate with appropriate members of the health care team",
      "Provide safety and health education to individuals and their families",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=32101&version=2021.0",
    expressEntryEligible: true,
  },

  "21231": {
    code: "21231",
    title: "Software engineers and designers",
    teer: 1,
    description: "Software engineers and designers research, design, evaluate, integrate and maintain software applications, technical environments, operating systems, and information systems.",
    mainDuties: [
      "Collect and document users' requirements and develop logical and physical specifications",
      "Research, evaluate and synthesize technical information to design, develop and test computer-based systems",
      "Develop data, process and network models to optimize architecture and evaluate the performance and reliability of designs",
      "Plan, design and co-ordinate the development, installation, integration and operation of computer-based systems",
      "Assess, troubleshoot, document, upgrade and develop maintenance procedures for operating systems and applications software",
      "Lead and co-ordinate teams of information systems professionals in the development of software and integrated information systems",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=21231&version=2021.0",
    expressEntryEligible: true,
  },

  "21232": {
    code: "21232",
    title: "Software developers and programmers",
    teer: 1,
    description: "Software developers and programmers research, design, develop, modify, evaluate and integrate computer and telecommunications software from individual programs to suites of programs.",
    mainDuties: [
      "Collect and document users' requirements and develop logical and physical specifications",
      "Research, evaluate and synthesize technical information to design, develop and test computer-based systems",
      "Develop data, process and network models to optimize architecture and evaluate the performance and reliability of designs",
      "Plan, design and co-ordinate the development, installation, integration and operation of computer-based systems",
      "Assess, troubleshoot, document, upgrade and develop maintenance procedures for operating systems and applications software",
      "May lead and co-ordinate teams of information systems professionals in the development of software and integrated information systems",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=21232&version=2021.0",
    expressEntryEligible: true,
  },

  "21234": {
    code: "21234",
    title: "Web developers and programmers",
    teer: 2,
    description: "Web developers and programmers research, design, develop and integrate Internet and intranet applications and websites for use on a variety of platforms.",
    mainDuties: [
      "Consult with clients to develop and document website requirements",
      "Source, select and organize information for inclusion and design the appearance, layout and flow of websites",
      "Create and optimize content for websites using a variety of graphics, database, animation and other software",
      "Plan, design, write, modify, integrate and test website-related code",
      "Conduct tests and perform security and quality controls",
      "Develop or adapt processing systems and conduct maintenance of websites and web applications",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=21234&version=2021.0",
    expressEntryEligible: true,
  },

  "21300": {
    code: "21300",
    title: "Civil engineers",
    teer: 1,
    description: "Civil engineers plan, design, develop and manage projects for the construction or repair of buildings, roads, bridges, dams and other structures and systems.",
    mainDuties: [
      "Confer with clients and other members of the engineering team and conduct research to determine project requirements",
      "Plan and design major civil projects such as buildings, roads, bridges, dams, water and waste systems",
      "Develop construction specifications and procedures",
      "Evaluate and recommend appropriate building and construction materials",
      "Interpret, review and approve survey and civil design work",
      "Conduct field services for civil projects and monitor construction to ensure compliance with specifications and codes",
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
    description: "Electrical and electronics engineers design, plan, research, evaluate and test electrical and electronic equipment, components, software and systems.",
    mainDuties: [
      "Conduct research into the feasibility, design, operation and performance of electrical generation and distribution networks and equipment",
      "Prepare material cost and timing estimates, reports and design specifications for electrical and electronic systems and equipment",
      "Design electrical and electronic circuits, components, systems and equipment",
      "Supervise and inspect the installation, modification, testing and operation of electrical and electronic systems and equipment",
      "Develop maintenance and operating standards for electrical and electronic systems and equipment",
      "Investigate electrical or electronic failures and supervise technicians, technologists and other engineers",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=21310&version=2021.0",
    expressEntryEligible: true,
  },

  "11100": {
    code: "11100",
    title: "Financial auditors and accountants",
    teer: 1,
    description: "Financial auditors examine and analyze the accounting and financial records of individuals and organizations. Accountants plan, organize and administer accounting systems for individuals and organizations.",
    mainDuties: [
      "Examine and analyze journal and ledger entries, bank statements, inventories, expenditures and other accounting and financial records",
      "Ensure accuracy and compliance with accounting standards, procedures and internal controls",
      "Prepare detailed reports on audit findings and recommend improvements to financial controls",
      "Plan, set up and administer accounting systems and prepare financial information for individuals and organizations",
      "Prepare financial statements and reports and analyze financial documents",
      "Examine accounting records and prepare financial statements and reports",
      "Develop and maintain cost-finding, reporting and internal control procedures",
      "Provide financial, business and tax advice",
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
      "Identify current and prospective staffing requirements and prepare and post job advertisements",
      "Collect and screen applications and advise job applicants on employment requirements and terms and conditions of employment",
      "Review candidate inventories and contact potential applicants to arrange interviews",
      "Recruit graduates of colleges, universities and other educational institutions",
      "Co-ordinate and participate in selection and examination boards to evaluate candidates",
      "Notify applicants of results of selection process and prepare job offers",
      "Advise managers and employees on staffing policies and procedures",
      "Organize and administer staff consultation and grievance procedures",
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

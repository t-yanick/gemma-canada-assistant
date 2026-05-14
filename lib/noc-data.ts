// lib/noc-data.ts
// Official IRCC NOC 2021 duty data, sourced from noc.esdc.gc.ca
// Each entry's mainDuties array reflects the "main duties" section from the
// canonical Government of Canada page for that code (sourceUrl below).

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
    description:
      "Secondary school teachers prepare and teach academic, technical, vocational or specialized subjects at public and private secondary schools. Secondary school teachers who are heads of departments are included in this unit group.",
    mainDuties: [
      "Teach students using a systematic plan of lectures, discussions, audio-visual presentations, and laboratory, shop and field studies",
      "Prepare subject material for presentation to students according to an approved curriculum",
      "Assign and correct homework",
      "Prepare, administer and correct tests",
      "Evaluate progress, determine individual needs of students and discuss results with parents and school officials",
      "Prepare and implement remedial programs for students requiring extra help",
      "Participate in staff meetings, educational conferences and teacher training workshops",
      "May teach and evaluate students through distance or online courses",
      "May advise students on course selection and on vocational and personal matters",
      "May supervise student teachers",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=41220&version=2021.0",
    expressEntryEligible: true,
  },

  "31301": {
    code: "31301",
    title: "Registered nurses and registered psychiatric nurses",
    teer: 1,
    description:
      "Registered nurses and registered psychiatric nurses provide direct nursing care to patients, deliver health education programs and provide consultative services regarding issues relevant to the practice of nursing. They are employed in a variety of settings including hospitals, nursing homes, extended care facilities, rehabilitation centres, doctors' offices, clinics, community agencies, companies, private homes and public and private organizations or they may be self-employed.",
    mainDuties: [
      "Assess patients to identify appropriate nursing interventions",
      "Collaborate with members of an interdisciplinary health team to plan, implement, coordinate and evaluate patient care in consultation with patients and their families",
      "Administer medications and treatments as prescribed by a physician or according to established policies and protocols",
      "Monitor, assess, address, document and report symptoms and changes in patients' conditions",
      "Operate or monitor medical apparatus or equipment",
      "Assist in surgery and other medical procedures",
      "May supervise licensed practical nurses and other nursing staff",
      "May develop and implement discharge planning process on admission of patients",
      "May teach and counsel patients and their families on health-related issues in collaboration with other health care providers",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=31301&version=2021.0",
    expressEntryEligible: true,
  },

  "21232": {
    code: "21232",
    title: "Software developers and programmers",
    teer: 1,
    description:
      "Software developers and programmers research, design, develop, modify, evaluate and integrate computer and telecommunications software from individual programs to suites of programs. They are employed by computer software development companies, information technology consulting firms, and in information technology units throughout the private and public sectors, or they may be self-employed.",
    mainDuties: [
      "Collect and document users' requirements and develop logical and physical specifications",
      "Research, evaluate and synthesize technical information to design, develop and test computer-based systems",
      "Develop data, process and network models to optimize architecture and to evaluate the performance and reliability of designs",
      "Plan, design and co-ordinate the development, installation, integration and operation of computer-based systems",
      "Assess, troubleshoot, document, upgrade and develop maintenance procedures for operating systems, communications environments and applications software",
      "May lead and co-ordinate teams of information systems professionals in the development of software and integrated information systems, process control software and other embedded software control systems",
    ],
    sourceUrl: "https://noc.esdc.gc.ca/Structure/NOCProfile?code=21232&version=2021.0",
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

export const eventDetails = {
  name: "Qiskit Fall Fest 2026",
  host: "R.M.K. Engineering College",
  dateLabel: "October 11–14, 2026",
  virtualLabel: "Fully virtual",
  date: "2026-10-11T09:00:00+05:30",
  emailPlaceholder: "organizing-team@your-domain.example",
  phonePlaceholder: "+91 ·· ·· ·· ··",
};

export const scheduleDays = [
  {
    day: "01",
    date: "Oct 11",
    title: "Opening & Orientation",
    accent: "cyan",
    sessions: [
      ["Time TBD", "Opening keynote"],
      ["Time TBD", "Qiskit fundamentals"],
      ["Time TBD", "Community orientation"],
    ],
  },
  {
    day: "02",
    date: "Oct 12",
    title: "Circuits & Coding",
    accent: "accent",
    sessions: [
      ["Time TBD", "Building your first gate"],
      ["Time TBD", "Quantum algorithms intro"],
      ["Time TBD", "Coding lab"],
    ],
  },
  {
    day: "03",
    date: "Oct 13",
    title: "Challenges & Build",
    accent: "brand",
    sessions: [
      ["Time TBD", "Live build challenge"],
      ["Time TBD", "Circuit builder lab"],
      ["Time TBD", "Showcase preparation"],
    ],
  },
  {
    day: "04",
    date: "Oct 14",
    title: "Showcase & Close",
    accent: "cyan",
    sessions: [
      ["Time TBD", "Participant demos"],
      ["Time TBD", "Closing session"],
      ["Time TBD", "Next steps"],
    ],
  },
] as const;

export const programCards = [
  { type: "Workshop", title: "Qiskit from Zero", description: "Build and run your first quantum circuit with guided support." },
  { type: "Workshop", title: "Error Correction 101", description: "Explore why qubits are fragile and how engineers protect information." },
  { type: "Challenge", title: "Entanglement Sprint", description: "A collaborative circuit-building challenge. Brief and format TBD." },
  { type: "Workshop", title: "Quantum + ML", description: "See how variational methods connect quantum circuits and machine learning." },
  { type: "Challenge", title: "Circuit Builder Lab", description: "Design, simulate, and share a circuit of your own. Details TBD." },
  { type: "Workshop", title: "Quantum Careers", description: "Map the skills, study paths, and questions shaping the field." },
] as const;

export const faqs = [
  ["Is the event fully virtual?", "Yes. Qiskit Fall Fest 2026 is designed for online participation across all four days."],
  ["Do I need previous quantum experience?", "No. The program includes beginner-friendly sessions alongside deeper workshops and challenges."],
  ["When will session links be available?", "Confirmed links will appear in the participant dashboard and remain restricted to registered participants."],
  ["Is registration free?", "The registration fee is currently listed as free. Any future event updates will be published here."],
  ["Are the schedule and speakers confirmed?", "Not yet. Items marked TBD are editable placeholders and will be updated by the organizing team."],
] as const;

export const placeholderTeam = ["Head Coordinator", "Technical Lead", "Design & Media", "Operations"] as const;
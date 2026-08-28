import type { ReadingSet } from "../types"

export const dailyLife: ReadingSet[] = [
  {
    kind: "reading",
    id: "dl-1",
    section: "daily-life",
    index: 1,
    title: "Textbook Collection Reminder",
    directions: "Read an email.",
    passage: {
      type: "email",
      subject: "Textbook Collection Reminder",
      body: [
        "Dear Students,",
        "If you rented textbooks this semester, please return them to the campus bookstore by December 18. Late returns will result in a small fine. Students who have lost a book should email the bookstore for instructions before the deadline.",
      ],
      signoff: ["Best,", "Mimi Chen"],
    },
    questions: [
      {
        kind: "mcq",
        number: 101,
        archetype: "detail",
        prompt: "What will happen if students return their books after December 18?",
        choices: [
          { id: "a", text: "Their grades may be affected." },
          { id: "b", text: "They will lose the right to rent again." },
          { id: "c", text: "They must pay the full price of the book." },
          { id: "d", text: "They will receive a fine." },
        ],
        answer: "d",
        explanation:
          "D is correct because the email clearly states, “Late returns will result in a small fine.” That means students who return books after December 18 will have to pay a fee. Option A is incorrect because the message never connects late returns to students' grades. Option B is unsupported since there's no mention of losing rental privileges. Option C is also wrong because students won't be charged the full price of the book, only a fine.",
      },
      {
        kind: "mcq",
        number: 102,
        archetype: "inference",
        prompt: "What can be inferred about the bookstore's policy?",
        choices: [
          { id: "a", text: "It has not experienced a late return before." },
          { id: "b", text: "It allows communication before the deadline." },
          { id: "c", text: "It rents books and does not sell them outright." },
          { id: "d", text: "It will be closed after December 18th for the holiday season." },
        ],
        answer: "b",
        explanation:
          "B is correct because the message says that students who have lost a book should “email the bookstore for instructions before the deadline,” showing that communication before the due date is part of the policy. Option A is incorrect because nothing in the email suggests this is the first time the bookstore has handled late returns. Option C is not supported. The message only talks about rented books, not sales. Option D is also incorrect since the announcement never mentions the bookstore closing for holidays.",
      },
    ],
  },
  {
    kind: "reading",
    id: "dl-2",
    section: "daily-life",
    index: 2,
    title: "Office Parking Update",
    directions: "Read an email.",
    passage: {
      type: "email",
      subject: "Office Parking Update",
      body: [
        "Dear Team,",
        "Starting Monday, the main parking lot will be reserved for visitors only. Employees should park in the lot behind Building B instead. Please update your parking passes by Friday to avoid any issues next week. Security staff will be checking passes at the gate during the first week of this change.",
      ],
      signoff: ["Kind regards,", "Tom Hardwick"],
    },
    questions: [
      {
        kind: "mcq",
        number: 103,
        archetype: "purpose",
        prompt: "What is the main purpose of this email?",
        choices: [
          { id: "a", text: "To request feedback on the new visitor parking policies" },
          { id: "b", text: "To inform employees about a new parking arrangement" },
          { id: "c", text: "To announce the cancellation of parking passes for the lot behind Building B" },
          { id: "d", text: "To remind staff to have their entry passes ready for security staff" },
        ],
        answer: "b",
        explanation:
          "B is correct because the email explains that the main lot will be “reserved for visitors only” and that employees should park behind Building B, making the purpose to inform staff of a new parking arrangement. Option A is incorrect because it doesn't ask for feedback, only compliance. Option C is wrong—there's no cancellation of passes. Option D is partly related, as the message mentions security checks, but that's not the central purpose of the email.",
      },
      {
        kind: "mcq",
        number: 104,
        archetype: "inference",
        prompt: "What can be inferred about next week's parking procedures?",
        choices: [
          { id: "a", text: "Employees will be allowed to park anywhere" },
          { id: "b", text: "Visitors will need to park behind Building B" },
          { id: "c", text: "Parking passes will be verified more closely than before" },
          { id: "d", text: "The parking policy will return to normal after one week" },
        ],
        answer: "c",
        explanation:
          "C is correct because the email notes that “Security staff will be checking passes at the gate during the first week of this change,” implying closer monitoring than before. Option A is incorrect since employees are told exactly where to park. Option B reverses the facts. Visitors, not employees, will use the main lot. Option D is also incorrect; nothing suggests the policy will last only one week.",
      },
    ],
  },
  {
    kind: "reading",
    id: "dl-3",
    section: "daily-life",
    index: 3,
    title: "Staff Training Confirmation",
    directions: "Read an email.",
    passage: {
      type: "email",
      subject: "Staff Training Confirmation",
      body: [
        "Dear Ms. Forester,",
        "Your registration for the customer service training on August 10 has been confirmed. The session will begin at 9:00 a.m. in Conference Room 3. Please bring your ID badge. Refreshments will be provided, but lunch is not included.",
      ],
      signoff: ["Sincerely,", "Ahmed Khan"],
    },
    questions: [
      {
        kind: "mcq",
        number: 105,
        archetype: "purpose",
        prompt: "What is the main purpose of this email?",
        choices: [
          { id: "a", text: "To ask Ms. Forester to refrain from bringing outside food or drinks" },
          { id: "b", text: "To announce a change in room location" },
          { id: "c", text: "To remind Ms. Forester to bring her ID badge" },
          { id: "d", text: "To confirm a registration for training" },
        ],
        answer: "d",
        explanation:
          "D is correct because the email opens with, “Your registration for the customer service training on August 10 has been confirmed,” clearly identifying its purpose as a registration confirmation. Option A is incorrect because there's no mention of food restrictions. Option B is wrong because the room location, Conference Room 3, is already final. Option C is partly true since the email does remind Ms. Forester to bring her ID badge, but that's only one detail, not the main message.",
      },
      {
        kind: "mcq",
        number: 106,
        archetype: "negative-fact",
        prompt: "Which of the following is NOT true according to the email?",
        choices: [
          { id: "a", text: "Participants need to bring an ID badge." },
          { id: "b", text: "The training will take place in Conference Room 3." },
          { id: "c", text: "Lunch will be provided during the session." },
          { id: "d", text: "Refreshments will be available." },
        ],
        answer: "c",
        explanation:
          "C is correct because the message says, “Refreshments will be provided, but lunch is not included,” so it's false to say lunch will be provided. Option A is true since participants are told to bring an ID badge. Option B is also true because the session is in Conference Room 3. Option D is confirmed in the same sentence about refreshments.",
      },
    ],
  },
  {
    kind: "reading",
    id: "dl-4",
    section: "daily-life",
    index: 4,
    title: "Building C Elevator Service",
    directions: "Read an announcement.",
    passage: {
      type: "notice",
      body: [
        "The elevator in Building C will be out of service all day on Wednesday, June 12, for a full safety inspection and routine maintenance. Employees who work on upper floors should plan accordingly by using the stairs or accessing Building D, which has a functioning elevator. Signs will be posted near the main lobby to guide staff to alternative routes.",
      ],
    },
    questions: [
      {
        kind: "mcq",
        number: 107,
        archetype: "detail",
        prompt: "Why will the elevator in Building C be unavailable?",
        choices: [
          { id: "a", text: "It will undergo a safety inspection." },
          { id: "b", text: "It will be replaced with a newer model." },
          { id: "c", text: "It will be inspected and painted." },
          { id: "d", text: "It will have a light tune-up on the motor." },
        ],
        answer: "a",
        explanation:
          "A is correct because the notice explains that the elevator will be out of service “for a full safety inspection and routine maintenance.” Option B is incorrect since there's no mention of replacement. Option C introduces painting, which isn't mentioned, and option D minimizes the scope. It's more than a “light tune-up.”",
      },
      {
        kind: "mcq",
        number: 108,
        archetype: "detail",
        prompt: "What should employees who work on upper floors do on June 12?",
        choices: [
          { id: "a", text: "Wait until the inspection ends before returning to work" },
          { id: "b", text: "Use Building D to reach their offices" },
          { id: "c", text: "Try the functioning elevator in Building C" },
          { id: "d", text: "Follow the signs up the stairs to their offices" },
        ],
        answer: "b",
        explanation:
          "B is correct because the announcement advises staff to “use the stairs or access Building D, which has a functioning elevator.” Option A is incorrect because employees are expected to keep working, not wait for repairs. Option C is wrong because the Building C elevator will not be functioning that day. Option D misinterprets the signs; they're simply for directions, not an instruction to “follow signs up the stairs.”",
      },
    ],
  },
  {
    kind: "reading",
    id: "dl-5",
    section: "daily-life",
    index: 5,
    title: "Customer Service Hotline Hours",
    directions: "Read an announcement.",
    passage: {
      type: "notice",
      body: [
        "The customer service hotline will operate under new hours beginning October 3. Representatives will be available from 9:00 a.m. to 6:00 p.m., Monday through Saturday. Although the schedule has been extended by one hour each evening, Sunday service will remain unavailable. Customers are encouraged to use the online help form outside business hours.",
      ],
    },
    questions: [
      {
        kind: "mcq",
        number: 109,
        archetype: "detail",
        prompt: "What change will occur starting October 3?",
        choices: [
          { id: "a", text: "Representatives will start working full-time." },
          { id: "b", text: "Sunday service will become available." },
          { id: "c", text: "Customer support will move online during business hours." },
          { id: "d", text: "The hotline will stay open one hour later each evening." },
        ],
        answer: "d",
        explanation:
          "D is correct because the notice states, “the schedule has been extended by one hour each evening,” meaning the hotline will stay open one hour later starting October 3. Option A is incorrect because it doesn't mention full-time status. Option B is wrong because Sunday service remains unavailable. Option C is also incorrect since online help is offered outside business hours.",
      },
      {
        kind: "mcq",
        number: 110,
        archetype: "detail",
        prompt: "Why are customers encouraged to use the online help form?",
        choices: [
          { id: "a", text: "It is required for all technical issues." },
          { id: "b", text: "It provides faster responses than phone support." },
          { id: "c", text: "It can be accessed when the hotline is closed." },
          { id: "d", text: "It replaces phone support during business hours." },
        ],
        answer: "c",
        explanation:
          "C is correct because the announcement says customers can use the online form “outside business hours,” meaning it's available when the hotline is closed. Option A is incorrect because customers aren't required to use the form for all issues. Option B is unsupported; there's no claim it's faster. Option D is also wrong since phone support still operates during business hours.",
      },
    ],
  },
  {
    kind: "reading",
    id: "dl-6",
    section: "daily-life",
    index: 6,
    title: "Open-House Volunteer Schedule",
    directions: "Read a text chain.",
    passage: {
      type: "chat",
      messages: [
        {
          from: "Priya Singh",
          time: "2:00 P.M.",
          text: "Hi everyone, just a reminder that the volunteer schedule for Saturday's campus open-house event needs to be finalized today.",
        },
        {
          from: "Jun Kim",
          time: "2:04 P.M.",
          text: "I've already confirmed the morning shift with three students from the debate club.",
        },
        {
          from: "Mimi Chen",
          time: "2:06 P.M.",
          text: "Great! I'll handle the afternoon shift sign-ups. Should I assign two people to each information table again?",
        },
        {
          from: "Priya Singh",
          time: "2:08 P.M.",
          text: "Yes, please. Also, make sure one volunteer at each table knows how to log visitor check-ins on the tablet.",
        },
        {
          from: "Marco Mercado",
          time: "2:10 P.M.",
          text: "I can run a quick demo session tomorrow morning to show everyone how the app works.",
        },
        {
          from: "Priya Singh",
          time: "2:12 P.M.",
          text: "Perfect, Marco. That should prevent the confusion we had at last semester's event. Thanks, everyone.",
        },
      ],
    },
    questions: [
      {
        kind: "mcq",
        number: 111,
        archetype: "purpose",
        prompt: "What is the main purpose of the messages?",
        choices: [
          { id: "a", text: "To assign volunteers for a campus event" },
          { id: "b", text: "To choose a location for the open house" },
          { id: "c", text: "To invite students to volunteer for an open house event" },
          { id: "d", text: "To announce a change to the volunteering participants" },
        ],
        answer: "a",
        explanation:
          "A is correct because the entire exchange revolves around confirming and assigning volunteers for the campus open-house event. Priya organizes shifts, Jun confirms his group, and Marco volunteers to train others. Option B is incorrect because they already have a location. Option C is wrong because no one is inviting new volunteers. Option D is also incorrect since the team isn't changing participants, just finalizing plans.",
      },
      {
        kind: "mcq",
        number: 112,
        archetype: "inference",
        prompt: "What can be inferred about last semester's event?",
        choices: [
          { id: "a", text: "The app training took too long" },
          { id: "b", text: "The visitor check-in system did not work smoothly" },
          { id: "c", text: "There were not enough volunteers available" },
          { id: "d", text: "Few visitors came to the event" },
        ],
        answer: "b",
        explanation:
          "B is correct because Priya says Marco's demo “should prevent the confusion we had at last semester's event,” implying that the visitor check-in system didn't run smoothly last time. Option A is incorrect; there's no sign the training was too long. Option C is unsupported. Everyone seems to have enough help. Option D is false because the issue was confusion, not low attendance.",
      },
      {
        kind: "mcq",
        number: 113,
        archetype: "detail",
        prompt: "According to the messages, who will demonstrate how to use the check-in app?",
        choices: [
          { id: "a", text: "Mimi" },
          { id: "b", text: "Jun" },
          { id: "c", text: "Marco" },
          { id: "d", text: "Priya" },
        ],
        answer: "c",
        explanation:
          "C is correct because Marco explicitly says, “I can run a quick demo session tomorrow morning to show everyone how the app works.” Option A is incorrect. Mimi manages sign-ups, not training. Option B is wrong since Jun only confirmed volunteers. Option D is incorrect because Priya oversees coordination but doesn't handle app demonstrations.",
      },
    ],
  },
  {
    kind: "reading",
    id: "dl-7",
    section: "daily-life",
    index: 7,
    title: "EcoBlend Shipment Delay",
    directions: "Read a text chain.",
    passage: {
      type: "chat",
      messages: [
        {
          from: "Olga Antonov",
          time: "9:00 A.M.",
          text: "Morning team. The shipment of EcoBlend mugs was delayed due to the storm. We need to update our customers right away.",
        },
        {
          from: "Luis Fernandez",
          time: "9:03 A.M.",
          text: "I'll email all wholesale clients explaining the new delivery date. Do we know when the shipment will arrive?",
        },
        {
          from: "Olga Antonov",
          time: "9:05 A.M.",
          text: "The supplier expects delivery on Thursday instead of Tuesday.",
        },
        {
          from: "Yasmin Hasan",
          time: "9:08 A.M.",
          text: "Should I also post an announcement on our website and social media pages?",
        },
        {
          from: "Olga Antonov",
          time: "9:10 A.M.",
          text: "Yes, please do. Keep the message positive—mention the weather issue but emphasize that orders will ship later this week.",
        },
        {
          from: "Ahmed Khan",
          time: "9:12 A.M.",
          text: "Got it. I'll adjust the inventory page so customers can't place new mug orders until Thursday.",
        },
        {
          from: "Olga Antonov",
          time: "9:14 A.M.",
          text: "Thanks, everyone. Let's avoid the kind of confusion we had during last month's delay.",
        },
      ],
    },
    questions: [
      {
        kind: "mcq",
        number: 114,
        archetype: "main-idea",
        prompt: "What is Olga's main concern in these messages?",
        choices: [
          { id: "a", text: "Designing a new product that suppliers can deliver on time" },
          { id: "b", text: "Preventing customer confusion about late orders" },
          { id: "c", text: "Losing contact with the supplier" },
          { id: "d", text: "Finding ways to email clients about social media pages" },
        ],
        answer: "b",
        explanation:
          "B is correct because Olga's main concern is keeping customers informed and avoiding “the confusion we had during last month's delay.” She wants clear updates about the late orders. Option A is incorrect because she's not designing a new product. Option C is wrong since contact with the supplier is already established. Option D misreads the situation. Emails and social media updates are separate actions, not the same.",
      },
      {
        kind: "mcq",
        number: 115,
        archetype: "detail",
        prompt: "According to the messages, when will the shipment now arrive?",
        choices: [
          { id: "a", text: "Thursday" },
          { id: "b", text: "Tuesday" },
          { id: "c", text: "Monday" },
          { id: "d", text: "Friday" },
        ],
        answer: "a",
        explanation:
          "A is correct because Olga states that the supplier expects delivery “on Thursday instead of Tuesday.” Option B refers to the original date, not the new one. Option C and D are not mentioned anywhere in the conversation.",
      },
      {
        kind: "mcq",
        number: 116,
        archetype: "negative-fact",
        prompt: "Which of the following actions is NOT mentioned in the messages?",
        choices: [
          { id: "a", text: "Contacting wholesale clients by email" },
          { id: "b", text: "Posting an update on social media" },
          { id: "c", text: "Adjusting the inventory page" },
          { id: "d", text: "Calling the supplier by phone" },
        ],
        answer: "d",
        explanation:
          "D is correct because no one talks about calling the supplier. They handle the delay by email, website updates, and inventory adjustments. The other actions, emailing clients, posting updates, and modifying inventory, are all explicitly described.",
      },
    ],
  },
  {
    kind: "reading",
    id: "dl-8",
    section: "daily-life",
    index: 8,
    title: "Conference Slide Deck",
    directions: "Read a text chain.",
    passage: {
      type: "chat",
      messages: [
        {
          from: "Michelle Gerber",
          time: "11:00 A.M.",
          text: "Hi team, just checking—has everyone uploaded their slides for the environmental conference next week?",
        },
        {
          from: "Hiro Matsumoto",
          time: "11:03 A.M.",
          text: "I uploaded mine last night. It focuses on the data from our recycling pilot program.",
        },
        {
          from: "Ela Dogan",
          time: "11:05 A.M.",
          text: "I'm still adjusting a few charts, but I'll upload my file before the end of the day.",
        },
        {
          from: "Michelle Gerber",
          time: "11:07 A.M.",
          text: "Great, thank you. I'll combine all the slides into one deck so the transitions look consistent.",
        },
        {
          from: "Alex Petrov",
          time: "11:10 A.M.",
          text: "Should we include the community outreach results, or would that make the presentation too long?",
        },
        {
          from: "Michelle Gerber",
          time: "11:13 A.M.",
          text: "Good question. Let's skip them for now—there's only ten minutes for our session, and we don't want to rush.",
        },
      ],
    },
    questions: [
      {
        kind: "mcq",
        number: 117,
        archetype: "purpose",
        prompt: "What is the main purpose of the messages?",
        choices: [
          { id: "a", text: "To discuss results from a completed recycling project" },
          { id: "b", text: "To prepare a presentation for an upcoming conference" },
          { id: "c", text: "To plan a community outreach event before the conference" },
          { id: "d", text: "To confirm who will deliver the presentation at the conference" },
        ],
        answer: "b",
        explanation:
          "B is correct because the discussion is about preparing a single presentation for an upcoming conference. Michelle checks that everyone has uploaded slides, plans to combine them, and ensures the presentation fits the time limit. Option A is incorrect—the recycling data is just one section, not the focus. Option C is wrong because outreach isn't being planned; it's being excluded. Option D is incorrect because there's no mention of assigning a speaker.",
      },
      {
        kind: "mcq",
        number: 118,
        archetype: "inference",
        prompt: "What can be inferred about the team's presentation?",
        choices: [
          { id: "a", text: "It will include slides from multiple contributors." },
          { id: "b", text: "It will be the longest presentation at the conference." },
          { id: "c", text: "It focuses on the community outreach data." },
          { id: "d", text: "It has not yet been accepted by the conference organizers." },
        ],
        answer: "a",
        explanation:
          "A is correct because multiple team members mention uploading their slides, and Michelle says she will “combine all the slides into one deck.” Option B is incorrect because the session lasts only ten minutes. Option C is wrong because the outreach section was deliberately left out. Option D is unsupported since the conference is already confirmed.",
      },
      {
        kind: "mcq",
        number: 119,
        archetype: "detail",
        prompt: "According to the messages, what task is Ela responsible for?",
        choices: [
          { id: "a", text: "Designing new charts for the report" },
          { id: "b", text: "Combining individual slides into a final presentation" },
          { id: "c", text: "Presenting the outreach section" },
          { id: "d", text: "Uploading the pilot program data" },
        ],
        answer: "a",
        explanation:
          "A is correct because Ela says, “I'm still adjusting a few charts, but I'll upload my file before the end of the day.” Option B is incorrect because Michelle, not Ela, is combining the slides. Option C is wrong because Michelle doesn't mention presenting. Option D is also incorrect because Hiro uploaded the recycling data.",
      },
    ],
  },
  {
    kind: "reading",
    id: "dl-9",
    section: "daily-life",
    index: 9,
    title: "Academic Mentorship Program",
    directions: "Read an email.",
    passage: {
      type: "email",
      subject: "Invitation to Join the Academic Mentorship Program",
      body: [
        "Dear Students,",
        "We are pleased to announce the launch of the university's Academic Mentorship Program for the upcoming semester. The initiative pairs first-year students with experienced upper-class mentors who can offer guidance on study strategies, time management, and adjusting to campus life.",
        "If you are interested in becoming a mentor, please complete the short application form on the Student Success Center website by February 14. Training sessions for selected mentors will take place during the last week of February. Participants will receive volunteer-hour certificates and a letter of recognition from the Dean's Office.",
        "This program has helped hundreds of students feel more connected and confident in their academic journey. We encourage you to get involved and make a positive difference in someone else's experience.",
      ],
      signoff: ["Warm regards,", "Aisha Hinds"],
    },
    questions: [
      {
        kind: "mcq",
        number: 120,
        archetype: "purpose",
        prompt: "What is the main purpose of the email?",
        choices: [
          { id: "a", text: "To request feedback on past mentoring experiences" },
          { id: "b", text: "To announce a new scholarship opportunity for first-year students" },
          { id: "c", text: "To provide information about tutoring services at the Student Success Center" },
          { id: "d", text: "To invite students to participate in a university mentorship program" },
        ],
        answer: "d",
        explanation:
          "D is correct because the email invites students to “complete the short application form” if they want to become mentors, making it an invitation to participate in the university's mentorship program. Option A is incorrect since no feedback is requested. Option B is wrong because scholarships aren't mentioned. Option C is partly related, as the Student Success Center is referenced, but the program is mentorship, not tutoring.",
      },
      {
        kind: "mcq",
        number: 121,
        archetype: "detail",
        prompt: "When will training sessions take place?",
        choices: [
          { id: "a", text: "By the end of the spring semester" },
          { id: "b", text: "Around February 24th" },
          { id: "c", text: "During the first week of February" },
          { id: "d", text: "By February 14" },
        ],
        answer: "b",
        explanation:
          "B is correct because the email notes that training will take place “during the last week of February,” which would fall around February 24. Option A is too late in the semester, Option C is too early, and Option D is incorrect because February 14 is the application deadline, not the training date.",
      },
      {
        kind: "mcq",
        number: 122,
        archetype: "inference",
        prompt: "What can be inferred about the program's previous success?",
        choices: [
          { id: "a", text: "It has mainly focused on graduate student mentorship." },
          { id: "b", text: "It was recently introduced and still being tested." },
          { id: "c", text: "It has been in place for several semesters." },
          { id: "d", text: "It has faced difficulties recruiting interested applicants." },
        ],
        answer: "c",
        explanation:
          "C is correct because the message explains that the program “has helped hundreds of students,” indicating it has existed for several semesters. Option A is wrong—it mentions first-year students, not graduate students. Option B contradicts the idea of long-term success. Option D is unsupported; nothing suggests recruitment problems.",
      },
    ],
  },
  {
    kind: "reading",
    id: "dl-10",
    section: "daily-life",
    index: 10,
    title: "Temporary Relocation of HR",
    directions: "Read an email.",
    passage: {
      type: "email",
      subject: "Temporary Relocation of HR Department",
      body: [
        "The Human Resources Department will be temporarily relocated to Suite 402 while renovations are completed on the main office. The relocation will take effect on June 12 and is expected to last three weeks.",
        "During this period, employees should visit Suite 402 for payroll questions, benefits assistance, or onboarding meetings. All appointments already scheduled in the main office will continue as planned. Visitors may notice directional signs near the elevator and at the entrance to each floor.",
        "The HR team will maintain normal business hours and can still be reached by phone or email for general inquiries. These improvements include updated workstations and a more private meeting area for confidential consultations. Thank you for your patience and cooperation as we create a more efficient and comfortable workspace for everyone.",
      ],
      signoff: ["— The Facilities Department"],
    },
    questions: [
      {
        kind: "mcq",
        number: 123,
        archetype: "purpose",
        prompt: "What is the main purpose of this announcement?",
        choices: [
          { id: "a", text: "To inform employees about a change in HR's location" },
          { id: "b", text: "To advertise new positions opening in the HR department" },
          { id: "c", text: "To announce a change in HR operating hours during the summer" },
          { id: "d", text: "To explain the reason for the renovations to the HR department" },
        ],
        answer: "a",
        explanation:
          "A is correct because the email opens by announcing that the HR Department “will be temporarily relocated to Suite 402 while renovations are completed.” The message gives the effective date and the expected duration, which confirms its purpose is to inform employees about this move. Option B is incorrect because it doesn't advertise new jobs. Option C is wrong because the hours will remain the same. Option D is only partly true since renovations are mentioned but not explained in detail.",
      },
      {
        kind: "mcq",
        number: 124,
        archetype: "detail",
        prompt: "What will remain unchanged during the renovation period?",
        choices: [
          { id: "a", text: "The location of the payroll office and staff parking" },
          { id: "b", text: "The department's business hours and contact methods" },
          { id: "c", text: "The schedule of construction work on each floor" },
          { id: "d", text: "The entrance used by employees to access Suite 402" },
        ],
        answer: "b",
        explanation:
          "B is correct because the notice says, “The HR team will maintain normal business hours and can still be reached by phone or email,” making it clear those two aspects will stay the same. Option A is incorrect because the payroll office is part of HR, so it's moving too. Option C is unsupported since there's no construction schedule. Option D is irrelevant because the entrance isn't discussed.",
      },
      {
        kind: "mcq",
        number: 125,
        archetype: "detail",
        prompt: "What is one improvement being made to the HR office?",
        choices: [
          { id: "a", text: "Expanding the department's overall staff size" },
          { id: "b", text: "Creating a more private space for meetings" },
          { id: "c", text: "Replacing paper-based records with digital files" },
          { id: "d", text: "Adding a new elevator for employee use" },
        ],
        answer: "b",
        explanation:
          "B is correct because one listed improvement is “a more private meeting area for confidential consultations.” Option A is incorrect since staffing changes aren't mentioned. Option C is wrong because digital recordkeeping is never brought up. Option D is also incorrect. No new elevator is planned.",
      },
    ],
  },
  {
    kind: "reading",
    id: "dl-11",
    section: "daily-life",
    index: 11,
    title: "Water Service Interruption",
    directions: "Read an email.",
    passage: {
      type: "email",
      subject: "Important Update – Water Service Interruption",
      body: [
        "Dear Residents,",
        "Please be advised that routine maintenance on the neighborhood's main water line is scheduled for Tuesday, September 17, from 9:00 A.M. to 3:00 P.M. During this time, water service will be temporarily unavailable in all residential units.",
        "Residents are encouraged to store an adequate supply of water for cooking, cleaning, and drinking before the interruption begins. The maintenance crew will make every effort to complete the work on schedule, but delays may occur if unexpected repairs are required.",
        "Once service resumes, we recommend running the tap for several minutes to clear any air or discoloration from the pipes. We appreciate your understanding and cooperation as we complete this necessary maintenance to ensure the long-term reliability of the system.",
      ],
    },
    questions: [
      {
        kind: "mcq",
        number: 126,
        archetype: "detail",
        prompt: "According to the message, what should residents do before the maintenance begins?",
        choices: [
          { id: "a", text: "Store water to last at least a week" },
          { id: "b", text: "Contact the maintenance crew for an inspection" },
          { id: "c", text: "Prepare enough water for household use" },
          { id: "d", text: "Run the tap water for a few minutes" },
        ],
        answer: "c",
        explanation:
          "C is correct because residents are told to “store an adequate supply of water for cooking, cleaning, and drinking before the interruption begins.” That's the clear instruction. Option A exaggerates the timeline—there's no mention of a week. Option B is incorrect because residents don't need to contact maintenance. Option D is also wrong—running the tap happens after service resumes.",
      },
      {
        kind: "mcq",
        number: 127,
        archetype: "detail",
        prompt: "What is one reason the maintenance might take longer than expected?",
        choices: [
          { id: "a", text: "Delays often occur because crews wait for ideal conditions." },
          { id: "b", text: "The maintenance team plans to replace all pipes in the area." },
          { id: "c", text: "Additional repairs could be needed once the work begins." },
          { id: "d", text: "The start time could change due to heavy rainfall." },
        ],
        answer: "c",
        explanation:
          "C is correct because the message warns that “delays may occur if unexpected repairs are required.” That means extra repairs could make the work take longer. Option A is inaccurate—there's no mention of waiting for conditions. Option B is false; the maintenance is routine, not a full replacement. Option D is also incorrect because weather isn't mentioned.",
      },
      {
        kind: "mcq",
        number: 128,
        archetype: "inference",
        prompt: "What can be inferred about the maintenance project?",
        choices: [
          { id: "a", text: "It is routine work intended to prevent larger problems in the future." },
          { id: "b", text: "It was organized quickly in response to a serious emergency." },
          { id: "c", text: "It will affect only a small number of households in the neighborhood." },
          { id: "d", text: "It is expected to create noticeable noise throughout the day." },
        ],
        answer: "a",
        explanation:
          "A is correct because it describes the project as “routine maintenance” meant “to ensure long-term reliability,” showing it's preventive work. Option B is wrong since it's not an emergency. Option C is incorrect because the outage affects all homes. Option D is unsupported because the message never mentions noise.",
      },
    ],
  },
  {
    kind: "reading",
    id: "dl-12",
    section: "daily-life",
    index: 12,
    title: "Campus Network Maintenance",
    directions: "Read an announcement.",
    passage: {
      type: "notice",
      body: [
        "On Friday, October 8, from 2:00 A.M. to 6:00 A.M., the IT Department will conduct scheduled maintenance on the campus network serving all university dormitories. During this time, both Wi-Fi access and wired connections will be temporarily unavailable.",
        "Students who need to submit assignments or access online resources are advised to plan accordingly before the maintenance window. The computer lab in the Student Center will remain open overnight for anyone requiring internet access, and additional staff will be on duty to assist with technical questions.",
        "This update is part of an ongoing effort to improve network speed, expand coverage in older dormitories, and enhance overall reliability. We appreciate your understanding and cooperation as the university continues investing in stronger and more secure digital services.",
      ],
    },
    questions: [
      {
        kind: "mcq",
        number: 129,
        archetype: "detail",
        prompt: "What measure has the university arranged to help students during the outage?",
        choices: [
          { id: "a", text: "Distributing improved network speed and coverage across the campus" },
          { id: "b", text: "Extending assignment deadlines until after the maintenance period" },
          { id: "c", text: "Allowing limited Wi-Fi access for academic websites only" },
          { id: "d", text: "Keeping the Student Center computer lab open with staff support" },
        ],
        answer: "d",
        explanation:
          "D is correct because the university arranged for the Student Center computer lab to “remain open overnight” with extra staff available, providing students an alternative during the outage. Option A misinterprets the goal—improvements happen after maintenance. Option B is incorrect because no deadline extensions are mentioned. Option C is also wrong because Wi-Fi access will be unavailable entirely, not limited.",
      },
      {
        kind: "mcq",
        number: 130,
        archetype: "negative-fact",
        prompt: "According to the announcement, students are NOT advised to",
        choices: [
          { id: "a", text: "Visit the Student Center for online work" },
          { id: "b", text: "Plan ahead if they rely on internet access" },
          { id: "c", text: "Submit assignments online during the maintenance hours" },
          { id: "d", text: "Expect improved coverage in older dorms once the upgrade is complete" },
        ],
        answer: "c",
        explanation:
          "C is correct because students are advised to plan ahead, meaning they shouldn't try to submit assignments online between 2:00 and 6:00 A.M. when the network is down. Option A and B are encouraged behaviors, not discouraged ones. Option D is incorrect because improved coverage is actually expected once the upgrade is complete.",
      },
      {
        kind: "mcq",
        number: 131,
        archetype: "inference",
        prompt: "What can be inferred about the timing of the maintenance?",
        choices: [
          { id: "a", text: "It was arranged suddenly in response to a serious outage." },
          { id: "b", text: "It was scheduled overnight to reduce inconvenience for most students." },
          { id: "c", text: "It was chosen to coincide with a campus holiday when dorms are empty." },
          { id: "d", text: "It was delayed because of difficulties hiring staff for the Student Center." },
        ],
        answer: "b",
        explanation:
          "B is correct because the work is scheduled overnight, from 2:00 A.M. to 6:00 A.M., clearly chosen to minimize disruption. Option A is incorrect because it's planned maintenance, not emergency work. Option C is wrong because no campus holiday is mentioned. Option D is unsupported; the message says extra staff will be present, not that hiring was difficult.",
      },
    ],
  },
  {
    kind: "reading",
    id: "dl-13",
    section: "daily-life",
    index: 13,
    title: "Oakridge Community Pool",
    directions: "Read an announcement.",
    passage: {
      type: "notice",
      body: [
        "The Oakridge Community Pool will be closed from Monday, August 5, through Wednesday, August 7, for its annual cleaning and maintenance. During this time, facility staff will drain and sanitize the pool, inspect filtration systems, and perform minor repairs to ensure water quality and safety standards are met.",
        "Swimming lessons, lap schedules, and open swim sessions will resume on Thursday, August 8, at 8:00 A.M. All memberships will automatically be extended by three days to compensate for the closure period.",
        "The gym and tennis courts will remain open with normal operating hours, and front desk staff will be available to answer any membership or scheduling questions. We appreciate your patience and understanding as we complete this essential maintenance to keep the facility safe and enjoyable for all residents.",
      ],
      signoff: ["— Mimi Chen, Oakridge Recreation Department"],
    },
    questions: [
      {
        kind: "mcq",
        number: 132,
        archetype: "purpose",
        prompt: "What is the main purpose of this notice?",
        choices: [
          { id: "a", text: "To let users know about extended benefits for annual membership" },
          { id: "b", text: "To announce a permanent change to the facility's operating hours" },
          { id: "c", text: "To inform members about a scheduled pool closure" },
          { id: "d", text: "To promote new swim classes beginning the week after maintenance" },
        ],
        answer: "c",
        explanation:
          "C is correct because the notice clearly informs members that the pool will be closed from August 5 through August 7 for annual cleaning and maintenance. The main goal is to announce this temporary closure. Choice A mentions extended memberships, but that is only a secondary detail. B does not fit since the message makes no mention of a permanent change to operating hours. D can also be ruled out because the announcement never promotes upcoming swim classes.",
      },
      {
        kind: "mcq",
        number: 133,
        archetype: "detail",
        prompt: "Why will memberships be extended?",
        choices: [
          { id: "a", text: "To offset the days when the pool cannot be used during maintenance" },
          { id: "b", text: "To reward members who attend make-up lessons scheduled during the closure" },
          { id: "c", text: "To compensate for reduced weight room hours while cleaning is performed" },
          { id: "d", text: "To account for weather-related cancellations that week" },
        ],
        answer: "a",
        explanation:
          "A is correct since the message explains that memberships will be “extended by three days to compensate for the closure period.” In other words, the extension makes up for the time when members cannot swim. The idea in B about make-up lessons does not appear anywhere in the text. C is off-topic because the gym remains open as usual, and D is unsupported because weather cancellations are never mentioned.",
      },
      {
        kind: "mcq",
        number: 134,
        archetype: "negative-fact",
        prompt: "The notice does NOT advise members to",
        choices: [
          { id: "a", text: "Anticipate a three-day extension being applied to memberships" },
          { id: "b", text: "Direct membership or scheduling questions to the front desk" },
          { id: "c", text: "Continue using the gym and tennis courts during regular hours" },
          { id: "d", text: "Expect complimentary guest passes during the closure period" },
        ],
        answer: "d",
        explanation:
          "D is correct because there is no statement suggesting members will receive free guest passes. A, B, and C are all accurate details from the notice. Members are told to expect the three-day extension, contact the front desk for questions, and continue using the gym and tennis courts on their regular schedule.",
      },
    ],
  },
]

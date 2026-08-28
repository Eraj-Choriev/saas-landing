import type { ReadingSet } from "../types"

const directions = "Read an academic passage. Answer the questions that follow."

export const academic: ReadingSet[] = [
  {
    kind: "reading",
    id: "ap-1",
    section: "academic",
    index: 1,
    title: "The Evolution of Money",
    directions,
    passage: {
      type: "article",
      title: "The Evolution of Money",
      paragraphs: [
        "For most of human history, trade depended on direct exchange. A farmer might swap grain for a pot or cloth for salt. This system, known as barter, worked only when both parties wanted exactly what the other offered. The difficulty of such “double coincidence of wants” encouraged the search for a more flexible medium of exchange. Early societies adopted shells, beads, and metals whose durability and scarcity made them reliable stores of value.",
        "The invention of coinage around 600 BCE revolutionized commerce. Stamped metal pieces provided an official guarantee of weight and purity, allowing long-distance trade to flourish. Over time, coins gave way to paper notes backed by precious metals, and later to credit systems built on trust in banks rather than gold. Each step represented a gradual move from tangible goods toward abstract promises.",
        "Today, the rise of digital currencies marks another turning point. Cryptographic systems such as Bitcoin eliminate the need for central authorities, replacing institutional trust with mathematical verification. Supporters see this as a democratization of finance, while critics warn of volatility and environmental costs. Whether electronic or metallic, money continues to evolve as a reflection of the societies that create it.",
      ],
    },
    questions: [
      {
        kind: "mcq",
        number: 135,
        archetype: "detail",
        prompt: "According to the passage, what problem made barter an inefficient system of trade?",
        choices: [
          { id: "a", text: "Each trader had to want what the other person offered." },
          { id: "b", text: "Barter required government supervision to be fair." },
          { id: "c", text: "Farmers could not determine the quality of exchanged goods." },
          { id: "d", text: "Early societies needed to adopt the same system of beads and shells." },
        ],
        answer: "a",
        explanation:
          "A is correct because the passage states that barter worked only when both traders wanted exactly what the other offered, which made exchanges inefficient. This lack of mutual desire for goods created serious limits to trade. The statement in B about government supervision is not mentioned at all. The idea in C that farmers could not judge quality is unrelated, and D confuses the timeline since shells and beads came later as substitutes for barter.",
      },
      {
        kind: "mcq",
        number: 136,
        archetype: "detail",
        prompt: "What was one effect of the invention of coinage around 600 BCE?",
        choices: [
          { id: "a", text: "It caused shells and beads to lose their economic importance." },
          { id: "b", text: "It promoted trade over long distances by creating standardized value." },
          { id: "c", text: "It diminished the need for paper money in later economies." },
          { id: "d", text: "It restricted commerce to only places that used stamped metal pieces." },
        ],
        answer: "b",
        explanation:
          "B is correct as the text notes that stamped coins “allowed long-distance trade to flourish” by guaranteeing weight and purity. This innovation created standardized value that promoted broader commerce. A is inaccurate since coins did not instantly replace earlier forms like shells. C is false because paper money emerged much later, and D misinterprets the effect by suggesting coinage restricted trade rather than expanded it.",
      },
      {
        kind: "mcq",
        number: 137,
        archetype: "vocabulary",
        prompt: "The word “durability” in the passage is closest in meaning to",
        choices: [
          { id: "a", text: "purity" },
          { id: "b", text: "rarity" },
          { id: "c", text: "weight" },
          { id: "d", text: "strength" },
        ],
        answer: "d",
        explanation:
          "D is correct because “durability” refers to strength or lasting quality. The author highlights that early materials like metals and shells were chosen for their ability to endure wear over time. The other words do not fit this meaning. Purity relates to content, rarity to scarcity, and weight to heaviness rather than endurance.",
      },
      {
        kind: "mcq",
        number: 138,
        archetype: "rhetorical-purpose",
        prompt: "Why does the author mention the “double coincidence of wants”?",
        choices: [
          { id: "a", text: "To define an early form of currency used in ancient markets" },
          { id: "b", text: "To illustrate why barter created obstacles that money later solved" },
          { id: "c", text: "To explain why some societies still rely on trade without money" },
          { id: "d", text: "To introduce a technical term that describes how bartering led to coin-making" },
        ],
        answer: "b",
        explanation:
          "B is correct because the phrase “double coincidence of wants” illustrates why barter created difficulties that money helped resolve. The author introduces it to show the motivation for inventing more flexible exchange systems. A is not correct because it is not describing an early currency. The idea in C that some societies still rely on trade without money goes beyond what the text says. D overstates the point since the phrase explains the problem, not the invention of coins directly.",
      },
      {
        kind: "mcq",
        number: 139,
        archetype: "insert-text",
        prompt:
          "Look at the four squares that indicate where the following sentence could be added to the passage.\n\n“This innovation allowed goods to be traded more easily across regions and cultures.”\n\nWhere would the sentence best fit?",
        insertExcerpt:
          "The difficulty of such “double coincidence of wants” encouraged the search for a more flexible medium of exchange. [[A]] Early societies adopted shells, beads, and metals whose durability and scarcity made them reliable stores of value. [[B]] The invention of coinage around 600 BCE revolutionized commerce. [[C]] Stamped metal pieces provided an official guarantee of weight and purity, allowing long-distance trade to flourish. [[D]] Over time, coins gave way to paper notes backed by precious metals, and later to credit systems built on trust in banks rather than gold.",
        choices: [
          { id: "a", text: "Square A" },
          { id: "b", text: "Square B" },
          { id: "c", text: "Square C" },
          { id: "d", text: "Square D" },
        ],
        answer: "c",
        explanation:
          "The sentence fits best at position C. It connects naturally after describing “The invention of coinage around 600 BCE.” A is incorrect because no innovation has been described yet. Option B doesn't work because it describes multiple innovations, “Early societies adopted shells, beads, and metals,” not just one. And option D does not match the flow of the paragraph, making C the best option.",
      },
    ],
  },
  {
    kind: "reading",
    id: "ap-2",
    section: "academic",
    index: 2,
    title: "The Hidden Life of Soil",
    directions,
    passage: {
      type: "article",
      title: "The Hidden Life of Soil",
      paragraphs: [
        "Soil appears inert, yet beneath its surface lies one of the planet's most dynamic ecosystems. A single handful contains billions of microorganisms — bacteria, fungi, and tiny invertebrates — interacting in intricate food webs. These organisms decompose organic matter, releasing nutrients that plants need to grow. In this sense, soil functions as both a living factory and a storage system for global carbon.",
        "Human activity, however, is reshaping this hidden ecosystem in measurable ways. For example, heavy use of nitrogen fertilizers in Europe and China can favor a few bacterial species while killing others, upsetting the natural balance of soil communities. As these microorganisms decline, carbon that was once stored underground escapes into the atmosphere, adding to greenhouse gases. Because these changes occur below the surface, scientists describe soil degradation as a “quiet crisis” that receives far less attention than deforestation or melting ice.",
        "Some regions are now demonstrating how soil recovery can work in practice. In India, farmers who rotate rice and lentil crops are restoring nitrogen levels naturally. The lentils host bacteria that fix nitrogen in the soil, reducing the need for chemical fertilizers and improving yields in the following rice season. These efforts show that reviving soil life is not merely an environmental gesture but a practical climate strategy.",
      ],
    },
    questions: [
      {
        kind: "mcq",
        number: 140,
        archetype: "detail",
        prompt: "According to the passage, what enables soil to act as a “living factory”?",
        choices: [
          { id: "a", text: "The balance of oxygen and water maintained by plant roots" },
          { id: "b", text: "The minerals that form naturally in the soil over time" },
          { id: "c", text: "The constant addition of fertilizers invented by microorganisms" },
          { id: "d", text: "The interaction of countless organisms that release nutrients" },
        ],
        answer: "d",
        explanation:
          "D is correct because the author explains that billions of microorganisms interact within soil to release nutrients for plant growth, turning it into a “living factory.” The other choices miss this focus. A mentions oxygen and water, which are not discussed. B talks about minerals forming naturally, but that is not part of the explanation. C is inaccurate since fertilizers are man-made, not produced by microorganisms.",
      },
      {
        kind: "mcq",
        number: 141,
        archetype: "negative-fact",
        prompt: "All of the following are described in the passage as outcomes of soil degradation EXCEPT",
        choices: [
          { id: "a", text: "The loss of microbial diversity" },
          { id: "b", text: "Increased release of carbon into the atmosphere" },
          { id: "c", text: "Greater public recognition of underground ecological change" },
          { id: "d", text: "Rising greenhouse gas concentrations" },
        ],
        answer: "c",
        explanation:
          "C is correct because the passage never claims that soil degradation leads to greater public attention. In fact, it says the opposite, calling it a “quiet crisis.” The other three outcomes are all described in the text. The loss of microbial diversity, carbon release into the air, and rising greenhouse gases are presented as clear consequences.",
      },
      {
        kind: "mcq",
        number: 142,
        archetype: "sentence-select",
        prompt:
          "Click on the sentence that explains why soil degradation often goes unnoticed compared to other environmental problems.",
        note: "On test day you click the sentence directly in the passage. Select it here, or pick the matching option.",
        selectableSentences: [
          "As these microorganisms decline, carbon that was once stored underground escapes into the atmosphere, adding to greenhouse gases.",
          "Because these changes occur below the surface, scientists describe soil degradation as a “quiet crisis” that receives far less attention than deforestation or melting ice.",
          "Some regions are now demonstrating how soil recovery can work in practice.",
          "In India, farmers who rotate rice and lentil crops are restoring nitrogen levels naturally.",
        ],
        choices: [
          {
            id: "a",
            text: "As these microorganisms decline, carbon that was once stored underground escapes into the atmosphere, adding to greenhouse gases.",
          },
          {
            id: "b",
            text: "Because these changes occur below the surface, scientists describe soil degradation as a “quiet crisis” that receives far less attention than deforestation or melting ice.",
          },
          { id: "c", text: "Some regions are now demonstrating how soil recovery can work in practice." },
          { id: "d", text: "In India, farmers who rotate rice and lentil crops are restoring nitrogen levels naturally." },
        ],
        answer: "b",
        explanation:
          "B is correct. “Because these changes occur below the surface, scientists describe soil degradation as a ‘quiet crisis' that receives far less attention than deforestation or melting ice.” This sentence best explains why soil degradation often goes unnoticed compared with other environmental problems.",
      },
      {
        kind: "mcq",
        number: 143,
        archetype: "vocabulary",
        prompt: "The word “inert” in the passage is closest in meaning to",
        choices: [
          { id: "a", text: "complex" },
          { id: "b", text: "valuable" },
          { id: "c", text: "motionless" },
          { id: "d", text: "fragile" },
        ],
        answer: "c",
        explanation:
          "C is correct since “inert” means still or motionless. The author uses it to emphasize the contrast between soil's lifeless appearance and its hidden activity. A does not work because the author calls soil dynamic, not complex in that sense. B and D are also off base because “inert” has nothing to do with value or fragility.",
      },
      {
        kind: "mcq",
        number: 144,
        archetype: "rhetorical-purpose",
        prompt: "Why does the author refer to farming practices in India?",
        choices: [
          { id: "a", text: "To argue that crop rotation is no longer necessary in modern farming" },
          { id: "b", text: "To contrast traditional techniques with industrial fertilizer use" },
          { id: "c", text: "To show a successful example of restoring soil health" },
          { id: "d", text: "To highlight regions most affected by carbon loss from soil" },
        ],
        answer: "c",
        explanation:
          "C is correct because the example from India shows how rotating rice and lentil crops restores soil nitrogen naturally, demonstrating successful soil recovery. The other choices do not match the author's purpose. A is incorrect since the text supports, rather than dismisses, crop rotation. B is partly related but misses the positive outcome being emphasized. D does not fit because India is cited for innovation, not for severe damage.",
      },
    ],
  },
  {
    kind: "reading",
    id: "ap-3",
    section: "academic",
    index: 3,
    title: "The Double Edge of Facial Recognition",
    directions,
    passage: {
      type: "article",
      title: "The Double Edge of Facial Recognition",
      paragraphs: [
        "Facial recognition technology has moved rapidly from science fiction to daily life. Airports now allow passengers to board by looking at a camera, and some stores test systems that identify returning customers. These programs promise speed and convenience, reducing the need for tickets, cards, or passwords. Governments also use them to enhance security, claiming that instant identification can help locate missing persons or prevent crime.",
        "The city of London provides one of the most ambitious examples. Its “Live Facial Recognition” network scans crowded streets, comparing faces with police databases in real time. Supporters praise the system for identifying suspects in large events where manual monitoring would be impossible. However, independent reviews have shown that accuracy can vary depending on lighting, camera angle, and the diversity of the population being scanned. Civil rights groups have challenged the practice in court, arguing that it collects personal data without consent and risks normalizing mass surveillance.",
        "The London case highlights the dilemma faced by many societies: efficiency versus privacy. The same algorithms that can protect the public can also track it. Whether facial recognition becomes a trusted guardian or a tool of control depends not only on its accuracy but on the values guiding its use.",
      ],
    },
    questions: [
      {
        kind: "mcq",
        number: 145,
        archetype: "main-idea",
        prompt: "What is the main idea of the passage?",
        choices: [
          { id: "a", text: "Facial recognition offers both convenience and risks." },
          { id: "b", text: "Governments should ban facial recognition because it violates civil liberties." },
          { id: "c", text: "The success of facial recognition depends on its technological accuracy." },
          { id: "d", text: "The London system has proven that large-scale surveillance is reliable." },
        ],
        answer: "a",
        explanation:
          "A is correct because the passage explores both the advantages and dangers of facial recognition technology. The author notes its convenience and efficiency but also raises concerns about privacy and surveillance. B goes too far by calling for a ban, which the passage never suggests. C captures only one part of the issue by focusing on accuracy, and D misrepresents the author's point since the London system is not described as completely reliable.",
      },
      {
        kind: "mcq",
        number: 146,
        archetype: "vocabulary",
        prompt: "The word “ambitious” in the passage is closest in meaning to",
        choices: [
          { id: "a", text: "reliable" },
          { id: "b", text: "careful" },
          { id: "c", text: "secret" },
          { id: "d", text: "extensive" },
        ],
        answer: "d",
        explanation:
          "D is correct because “ambitious” describes the scale of London's facial recognition network, meaning extensive or far-reaching. Reliable and careful do not fit the context, and secret is opposite in meaning since the program operates publicly on city streets.",
      },
      {
        kind: "mcq",
        number: 147,
        archetype: "rhetorical-purpose",
        prompt: "Why does the author mention the city of London?",
        choices: [
          { id: "a", text: "To describe the first city to ban facial recognition technology" },
          { id: "b", text: "To provide an example of facial recognition in a real-world setting" },
          { id: "c", text: "To explain how civil rights groups have tried to ban the use of facial recognition" },
          { id: "d", text: "To show that facial recognition is effective in identifying criminals" },
        ],
        answer: "b",
        explanation:
          "B is correct because London is used as a real-world example of how facial recognition is being applied. The author describes its large-scale use and the debate surrounding it. A is inaccurate since London has not banned the technology. C and D each focus on only one side of the issue rather than the balanced discussion presented in the passage.",
      },
      {
        kind: "mcq",
        number: 148,
        archetype: "detail",
        prompt: "According to the passage, what advantage do airports gain by using facial recognition?",
        choices: [
          { id: "a", text: "It allows passengers to verify their identity without traditional documents." },
          { id: "b", text: "It minimizes the need for airport security checks." },
          { id: "c", text: "It increases the efficiency of the check-in process through advanced screenings." },
          { id: "d", text: "It ensures that these systems have been tested to identify the right people." },
        ],
        answer: "a",
        explanation:
          "A is correct because the opening paragraph explains that airports allow passengers to board “by looking at a camera,” reducing the need for tickets or cards. This shows that passengers can verify their identity without physical documents. The ideas in B and C are partly related but exaggerated, and D is never mentioned.",
      },
      {
        kind: "mcq",
        number: 149,
        archetype: "inference",
        prompt: "What can be inferred about the author's view of facial recognition technology?",
        choices: [
          { id: "a", text: "It will likely replace all existing forms of personal identification." },
          { id: "b", text: "Its impact depends on how responsible societies are in implementing it." },
          { id: "c", text: "Its risks are exaggerated compared with traditional surveillance systems." },
          { id: "d", text: "It benefits society as a whole even though some groups are against it." },
        ],
        answer: "b",
        explanation:
          "B is correct because the author concludes that the impact of facial recognition “depends not only on its accuracy but on the values guiding its use.” This implies that responsible implementation determines whether it becomes protective or invasive. A is incorrect since the passage does not predict total replacement of identification systems. C is wrong because the risks are taken seriously, not dismissed. D is partly true but ignores the author's caution about ethical use.",
      },
    ],
  },
  {
    kind: "reading",
    id: "ap-4",
    section: "academic",
    index: 4,
    title: "The Pull of Nostalgia",
    directions,
    passage: {
      type: "article",
      title: "The Pull of Nostalgia",
      paragraphs: [
        "The warm, sometimes bittersweet feeling that arises when recalling the past, known as nostalgia, was once viewed as a kind of illness, a longing that distracted people from the present. Today, psychologists see it differently. Rather than a symptom of homesickness, nostalgia is understood as a common and often beneficial emotion that helps maintain psychological balance during times of stress or uncertainty.",
        "Experiments have shown that nostalgic memories activate brain regions linked to reward and comfort. In one study, volunteers who listened to popular songs from their teenage years felt more connected to others and reported higher self-esteem than those who heard unfamiliar music. A similar effect occurred when participants read old letters or viewed childhood photos: the recollections reduced feelings of loneliness and sharpened their sense of personal identity. These responses seem to work partly through storytelling—people reconstruct the past in ways that make it meaningful, reinforcing a sense of continuity between their younger and present selves.",
        "Nostalgia, then, does more than recall what has been lost; it reaffirms what endures. By weaving past experiences into current life, individuals strengthen resilience and emotional stability.",
      ],
    },
    questions: [
      {
        kind: "mcq",
        number: 150,
        archetype: "negative-fact",
        prompt: "All of the following are mentioned as ways nostalgia can be triggered EXCEPT",
        choices: [
          { id: "a", text: "Hearing familiar songs" },
          { id: "b", text: "Discussing shared experiences" },
          { id: "c", text: "Viewing childhood photos" },
          { id: "d", text: "Reading old letters" },
        ],
        answer: "b",
        explanation:
          "B is correct because discussing shared experiences is not listed among the ways nostalgia can be triggered. The passage specifically mentions listening to songs, reading letters, and viewing childhood photos. Hearing music, reading, and seeing images all appear in the text, while conversation does not.",
      },
      {
        kind: "mcq",
        number: 151,
        archetype: "detail",
        prompt: "What shift in understanding about nostalgia is described in the passage?",
        choices: [
          { id: "a", text: "It is now regarded as a sign of emotional intelligence." },
          { id: "b", text: "It has been viewed as a form of homesickness." },
          { id: "c", text: "It was thought of as an ideal way to hold bittersweet memories." },
          { id: "d", text: "It was once considered unhealthy." },
        ],
        answer: "d",
        explanation:
          "D is correct since the passage states that nostalgia “was once viewed as a kind of illness” but is now recognized as beneficial. This shows a shift from being seen as unhealthy to being understood as emotionally positive. A is incorrect because the text never links nostalgia to emotional intelligence. B is misleading since homesickness was the earlier interpretation, not the current one. C does not make grammatical or logical sense in this context.",
      },
      {
        kind: "mcq",
        number: 152,
        archetype: "connect-ideas",
        prompt: "What is the relationship between paragraphs 2 and 3?",
        choices: [
          { id: "a", text: "Paragraph 3 provides additional evidence to support paragraph 2." },
          { id: "b", text: "Paragraph 3 challenges the psychological findings presented in paragraph 2." },
          { id: "c", text: "Paragraph 3 builds on the examples in paragraph 2." },
          { id: "d", text: "Paragraph 3 introduces a topic about emotional memory." },
        ],
        answer: "a",
        explanation:
          "A is correct because the third paragraph extends the discussion from paragraph two, reinforcing how nostalgia improves well-being. After describing studies in paragraph two, paragraph three explains how these effects build resilience and stability. The other options do not fit since there is no contradiction or new topic introduced.",
      },
      {
        kind: "mcq",
        number: 153,
        archetype: "vocabulary",
        prompt: "The word “reaffirms” in the passage is closest in meaning to",
        choices: [
          { id: "a", text: "replaces" },
          { id: "b", text: "recalls" },
          { id: "c", text: "strengthens" },
          { id: "d", text: "questions" },
        ],
        answer: "c",
        explanation:
          "C is correct because “reaffirms” means strengthens or reinforces. The author says nostalgia “reaffirms what endures,” emphasizing continuity rather than replacement or questioning. The other choices do not match this meaning.",
      },
      {
        kind: "mcq",
        number: 154,
        archetype: "inference",
        prompt: "What can be inferred about nostalgia based on the passage?",
        choices: [
          { id: "a", text: "It functions mainly as an emotional coping mechanism for grief." },
          { id: "b", text: "It prevents individuals from adapting to change in their daily lives." },
          { id: "c", text: "It helps people create a sense of continuity between their past and present." },
          { id: "d", text: "It is considered healthy when done under supervision." },
        ],
        answer: "c",
        explanation:
          "C is correct since the passage suggests that nostalgia helps people maintain “a sense of continuity between their younger and present selves.” It functions as a link that integrates the past into present life. A is not accurate because the passage focuses on resilience rather than grief. B is the opposite of the author's view, and D is unsupported since therapy or supervision is never mentioned.",
      },
    ],
  },
  {
    kind: "reading",
    id: "ap-5",
    section: "academic",
    index: 5,
    title: "The Rise of the Telegraph",
    directions,
    passage: {
      type: "article",
      title: "The Rise of the Telegraph",
      paragraphs: [
        "Before the nineteenth century, communication could travel only as fast as a messenger on horseback or a ship at sea. News, orders, and personal letters often took weeks or months to reach their destinations. That changed dramatically with the invention of the telegraph. Using electric signals sent through wires, people could transmit messages across vast distances in seconds, transforming both business and daily life.",
        "The first major network was developed in the 1840s by Samuel Morse in the United States. His system converted words into patterns of short and long electrical pulses, known as Morse code. Telegraph offices soon lined railroad stations, allowing traders to track prices and newspapers to report events almost as they happened. During the American Civil War, generals used the telegraph to coordinate troop movements, demonstrating how information could become as decisive as weaponry. Similar systems spread across Europe and later under the oceans, connecting continents through submarine cables.",
        "The telegraph compressed the world. It reshaped politics, commerce, and journalism by introducing the idea of instant communication. Though later replaced by telephones and the internet, the telegraph laid the first electronic foundation for the global networks that now link nearly every part of human society.",
      ],
    },
    questions: [
      {
        kind: "mcq",
        number: 155,
        archetype: "negative-fact",
        prompt: "All of the following are mentioned in the passage as effects of the telegraph EXCEPT —",
        choices: [
          { id: "a", text: "The spread of international communication" },
          { id: "b", text: "Quicker reporting of news events" },
          { id: "c", text: "Improvements in transportation speed" },
          { id: "d", text: "Changes in political and commercial life" },
        ],
        answer: "c",
        explanation:
          "C is correct because improvements in transportation speed are not discussed as an effect of the telegraph. The passage describes faster communication, political and commercial changes, and international connections, but it never claims that transportation itself became faster.",
      },
      {
        kind: "mcq",
        number: 156,
        archetype: "vocabulary",
        prompt: "The word “compressed” in the passage is closest in meaning to",
        choices: [
          { id: "a", text: "weakened" },
          { id: "b", text: "shortened" },
          { id: "c", text: "expanded" },
          { id: "d", text: "delayed" },
        ],
        answer: "b",
        explanation:
          "B is correct because “compressed” in this context means shortened or made smaller. The author writes that “the telegraph compressed the world,” referring to how it reduced the time needed to share information. Weakened and delayed express the opposite meaning, and expanded does not fit the idea of bringing distances closer.",
      },
      {
        kind: "mcq",
        number: 157,
        archetype: "rhetorical-purpose",
        prompt: "Why does the author mention Samuel Morse?",
        choices: [
          { id: "a", text: "To identify the inventor who developed the first large-scale telegraph network" },
          { id: "b", text: "To compare his invention with earlier systems of long-distance communication" },
          { id: "c", text: "To show how his work improved military technology" },
          { id: "d", text: "To explain why his code was later replaced by the telephone" },
        ],
        answer: "a",
        explanation:
          "A is correct because Samuel Morse is introduced as the inventor who created the first major telegraph network in the 1840s. The passage credits him for developing Morse code and explains how his system transformed communication. The remaining options misrepresent the author's intent, as the text does not compare, replace, or limit his contribution.",
      },
      {
        kind: "mcq",
        number: 158,
        archetype: "inference",
        prompt: "What can be inferred about communication before the telegraph?",
        choices: [
          { id: "a", text: "It involved widespread use of coded signals." },
          { id: "b", text: "It was faster but less reliable than later systems." },
          { id: "c", text: "It relied entirely on transportation speed to deliver messages." },
          { id: "d", text: "It required coordination between countries through trade networks." },
        ],
        answer: "c",
        explanation:
          "C is correct because the first paragraph makes it clear that before the telegraph, messages traveled only as fast as physical transportation allowed, whether by horse or ship. The other options are inaccurate since there is no mention of coded systems, higher reliability, or international coordination at that stage.",
      },
      {
        kind: "mcq",
        number: 159,
        archetype: "connect-ideas",
        prompt: "What is the relationship between paragraphs 2 and 3?",
        choices: [
          { id: "a", text: "Paragraph 3 provides detailed examples of how Morse's code was transmitted." },
          { id: "b", text: "Paragraph 3 contrasts the telegraph with newer communication inventions." },
          { id: "c", text: "Paragraph 3 introduces problems caused by the telegraph's invention." },
          { id: "d", text: "Paragraph 3 explains the broader impact of the developments described in paragraph 2." },
        ],
        answer: "d",
        explanation:
          "D is correct because the third paragraph expands on the developments described earlier, explaining how the telegraph's invention influenced politics, business, and daily life. The new paragraph shifts from historical detail to overall impact. The other options do not fit since there are no transmission examples, contrasts with newer inventions, or major problems described.",
      },
    ],
  },
]

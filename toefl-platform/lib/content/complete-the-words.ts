import type { ClozeSet } from "../types"

const directions = "Fill in the missing letters in the paragraph."

/**
 * Paragraphs are stored solved: braces mark the letters the learner supplies.
 * The letters immediately before a brace are the stem shown on screen, so
 * "envi{ronment}" renders as "envi" followed by eight empty letter cells.
 */
export const completeTheWords: ClozeSet[] = [
  {
    kind: "cloze",
    id: "cw-1",
    section: "complete-the-words",
    index: 1,
    title: "Rainforests",
    directions,
    firstBlank: 1,
    source:
      "Rainforests are dense regions filled with tall trees and countless living things. Wa{rm} air a{nd} heavy ra{in} create t{he} ideal envi{ronment} for pl{ants} to gr{ow} all ye{ar}. As le{aves} fall a{nd} decay, they return nutrients to the soil, supporting new life. Animals from insects to large cats depend on this balance for food and shelter. When large areas are cleared, the entire system weakens, and the forest struggles to recover.",
  },
  {
    kind: "cloze",
    id: "cw-2",
    section: "complete-the-words",
    index: 2,
    title: "The Moon's surface",
    directions,
    firstBlank: 11,
    source:
      "The Moon appears bright because its surface reflects sunlight toward Earth. Over bil{lions} of ye{ars}, countless imp{acts} have cov{ered} it wi{th} fine du{st} and ro{ck} fragments. Th{ese} scars re{main} unchanged bec{ause} the Moon has no wind or rain to wear them away. Scientists study the patterns of craters to learn how often objects hit our solar system. Each mark on its surface tells a small part of the Moon's long and silent history.",
  },
  {
    kind: "cloze",
    id: "cw-3",
    section: "complete-the-words",
    index: 3,
    title: "How sound travels",
    directions,
    firstBlank: 21,
    source:
      "Sound travels as waves that move through air, water, or solid material. Wh{en} something vib{rates}, it pu{shes} and pu{lls} nearby part{icles}, creating pat{terns} of mot{ion} that o{ur} ears c{an} detect. Fa{ster} vibrations make higher sounds, while slower ones produce deeper tones. The strength of these waves affects how loud the sound feels. Although invisible, sound connects people every day through voices, music, and the natural noises around us.",
  },
  {
    kind: "cloze",
    id: "cw-4",
    section: "complete-the-words",
    index: 4,
    title: "Working in a team",
    directions,
    firstBlank: 31,
    source:
      "Working in a team allows people to combine different skills and ideas. Wh{en} members li{sten} and sh{are} openly, pro{blems} can be so{lved} more crea{tively}. Trust bu{ilds} as pe{ople} depend o{n} one ano{ther} to complete tasks, and motivation often increases when goals are shared. Disagreements will happen, but respectful communication keeps progress steady and prevents small issues from growing. A strong team doesn't mean everyone thinks alike—it means they move forward together despite their differences.",
  },
  {
    kind: "cloze",
    id: "cw-5",
    section: "complete-the-words",
    index: 5,
    title: "Rivers",
    directions,
    firstBlank: 41,
    source:
      "Rivers are always moving, shaping the land as they flow toward the sea. Ov{er} time, wa{ter} wears aw{ay} rocks a{nd} soil, car{ving} valleys a{nd} creating n{ew} paths. Wh{en} floods oc{cur}, they c{an} both damage land and deposit fresh layers of fertile earth. Towns often form along rivers because they offer water, travel routes, and trade. A river's constant motion reminds us that change in nature never truly stops.",
  },
  {
    kind: "cloze",
    id: "cw-6",
    section: "complete-the-words",
    index: 6,
    title: "Privacy online",
    directions,
    firstBlank: 51,
    source:
      "The rise of the internet has made sharing information easier than ever before. Ea{ch} time w{e} browse, po{st}, or sh{op} online, o{ur} data le{aves} a dig{ital} trace. Comp{anies} use th{is} information to imp{rove} services or advertise products, but it also raises concerns about privacy. Learning how to manage passwords, settings, and permissions helps people protect their personal information. In a connected world, privacy depends as much on awareness as on technology.",
  },
  {
    kind: "cloze",
    id: "cw-7",
    section: "complete-the-words",
    index: 7,
    title: "Living in a new culture",
    directions,
    firstBlank: 61,
    source:
      "Moving to a new country often forces people to rethink how they express themselves. Beha{viors} that fe{el} natural i{n} one cul{ture}, such a{s} how cl{ose} to st{and} or wh{en} to sp{eak}, can se{em} unusual in another. At first, these differences may cause confusion or even embarrassment, but over time they teach flexibility. People who learn to notice subtle social cues often discover that understanding others more clearly also changes how they see themselves.",
  },
  {
    kind: "cloze",
    id: "cw-8",
    section: "complete-the-words",
    index: 8,
    title: "From hunting to farming",
    directions,
    firstBlank: 71,
    source:
      "The shift from hunting to farming transformed early human life. Pe{ople} began pla{nting} seeds a{nd} raising ani{mals} instead o{f} moving cons{tantly} in se{arch} of fo{od}. With rel{iable} harvests, vil{lages} grew, and families could settle in one place. This stability encouraged cooperation and the exchange of ideas among neighbors. Over time, farming not only provided food but also created the foundations for organized society and cultural progress.",
  },
  {
    kind: "cloze",
    id: "cw-9",
    section: "complete-the-words",
    index: 9,
    title: "The sense of smell",
    directions,
    firstBlank: 81,
    source:
      "Our sense of smell allows us to detect thousands of different scents. Wh{en} we bre{athe} in, ti{ny} molecules tr{avel} through t{he} nose a{nd} reach spe{cial} cells th{at} send sig{nals} to the br{ain}. Smell can trigger memories, emotions, and even hunger in an instant. Because of this close link to memory, a familiar scent can make someone recall a person or place from years ago. Scientists continue to study smell to understand how it influences behavior and emotional well-being in everyday life.",
  },
  {
    kind: "cloze",
    id: "cw-10",
    section: "complete-the-words",
    index: 10,
    title: "How we decide",
    directions,
    firstBlank: 91,
    source:
      "People make countless decisions every day, from simple choices to major life plans. Of{ten}, the mi{nd} uses shor{tcuts} to de{cide} quickly wit{hout} analyzing ev{ery} detail. Th{ese} shortcuts sa{ve} time b{ut} can al{so} lead to mistakes when emotions take over. Slowing down and considering different viewpoints helps create more balanced decisions. Over time, experience teaches people when to trust their instincts and when to pause for deeper thought. Good judgment is not about speed—it's about matching action to the situation.",
  },
]

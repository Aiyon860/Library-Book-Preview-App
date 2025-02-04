import { getCategoryColor } from "../utils/helpers.js";

const tailwindColors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

const categories = [
  {
    name: "FICTION",
    svgFile: "book-open.svg",
  },
  {
    name: "SELF-HELP",
    svgFile: "light-bulb.svg",
  },
  {
    name: "BUSINESS",
    svgFile: "briefcase.svg",
  },
  {
    name: "TECHNOLOGY",
    svgFile: "computer-speaker.svg",
  },
  {
    name: "SCIENCE",
    svgFile: "bug.svg",
  },
  {
    name: "PSYCHOLOGY",
    svgFile: "brain.svg",
  },
  {
    name: "TRAVEL",
    svgFile: "globe.svg",
  },
  {
    name: "HEALTH",
    svgFile: "heart.svg",
  },
  {
    name: "ANTIQUES",
    svgFile: "library.svg",
  },
  {
    name: "COLLECTIBLES",
    svgFile: "star.svg",
  },
  {
    name: "LITERARY",
    svgFile: "pencil.svg",
  },
  {
    name: "COLLECTIONS",
    svgFile: "books.svg",
  },
  {
    name: "ARCHITECTURE",
    svgFile: "building.svg",
  },
  {
    name: "CRITICISM",
    svgFile: "chat-bubble-left-right.svg",
  },
  {
    name: "ART",
    svgFile: "paint-brush.svg",
  },
  {
    name: "MATHEMATICS",
    svgFile: "calculator.svg",
  },
  {
    name: "BIBLES",
    svgFile: "book-bible.svg",
  },
  {
    name: "MEDICAL",
    svgFile: "hospital.svg",
  },
  {
    name: "BIOGRAPHY",
    svgFile: "document-text.svg",
  },
  {
    name: "AUTOBIOGRAPHY",
    svgFile: "pencil-square.svg",
  },
  {
    name: "MUSIC",
    svgFile: "musical-note.svg",
  },
  {
    name: "PHILOSOPHY",
    svgFile: "academic-cap.svg",
  },
  {
    name: "COOKING",
    svgFile: "fire.svg",
  },
  {
    name: "PHOTOGRAPHY",
    svgFile: "camera.svg",
  },
  {
    name: "CRAFTS",
    svgFile: "scissors.svg",
  },
  {
    name: "HOBBIES",
    svgFile: "puzzle-piece.svg",
  },
  {
    name: "POETRY",
    svgFile: "pencil.svg",
  },
  {
    name: "DESIGN",
    svgFile: "beaker.svg",
  },
  {
    name: "POLITICAL",
    svgFile: "flag.svg",
  },
  {
    name: "DRAMA",
    svgFile: "mask.svg",
  },
  {
    name: "EDUCATION",
    svgFile: "academic-cap.svg",
  },
  {
    name: "REFERENCE",
    svgFile: "bookmark.svg",
  },
  {
    name: "FAMILY",
    svgFile: "users.svg",
  },
  {
    name: "RELATIONSHIPS",
    svgFile: "heart.svg",
  },
  {
    name: "RELIGION",
    svgFile: "church.svg",
  },
  {
    name: "GAMES",
    svgFile: "controller.svg",
  },
  {
    name: "ACTIVITIES",
    svgFile: "target.svg",
  },
  {
    name: "HISTORY",
    svgFile: "archive-box.svg",
  },
  {
    name: "ENGINEERING",
    svgFile: "wrench.svg",
  },
  {
    name: "HUMOR",
    svgFile: "emoji-happy.svg",
  },
  {
    name: "TRANSPORTATION",
    svgFile: "truck.svg",
  },
  {
    name: "LAW",
    svgFile: "scale.svg",
  },
];

export { categories, tailwindColors };


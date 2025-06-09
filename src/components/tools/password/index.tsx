
import PasswordGenerator from "./PasswordGenerator";
import WordCounter from "./WordCounter";
import LoremIpsumGenerator from "./LoremIpsumGenerator";
import CharacterCounter from "./CharacterCounter";

const passwordTools = {
  "password-generator": PasswordGenerator,
  "word-counter": WordCounter,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "character-counter": CharacterCounter,
};

export default passwordTools;

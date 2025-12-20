import TextType from "./TextType";



const ChestText = () => {
  return (
    <TextType 
      text={["CXR-ORACLE", "Welcome to the challenge!"]}
      typingSpeed={75}
      pauseDuration={1500}
      showCursor={true}
      cursorCharacter="|"
    />
  );
};

export default ChestText;

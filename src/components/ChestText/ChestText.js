import TextType from "./TextType";



const ChestText = () => {
  return (
    <TextType 
      text={["CXR\nORACLE", "Welcome to the challenge!"]}
      typingSpeed={75}
      pauseDuration={1500}
      showCursor={true}
      loop={false}
      cursorCharacter="_"
    />
  );
};

export default ChestText;

import styledComponents from "styled-components";
import PieChart from "../components/Pie-chart";
const StyledScore = styledComponents.div`
    height:70%;
    div{
        flex: 1 1 0%;
    }
`;

const SkillSet = () => {
  return (
    <section className="pb-20 sm:pb-0">
      <p className="px-10 py-10 sm:px-52 sm:py-32">
        I've ~3 years of working experience. I thrive on bringing ideas to life
        and am not satisfied with my current knowledge. I love learning new
        techniques and technologies and want to challenge different projects
      </p>
      <StyledScore className="grid grid-cols-4 sm:grid-cols-8">
        <PieChart percent="70" duration="1000" language="RDBMS" />
        <PieChart percent="60" duration="1000" language="Go" />
        <PieChart percent="50" duration="1000" language="Flutter" />
        <PieChart percent="20" duration="1000" language="React" />
        <PieChart percent="30" duration="1000" language="JS" />
        <PieChart percent="40" duration="1000" language="Java" />
        <PieChart percent="0" duration="1000" language="Css" />
        <PieChart percent="30" duration="1000" language="PHP" />
      </StyledScore>
    </section>
  );
};

export default SkillSet;
